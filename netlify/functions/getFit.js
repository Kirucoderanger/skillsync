import { callLLM } from './utils.js';

// simple similarity score: 0 (no match) to 1 (exact match)
function similarity(a, b) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  if (a === b) return 1;

  // substring bonus
  if (a.includes(b) || b.includes(a)) return 0.8;

  // Levenshtein distance (basic)
  const m = [];
  for (let i = 0; i <= b.length; i++) m[i] = [i];
  for (let j = 0; j <= a.length; j++) m[0][j] = j;

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      m[i][j] = b.charAt(i - 1) === a.charAt(j - 1)
        ? m[i - 1][j - 1]
        : Math.min(
            m[i - 1][j - 1] + 1,
            m[i][j - 1] + 1,
            m[i - 1][j] + 1
          );
    }
  }
  const distance = m[b.length][a.length];
  const maxLen = Math.max(a.length, b.length);
  return 1 - distance / maxLen;
}

// fuzzy match threshold
const MATCH_THRESHOLD = 0.6;

function calculateFitFromProfile(profile, jobSkills) {
  const profileSkills = profile.skills || {};
  const profileKeys = Object.keys(profileSkills);

  let matched = 0;
  const gaps = [];

  jobSkills.forEach(jobSkill => {
    let bestMatch = { score: 0, key: null };

    profileKeys.forEach(profileSkill => {
      const score = similarity(jobSkill, profileSkill);
      if (score > bestMatch.score) {
        bestMatch = { score, key: profileSkill };
      }
    });

    if (bestMatch.score >= MATCH_THRESHOLD) {
      const lvl = profileSkills[bestMatch.key] ?? 0;
      if (lvl >= 50) {
        matched++;
        return;
      }
    }
    gaps.push(jobSkill);
  });

  const fitPercentage = Math.round((matched / (jobSkills.length || 1)) * 100);
  return { fitPercentage, gaps };
}

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST')
      return { statusCode: 405, body: 'Method Not Allowed' };

    const { profile, job } = JSON.parse(event.body || '{}');

    // Ask LLM to extract job skills
    const jobPrompt = `Extract required skills from job description as JSON array: "${job.description}"`;
    const jobSkillsText = await callLLM(jobPrompt);

    let jobSkills = [];
    try {
      jobSkills = JSON.parse(jobSkillsText);
    } catch {
      jobSkills = jobSkillsText
        .replace(/```json|```/gi, '')
        .replace(/[\[\]]/g, '')
        .split(/,|\n/)
        .map(s => s.trim())
        .filter(Boolean);
    }

    const { fitPercentage, gaps } = calculateFitFromProfile(profile, jobSkills);

    // Suggested actions using LLM
    let actions = [];
    if (gaps.length) {
      const actionPrompt = `
You are a career coach. For each of these missing skills: ${gaps.join(
        ', '
      )}, provide 2 concise actionable steps the candidate can take. Output JSON array [{ "skill":"", "actions":["",""] }]
Candidate profile: ${JSON.stringify(profile)}
`;
      const resp = await callLLM(actionPrompt);
      try {
        actions = JSON.parse(resp);
      } catch {
        actions = gaps.map(g => ({
          skill: g,
          actions: [
            `Learn basics of ${g}`,
            `Build a small project using ${g}`,
          ],
        }));
      }
    } else {
      actions = [
        {
          skill: 'All',
          actions: [
            'You match required skills. Focus on metrics and projects.',
          ],
        },
      ];
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ fitPercentage, gaps, actions }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}






/*import { callLLM } from './utils.js';

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
*/