// Minimal frontend logic that talks to Netlify functions
const jobSelect = document.getElementById('jobSelect');
const jobDetails = document.getElementById('jobDetails');
const existingContainer = document.getElementById('jobUrlContainer');
const fullJobDescription = document.getElementById('jobDescription');
//const jobDescription = document.getElementById('jobDescription');
const resumeFile = document.getElementById('resumeFile');
const parseBtn = document.getElementById('parseBtn');
const profileName = document.getElementById('profileName');
const skillsContainer = document.getElementById('skillsContainer');
const newSkillName = document.getElementById('newSkillName');
const newSkillLevel = document.getElementById('newSkillLevel');
const addSkillBtn = document.getElementById('addSkillBtn');
const fitBar = document.getElementById('fitBar');
const fitText = document.getElementById('fitText');
const suggestedActions = document.getElementById('suggestedActions');
const output = document.getElementById('output');
const downloadLink = document.getElementById('downloadLink');
const genResumeBtn = document.getElementById('genResumeBtn');
const genCoverBtn = document.getElementById('genCoverBtn');
const genQuestionsBtn = document.getElementById('genQuestionsBtn');
const clearBtn = document.getElementById('clearBtn');

let jobs = [];
let profile = { name: '', skills: {}, projects: [], certifications: [] };
let currentJob = null;

//let profile = { name: '', skills: {}, projects: [], certifications: [] };

const levelMap = {
  "To Learn": 10,
  "In Progress": 50,
  "Completed": 100
};

document.addEventListener("DOMContentLoaded", () => {
    const keys = Object.keys(localStorage).filter(k => k.includes("trackedSkills"));

    keys.forEach(key => {
        const raw = localStorage.getItem(key);
        if (!raw) return;

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch (e) {
            console.warn("Invalid trackedSkills format in storage:", raw);
            return;
        }

        // Handle array format: [ {name:'React', level:'In Progress'}, ... ]
        if (Array.isArray(parsed)) {
            parsed.forEach(item => {
                if (!item.name) return;
                let lvl = item.level;
                if (typeof lvl === "string" && levelMap[lvl]) {
                    profile.skills[item.name] = levelMap[lvl];
                } else {
                    profile.skills[item.name] = Number(lvl) || 10;
                }
            });
        }
        // Handle object map format: { "React": "In Progress", "ffffffff": 60 }
        else if (typeof parsed === "object") {
            Object.keys(parsed).forEach(skill => {
                let lvl = parsed[skill];
                if (typeof lvl === "object" && lvl.level) {
                    // case: { React: {level: "Completed"} }
                    lvl = lvl.level;
                }
                if (typeof lvl === "string" && levelMap[lvl]) {
                    profile.skills[skill] = levelMap[lvl];
                } else {
                    profile.skills[skill] = Number(lvl) || 10;
                }
            });
        }
    });

    console.log("Loaded + normalized skills:", profile.skills);
    renderSkills();
    //refreshFitAndActions();
});

/*document.addEventListener("DOMContentLoaded", () => {
    // load skills from localStorage which key includes trackedSkills
    const keys = Object.keys(localStorage).filter(k => k.includes("trackedSkills"));

    keys.forEach(key => {
        const trackedSkills = localStorage.getItem(key);
        if (trackedSkills) {
            profile.skills = { ...profile.skills, ...JSON.parse(trackedSkills) };
        }
    });
    console.log("Loaded skills from localStorage:", profile.skills);
    renderSkills(); 
    //refreshFitAndActions();

});*/

// helper: render skills list
function renderSkills() {
  skillsContainer.innerHTML = '';
  const keys = Object.keys(profile.skills || {});
  if (keys.length === 0) {
    skillsContainer.innerHTML = '<div class="text-sm text-gray-500">No skills yet — parse resume or add one.</div>';
    return;
  }
  keys.forEach(skill => {
    const level = profile.skills[skill];
    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center gap-2';
    const label = document.createElement('div');
    label.className = 'text-sm font-medium';
    label.textContent = skill;
    const input = document.createElement('input');
    input.type = 'number'; input.min = 0; input.max = 100; input.value = level;
    input.className = 'w-20 p-1 border rounded';
    input.addEventListener('input', () => {
      profile.skills[skill] = Number(input.value);
      refreshFitAndActions();
    });
    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✕';
    removeBtn.className = 'text-xs text-red-500 ml-2';
    removeBtn.onclick = () => { delete profile.skills[skill]; renderSkills(); refreshFitAndActions(); };
    wrapper.append(label, input, removeBtn);
    skillsContainer.appendChild(wrapper);
  });
}
/*
// fetch jobs
async function loadJobs() {
  //const res = await fetch('/.netlify/functions/getJobs');
  //jobs = await res.json();

  // Use localStorage.key(index) to iterate through keys
  let key = null;
  for (let i = 0; i < localStorage.length; i++) {
    const currentKey = localStorage.key(i);
    if (currentKey.startsWith("jobs:")) {
      key = currentKey;
      break; // Found the key, no need to continue
    }
  }

  const jobs = JSON.parse(localStorage.getItem(key) || "[]");
  console.log("Fetched jobs:", jobs);
  jobSelect.innerHTML = '';
  jobs.forEach(j => {
    const opt = document.createElement('option');
    opt.value = j.id;
    opt.textContent = `${j.category} → ${j.title} @ ${j.company.display_name}`;
    jobSelect.appendChild(opt);
  });
  if (jobs.length) {
    currentJob = jobs[0];
    jobSelect.value = currentJob.id;
    jobDetails.textContent = currentJob.description;
  }
}

*/
// fetch jobs
/*
async function loadJobs() {
  //const res = await fetch('/.netlify/functions/getJobs');
  //jobs = await res.json();
  let key = null;
  for (let i = 0; i < localStorage.length; i++) {
    const currentKey = localStorage.key(i);
    if (currentKey.startsWith("jobs:")) {
      key = currentKey;
      break; // Found the key, no need to continue
    }
  }
  
  //const key = localStorage.keys().find(k => k.startsWith("jobs:"));
  const jobs = JSON.parse(localStorage.getItem(key) || "[]");
  console.log("Fetched jobs:", jobs);
  jobSelect.innerHTML = '';
  jobs.forEach(j => {
    const opt = document.createElement('option');
    opt.value = j.id;
    opt.textContent = `${j.category} → ${j.title} @ ${j.company.display_name}`;
    jobSelect.appendChild(opt);
  });
  if (jobs.length) {
    currentJob = jobs[0];
    jobSelect.value = currentJob.id;
    jobDetails.textContent = currentJob.description;
  }
}*/

let allJobs = []; // make it global
//let currentJob = null;
async function loadJobs() {
  //let allJobs = [];

  // Loop through all localStorage keys
  for (let i = 0; i < localStorage.length; i++) {
    const currentKey = localStorage.key(i);
    if (currentKey.startsWith("jobs:")) {
      const jobs = JSON.parse(localStorage.getItem(currentKey) || "[]");
      allJobs = allJobs.concat(jobs); // merge into one list
    }
  }

  console.log("Fetched jobs:", allJobs);

  // Clear dropdown
  jobSelect.innerHTML = '';

  // Add jobs as <option>
  allJobs.forEach(j => {
    const opt = document.createElement('option');
    opt.value = j.id;
    opt.textContent = `${j.category} → ${j.title} @ ${j.company}`;
    jobSelect.appendChild(opt);
  });

  // Select first job by default
  if (allJobs.length) {
    currentJob = allJobs[0];
    jobSelect.value = currentJob.id;
    jobDetails.textContent = currentJob.description;
    //fullJobDescription.value = currentJob.description; // pre-fill textarea
    fullJobDescription.placeholder  = `Paste here the full job description from the link below for better resume suggestions${currentJob.jobUrl ? `\n(${currentJob.jobUrl})` : ''}`;
    existingContainer.innerHTML = ''; // clear previous content
    existingContainer.innerHTML = `<a href="${currentJob.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">View Job Posting and copy full job description</a>`;

  }
}



jobSelect.addEventListener('change', () => {
  currentJob = allJobs.find(j => j.id === jobSelect.value);
  jobDetails.textContent = currentJob.description;
  existingContainer.innerHTML = `<a href="${currentJob.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 underline hover:text-blue-800">View Job Posting and copy full job description</a>`;

  refreshFitAndActions();
});



import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.js?url";

// Tell PDF.js where to find the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

async function extractText(file) {
  if (file.type === "application/pdf") {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async function () {
        try {
          const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(this.result) }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((s) => s.str).join(" ") + "\n";
          }
          resolve(text);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  } else if (file.name.endsWith(".docx")) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = async function () {
        try {
          const result = await mammoth.extractRawText({ arrayBuffer: this.result });
          resolve(result.value);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  } else {
    throw new Error("Unsupported file format");
  }
}


/*
document.getElementById("parseBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const output = document.getElementById("output");
  status.textContent = "Processing...";
  output.textContent = "";

  try {
    const file = document.getElementById("resumeFile").files[0];
    if (!file) throw new Error("Please select a resume file.");

    //const jobDescription = document.getElementById("jobDescription").value;
    //jobDetails

    // Get values
    const fullDesc = fullJobDescription.value.trim();
    const shortDesc = jobDetails.textContent.trim();

    // Use full description only if it has at least 10 characters (adjust as needed)
    //const descriptionToAnalyze = (fullDesc.length > 10) ? fullDesc : shortDesc;
    const jobDescription = fullDesc || shortDesc;

    if (!jobDescription.trim()) throw new Error("Please enter a job description.");

    const resumeText = await extractText(file);
    if (!resumeText.trim()) throw new Error("Could not extract text from resume.");

    console.log("Resume Text:", resumeText);
    console.log("Job Description:", jobDescription);

    const res = await fetch("/.netlify/functions/analyzeResume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText, jobDescription }),
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    status.textContent = "Analysis complete!";
    output.textContent = data.analysis || JSON.stringify(data, null, 2);
  } catch (err) {
    status.textContent = "Error:";
    output.textContent = err.message;
  }
});*/






let analysis = null;
let resumeText = "";
let jobDescription = "";

const statusEl = document.getElementById("status");
const outputEl = document.getElementById("output");
const spinnerEl = document.getElementById("spinner");
const buttons = [
  document.getElementById("parseBtn"),
  document.getElementById("genResumeBtn"),
  document.getElementById("genCoverBtn"),
  document.getElementById("genQuestionsBtn")
];

function setLoading(isLoading) {
  // Show/hide spinner
  spinnerEl.classList.toggle("hidden", !isLoading);
  // Enable/disable all buttons
  buttons.forEach(btn => btn.disabled = isLoading);
}


// Helper: append output and save to localStorage
function appendOutput(title, content, storageKey) {
  const section = document.createElement("div");
  section.classList.add("mb-4", "p-3", "border", "rounded", "bg-gray-50");
  section.innerHTML = `<strong>${title}:</strong><pre class="whitespace-pre-wrap">${content}</pre>`;
  outputEl.appendChild(section);
  outputEl.scrollTop = outputEl.scrollHeight; // auto scroll

  if (storageKey) localStorage.setItem(storageKey, content);
}

// Core analyze function
async function getAnalysis() {
  try {
    setLoading(true);
    statusEl.textContent = "Analyzing resume...";
    outputEl.textContent = "";

    const file = document.getElementById("resumeFile").files[0];
    if (!file) throw new Error("Please select a resume file.");

    resumeText = await extractText(file);
    if (!resumeText.trim()) throw new Error("Could not extract text from resume.");

    const fullDesc = fullJobDescription.value.trim();
    const shortDesc = jobDetails.textContent.trim();
    //const descriptionToAnalyze = (fullDesc.length > 10) ? fullDesc : shortDesc;
    jobDescription = fullDesc || shortDesc;

    //jobDescription = document.getElementById("jobDescription2").value;
    if (!jobDescription.trim()) throw new Error("Please enter a job description.");

    const res = await fetch("/.netlify/functions/analyzeResume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText, jobDescription })
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    //analysis = data.analysis;


    let analysisData;
    try {
        let raw = data.analysis;
        if (typeof raw === "string") {
            // remove markdown code fences (```json ... ```)
            raw = raw.replace(/```json|```/g, "").trim();
            analysisData = JSON.parse(raw);
        } else {
            analysisData = raw; // already an object
            }
            // Display only the analysisReport to the user
            const report = analysisData.analysisReport;
            console.log("Analysis Data:", report);
            appendOutput("Analysis Report", report, "analysisReport");
            // Save full JSON for later use
            localStorage.setItem("analysisData", JSON.stringify(report));
        } catch (e) {
            console.error("Parsing error:", e, data.analysis);
            output.textContent = "Error: Could not parse analysis response.";
        }
        const { analysisReport, ...trimmedData } = analysisData;
        analysis = trimmedData; // keep only the trimmed data
    statusEl.textContent = "Analysis complete!";
    return { resumeText, jobDescription, analysis };
  } catch (err) {
    statusEl.textContent = "Error:";
    appendOutput("Error", err.message);
    //outputEl.textContent = err.message;
    throw err;
  } finally {
    setLoading(false);
  }
}

// Generic function for calling Netlify functions
/*async function callFunction(fnPath, payload, successMessage, outputKey) {
  try {
    setLoading(true);
    statusEl.textContent = successMessage + "...";
    outputEl.textContent = "";

    const res = await fetch(fnPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    statusEl.textContent = successMessage;
    outputEl.textContent = data[outputKey] || JSON.stringify(data, null, 2);
  } catch (err) {
    statusEl.textContent = "Error:";
    outputEl.textContent = err.message;
  } finally {
    setLoading(false);
  }
}*/



// Generic function for other Netlify calls
async function callFunctionAppend(fnPath, payload, title, storageKey) {
  try {
    setLoading(true);
    statusEl.textContent = `${title}...`;

    const res = await fetch(fnPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    appendOutput(title, data[storageKey], storageKey);
    statusEl.textContent = `${title} complete!`;
  } catch (err) {
    statusEl.textContent = "Error:";
    appendOutput("Error", err.message);
  } finally {
    setLoading(false);
  }
}

// Button event listeners
document.getElementById("parseBtn").addEventListener("click", getAnalysis);

document.getElementById("genResumeBtn").addEventListener("click", async () => {
    console.log({ resumeText, jobDescription, analysis });
  if (!analysis) await getAnalysis();
  await callFunctionAppend("/.netlify/functions/writeResume",
    { resumeText, jobDescription, analysis },
    "Resume generated!",
    "rewrittenResume"
  );
});

document.getElementById("genCoverBtn").addEventListener("click", async () => {
  if (!analysis) await getAnalysis();
  await callFunctionAppend("/.netlify/functions/coverLetter",
    { resumeText, jobDescription },
    "Cover letter generated!",
    "coverLetter"
  );
});

document.getElementById("genQuestionsBtn").addEventListener("click", async () => {
  if (!jobDescription) await getAnalysis();
  await callFunctionAppend("/.netlify/functions/interviewQs",
    { jobDescription },
    "Interview questions generated!",
    "interviewQuestions"
  );
});





/*
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import workerSrc from "pdfjs-dist/legacy/build/pdf.worker.min.js?url";

// Tell PDF.js where to find the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = workerSrc;

  async function extractText(file) {
    if (file.type === "application/pdf") {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = async function () {
          const pdf = await pdfjsLib.getDocument({ dataa: new Uint8Array(this.result) }).promise;
          let text = "";
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map((s) => s.str).join(" ") + "\n";
          }
          resolve(text);
        };
        reader.readAsArrayBuffer(file);
      });
    } else if (file.name.endsWith(".docx")) {
      const reader = new FileReader();
      return new Promise((resolve) => {
        reader.onload = async function () {
          const result = await mammoth.extractRawText({ arrayBuffer: this.result });
          resolve(result.value);
        };
        reader.readAsArrayBuffer(file);
      });
    } else {
      throw new Error("Unsupported file format");
    }
  }*/

  /*document.getElementById("analyzeBtn").addEventListener("click", async () => {
    const file = document.getElementById("resumeInput").files[0];
    const jobDescription = document.getElementById("jobDescription").value;
    const resumeText = await extractText(file);

    const res = await fetch("/.netlify/functions/analyzeResume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resumeText, jobDescription }),
    });

    const data = await res.json();
    console.log("AI Analysis:", data);
  });*/
//</script>


// parse resume (send to analyze function)
/*parseBtn.addEventListener('click', async () => {
  if (!resumeFile.files.length) { alert('Choose file'); return; }
  parseBtn.disabled = true;
  parseBtn.textContent = 'Parsing...';
  const fd = new FormData();
  fd.append('resume', await extractText(resumeFile.files[0]));
  fd.append('jobDescription', currentJob ? currentJob.description : '');
  try {
    const res = await fetch('/.netlify/functions/analyzeResume', { method: 'POST', body: JSON.stringify({ fd }) });
    const data = await res.json();
    console.log('Parsed profile:', data);
    // data.profile is LLM-parsed profile
    if (data.profile) {
      profile = data.profile;
      profile.skills = profile.skills || {};
      profile.name = profile.name || '';
      profile.projects = profile.projects || [];
      profile.certifications = profile.certifications || [];
      profileName.value = profile.name;
      renderSkills();
      refreshFitAndActions();
      output.textContent = 'Resume parsed and profile filled.';
    } else {
      output.textContent = 'Parsing failed: ' + JSON.stringify(data);
    }
  } catch (e) {
    output.textContent = 'Parsing error: ' + e.message;
  } finally {
    parseBtn.disabled = false;
    parseBtn.textContent = 'Parse Resume';
  }
});
*/
// add new skill
addSkillBtn.addEventListener('click', () => {
  const name = newSkillName.value.trim(); const lvl = Number(newSkillLevel.value || 50);
  if (!name) return;
  profile.skills[name] = lvl;
  renderSkills(); refreshFitAndActions();
  newSkillName.value = ''; newSkillLevel.value = 60;
  console.log('Added skill:', profile.skills);
});

// compute fit & fetch suggested actions
async function refreshFitAndActions() {
  if (!currentJob) return;
  const body = { profile, job: currentJob };
  // job-fit + gaps + suggested actions computed server-side
  const res = await fetch('/.netlify/functions/getFit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  const pct = data.fitPercentage ?? 0;
  fitBar.style.width = pct + '%';
  fitText.textContent = `Fit: ${pct}% — Missing: ${(data.gaps || []).join(', ') || 'None'}`;
  // suggested actions
  suggestedActions.innerHTML = '';
  if (data.actions) {
    data.actions.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${item.skill}:</strong> ${item.actions.join(' • ')}`;
      suggestedActions.appendChild(li);
    });
  }
}

// generate resume/cover/interview via single endpoint generate
async function generatePayload(type, format='docx') {
  const body = { job: currentJob, profile, type, format };
  output.textContent = 'Generating...';
  const res = await fetch('/.netlify/functions/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  // data.download is base64 file content + metadata
  if (data && data.base64 && data.mime && data.filename) {
    downloadLink.href = 'data:' + data.mime + ';base64,' + data.base64;
    downloadLink.download = data.filename;
    downloadLink.textContent = 'Download ' + data.filename;
    downloadLink.classList.remove('hidden');
    output.textContent = data.text || `${type} generated.`;
  } else {
    output.textContent = 'Generation failed: ' + JSON.stringify(data);
  }
}

//genResumeBtn.addEventListener('click', () => generatePayload('resume', 'docx'));
//genCoverBtn.addEventListener('click', () => generatePayload('cover-letter', 'docx'));
//genQuestionsBtn.addEventListener('click', () => generatePayload('interview-questions', 'text'));

clearBtn.addEventListener('click', () => { output.textContent=''; downloadLink.classList.add('hidden'); });

loadJobs();
