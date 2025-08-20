import { callLLM, textToPdfBase64 } from './utils.js';

function calculateFitFromProfile(profile, jobSkills) {
  const profileSkills = profile.skills || {};
  let matched = 0;
  const gaps = [];
  jobSkills.forEach(skill => {
    const lvl = profileSkills[skill] ?? 0;
    if (lvl >= 50) matched++;
    else gaps.push(skill);
  });
  const fitPercentage = Math.round((matched / (jobSkills.length || 1)) * 100);
  return { fitPercentage, gaps };
}

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
    const { profile, job } = JSON.parse(event.body || '{}');
    // Ask LLM to extract job skills:
    const jobPrompt = `Extract required skills from job description as JSON array: "${job.description}"`;
    const jobSkillsText = await callLLM(jobPrompt);
    let jobSkills = [];
    try { jobSkills = JSON.parse(jobSkillsText); } catch { jobSkills = jobSkillsText.split(/,|\n/).map(s=>s.trim()).filter(Boolean); }

    const { fitPercentage, gaps } = calculateFitFromProfile(profile, jobSkills);

    // Suggested actions using LLM
    let actions = [];
    if (gaps.length) {
      const actionPrompt = `
You are a career coach. For each of these missing skills: ${gaps.join(', ')}, provide 2 concise actionable steps the candidate can take. Output JSON array [{ "skill":"", "actions":["",""] }]
Candidate profile: ${JSON.stringify(profile)}
`;
      const resp = await callLLM(actionPrompt);
      try { actions = JSON.parse(resp); } catch {
        actions = gaps.map(g => ({ skill: g, actions: [`Learn basics of ${g}`, `Build a small project using ${g}`] }));
      }
    } else {
      actions = [{ skill: 'All', actions: ['You match required skills. Focus on metrics and projects.'] }];
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ fitPercentage, gaps, actions })
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
