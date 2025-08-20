// Mock Adzuna JSON results
const adzunaJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    description: "Looking for React, JavaScript, CSS, and UI/UX skills."
  },
  {
    id: "2",
    title: "Backend Engineer",
    description: "Requires Node.js, Express, SQL, API design."
  },
  {
    id: "3",
    title: "Fullstack Developer",
    description: "Needs React, Node.js, MongoDB, REST, problem-solving."
  }
];

// Populate dropdown
const jobSelect = document.getElementById("jobSelect");
adzunaJobs.forEach(job => {
  const opt = document.createElement("option");
  opt.value = job.id;
  opt.textContent = job.title;
  jobSelect.appendChild(opt);
});

// Resume upload & analyze
document.getElementById("analyzeBtn").addEventListener("click", async () => {
  const jobId = jobSelect.value;
  const job = adzunaJobs.find(j => j.id === jobId);

  const fileInput = document.getElementById("resumeUpload");
  if (!fileInput.files.length) {
    alert("Please upload a resume first.");
    return;
  }

  const file = fileInput.files[0];
  const resumeText = await extractText(file);

  analyzeResume(resumeText, job);
});

// Dummy file parser (real: pdf-parse / mammoth)
async function extractText(file) {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.onload = e => {
      resolve(e.target.result.toLowerCase()); // Treat as text
    };
    reader.readAsText(file);
  });
}

// Resume analysis
function analyzeResume(resume, job) {
  const jobSkills = job.description.toLowerCase().match(/\b[a-zA-Z0-9\-\+\.]+\b/g) || [];
  const matched = jobSkills.filter(skill => resume.includes(skill));
  const missing = jobSkills.filter(skill => !resume.includes(skill));

  const fitPercent = Math.round((matched.length / jobSkills.length) * 100);

  // UI updates
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("fitScore").textContent = `Fit Score: ${fitPercent}%`;

  document.getElementById("missingSkills").innerHTML =
    `<strong>Missing Skills:</strong> ${missing.join(", ") || "None 🎉"}`;

  document.getElementById("improvementTips").innerHTML =
    `<strong>Improvement Tips:</strong> 
    ${missing.length > 0 ? "Consider adding projects, experience, or keywords related to missing skills." : "Your resume looks strong for this role!"}`;
}
// Event listener for chatbot button
/*document.getElementById("chatbotBtn").addEventListener("click", () => {
  const jobId = jobSelect.value;
  const job = adzunaJobs.find(j => j.id === jobId);
  const resumeText = document.getElementById("resumeUpload").files[0];

  if (!resumeText) {
    alert("Please upload a resume first.");
    return;
  }

  // Call chatbot API with job and resume info
  callChatbotAPI(job, resumeText);
});*/
