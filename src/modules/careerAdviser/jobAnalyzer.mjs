// jobAnalyzer.mjs
// SkillSync Job Analyzer – Kirubel’s implementation

// ---------------------------
// Utilities
// ---------------------------
const LS_KEY = "skillsync:user";
const LEVELS = { "To Learn": 10, "In Progress": 50, "Proficient": 80, "Expert": 100 };

function getUserProfile() {
  const raw = localStorage.getItem(LS_KEY);
  return raw ? JSON.parse(raw) : { name: "User", career_goal: "", skills: [], certs: [], projects: [] };
}

function tokenize(text="") {
  return text
    .toLowerCase()
    .replace(/[^\w+.%$-]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

// small skill library
const SKILL_LIB = {
  "javascript": ["js","ecmascript"],
  "react": ["reactjs"],
  "vue": ["vuejs"],
  "css": ["css3"],
  "html": ["html5"],
  "node.js": ["node","nodejs"],
  "express": [],
  "sql": ["mysql","postgres","sqlite"],
  "mongodb": ["mongo"],
  "docker": [],
  "aws": ["amazon web services","s3","lambda"],
};

function extractSkills(text) {
  const toks = tokenize(text);
  const found = new Set();
  for (const key of Object.keys(SKILL_LIB)) {
    const variants = [key, ...SKILL_LIB[key]];
    for (const v of variants) {
      if (toks.includes(v.toLowerCase())) { found.add(key); break; }
    }
  }
  return Array.from(found);
}

// ---------------------------
// Fit Calculation
// ---------------------------
function computeFit(jobDesc, resumeText, user) {
  const jdSkills = extractSkills(jobDesc);
  const resumeSkills = extractSkills(resumeText);
  const userSkills = user.skills || [];

  const required = jdSkills.slice(0, Math.min(5, jdSkills.length));
  const nice = jdSkills.slice(5);

  function levelFor(skill) {
    const s = userSkills.find(u => u.name.toLowerCase() === skill.toLowerCase());
    return s ? s.level : 0;
  }

  let score = 0;
  required.forEach(s => {
    const lvl = levelFor(s);
    if (lvl >= 70) score += 8; else if (lvl >= 40) score += 4;
  });
  nice.forEach(s => {
    const lvl = levelFor(s);
    if (lvl >= 70) score += 3; else if (lvl >= 40) score += 1;
  });

  // resume keyword presence
  let keywordHits = jdSkills.filter(s => resumeSkills.includes(s)).length;
  score += keywordHits * 2;

  return {
    total: Math.min(100, score),
    required,
    nice,
    missing: jdSkills.filter(s => levelFor(s) < 40),
  };
}

// ---------------------------
// Resume Feedback
// ---------------------------
function resumeFeedback(resumeText, jobDesc) {
  const jdSkills = extractSkills(jobDesc);
  const resumeSkills = extractSkills(resumeText);
  const missing = jdSkills.filter(s => !resumeSkills.includes(s));
  return {
    score: 60 + (jdSkills.length - missing.length) * 5,
    strengths: resumeSkills.slice(0,5),
    improvements: missing,
  };
}

// ---------------------------
// Resume Generator
// ---------------------------
function generateResume(user, job, fit) {
  const top = fit.required.concat(fit.nice).slice(0,5);
  return `
# ${user.name || "Your Name"}
Email • Phone • LinkedIn • GitHub

## Summary
${job.title} with strong background in ${top.join(", ")}. Excited to contribute to ${job.company.display_name}.

## Skills
${user.skills.map(s=>s.name).join(" • ")}

## Projects
${(user.projects||[]).map(p=>`- ${p.title} (${p.stack?.join(", ")})`).join("\n")}
  `;
}

// ---------------------------
// UI Rendering
// ---------------------------
function render(job, resumeText) {
  const user = getUserProfile();
  const fit = computeFit(job.description, resumeText, user);
  const feedback = resumeFeedback(resumeText, job.description);
  const tailored = generateResume(user, job, fit);

  document.getElementById("app").innerHTML = `
    <h1 class="text-2xl font-bold mb-4">Job Match Analyzer</h1>

    <div class="bg-white p-4 rounded-xl shadow mb-6">
      <h2 class="font-semibold text-lg mb-2">Job: ${job.title}</h2>
      <p class="text-sm text-gray-600 mb-2">${job.company.display_name}</p>
      <p class="text-gray-700 mb-2">${job.location.display_name}</p>
      <p class="text-gray-800">${job.description.substring(0,200)}...</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="bg-white p-4 rounded-xl shadow">
        <h3 class="font-semibold mb-2">Fit Score</h3>
        <div class="text-3xl font-bold text-blue-600">${fit.total}%</div>
        <p class="mt-2 text-sm">Missing: ${fit.missing.join(", ") || "None"}</p>
      </div>

      <div class="bg-white p-4 rounded-xl shadow">
        <h3 class="font-semibold mb-2">Resume Feedback</h3>
        <p>Score: ${feedback.score}/100</p>
        <p class="text-sm mt-2"><strong>Strengths:</strong> ${feedback.strengths.join(", ")}</p>
        <p class="text-sm"><strong>Improvements:</strong> ${feedback.improvements.join(", ") || "None"}</p>
      </div>
    </div>

    <div class="bg-white p-4 rounded-xl shadow mt-6">
      <h3 class="font-semibold mb-2">Tailored Resume Draft</h3>
      <pre class="bg-gray-100 p-3 rounded text-sm overflow-x-auto">${tailored}</pre>
    </div>
  `;
}

// ---------------------------
// Example Usage
// ---------------------------

// Example Adzuna Job JSON (replace with actual API data)
const exampleJob = {
  title: "Frontend Developer",
  company: { display_name: "TechCorp" },
  location: { display_name: "Addis Ababa, Ethiopia" },
  description: "We are looking for a frontend developer skilled in JavaScript, React, and CSS to join our team..."
};

// Example resume text (in real app, parse upload or textarea)
const exampleResume = `
Experienced developer with knowledge in JavaScript and CSS. Worked on PlanetPal project using React. Learning Node.js.
`;

// Kick off rendering
render(exampleJob, exampleResume);
