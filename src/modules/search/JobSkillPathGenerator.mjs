

// main.mjs

// --------------------
// DOM Elements
// --------------------
/*
const jobInput = document.getElementById("job-input");
const searchButton = document.getElementById("search-btn");
const trendingSkillsList = document.getElementById("skills-container");
const learningPathSection = document.getElementById("course-suggestions");

// --------------------
// Mock trending skills
// --------------------
const trendingSkillsDB = {
  "frontend developer": ["JavaScript", "React", "HTML", "CSS", "Git"],
  "backend developer": ["Node.js", "Express", "SQL", "MongoDB", "REST API"],
  "data analyst": ["Python", "Pandas", "Excel", "SQL", "Power BI"]
};

// --------------------
// Event: Job Title Search
// --------------------
searchButton.addEventListener("click", () => {
  const jobTitle = jobInput.value.toLowerCase().trim();
  const skills = trendingSkillsDB[jobTitle];
  if (!skills) {
    trendingSkillsList.innerHTML = `<li class='text-red-500'>No skills found for "${jobTitle}"</li>`;
    return;
  }
  // Store skills in localStorage
  localStorage.setItem("trendingSkills", JSON.stringify(skills));

  // Display skills
  trendingSkillsList.innerHTML = skills
    .map(skill => `<li class="bg-blue-100 text-blue-800 px-2 py-1 rounded m-1 inline-block">${skill}</li>`) 
    .join("");

  generateLearningPath(skills);
});

// --------------------
// Generate Learning Path
// --------------------
function generateLearningPath(skills) {
  const recommendedCourses = skills.map(skill => ({
    skill,
    course: `Master ${skill} - Beginner to Advanced`,
    provider: "Udemy",
    progress: 0
  }));

  // Save to localStorage
  localStorage.setItem("learningPath", JSON.stringify(recommendedCourses));

  // Display on UI
  learningPathSection.innerHTML = recommendedCourses
    .map(course => `
      <div class="bg-white shadow p-4 rounded mb-4">
        <h3 class="text-lg font-semibold text-gray-800">${course.course}</h3>
        <p class="text-sm text-gray-600 mb-2">Provider: ${course.provider}</p>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div class="bg-green-500 h-2.5 rounded-full" style="width: ${course.progress}%"></div>
        </div>
        <button class="mt-2 text-sm text-blue-600 hover:underline" onclick='trackProgress("${course.skill}")'>Track Progress</button>
      </div>
    `)
    .join("");
}

// --------------------
// Track Progress (Simulated)
// --------------------
window.trackProgress = function(skill) {
  const path = JSON.parse(localStorage.getItem("learningPath")) || [];
  const updated = path.map(course => {
    if (course.skill === skill) {
      course.progress = Math.min(course.progress + 25, 100);
    }
    return course;
  });
  localStorage.setItem("learningPath", JSON.stringify(updated));
  generateLearningPath(updated.map(c => c.skill));
};

// --------------------
// Restore on Load
// --------------------
window.addEventListener("DOMContentLoaded", () => {
  const skills = JSON.parse(localStorage.getItem("trendingSkills"));
  if (skills) {
    trendingSkillsList.innerHTML = skills
      .map(skill => `<li class="bg-blue-100 text-blue-800 px-2 py-1 rounded m-1 inline-block">${skill}</li>`) 
      .join("");
    generateLearningPath(skills);
  }
});
*/




const searchJobs = async (jobTitle) => {
  const res = await fetch(`../api/job-search?query=${encodeURIComponent(jobTitle)}`);
  const jobs = await res.json();
  console.log("Jobs:", jobs);
};




// ---------------------------
// DOM Elements
// ---------------------------

const jobSearchInput = document.querySelector("#job-input");
const searchBtn = document.querySelector("#search-btn");
const trendingSkillsList = document.querySelector("#skills-container");
const courseSuggestions = document.querySelector("#course-suggestions");
const userSkillStatus = document.querySelector("#user-skill-tracker");

// ---------------------------
// Mock Data (Replace with API later)
// ---------------------------
const mockSkills = {
  "frontend developer": ["HTML", "CSS", "JavaScript", "React", "Tailwind"],
  "backend developer": ["Node.js", "Express", "MongoDB", "SQL", "JWT"]
};

const mockCourses = {
  "HTML": { title: "Master HTML5", provider: "Udemy", progress: 20 },
  "CSS": { title: "Modern CSS from Scratch", provider: "Coursera", progress: 0 },
  "JavaScript": { title: "JavaScript Bootcamp", provider: "Udemy", progress: 50 },
  "React": { title: "React for Beginners", provider: "Coursera", progress: 0 },
  "Tailwind": { title: "Tailwind in Action", provider: "Udemy", progress: 0 }
};

// ---------------------------
// Event Handlers
// ---------------------------
searchBtn.addEventListener("click", () => {
  const title = jobSearchInput.value.trim().toLowerCase();
  if (!title || !mockSkills[title]) {
    trendingSkillsList.innerHTML = `<li class="text-red-500">No skills found for "${title}"</li>`;
    return;
  }

  const skills = mockSkills[title];
  trendingSkillsList.innerHTML = "";
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.className = "bg-blue-100 text-blue-800 px-3 py-1 m-1 rounded cursor-pointer hover:bg-blue-200";
    li.textContent = skill;
    li.addEventListener("click", () => addSkill(skill));
    trendingSkillsList.appendChild(li);
  });

  generateCourses(skills);
});

function addSkill(skill) {
  let tracked = JSON.parse(localStorage.getItem("trackedSkills") || "[]");
  if (!tracked.includes(skill)) {
    tracked.push(skill);
    localStorage.setItem("trackedSkills", JSON.stringify(tracked));
    renderSkillTracker();
  }
}

function generateCourses(skills) {
  courseSuggestions.innerHTML = "";
  skills.forEach(skill => {
    if (mockCourses[skill]) {
      const course = mockCourses[skill];
      const div = document.createElement("div");
      div.className = "bg-white shadow p-4 rounded mb-2 border-l-4 border-blue-400";
      div.innerHTML = `
        <h3 class="font-bold text-lg">${course.title}</h3>
        <p class="text-sm text-gray-600">${course.provider}</p>
        <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div class="bg-blue-500 h-2 rounded-full" style="width: ${course.progress}%"></div>
        </div>
      `;
      courseSuggestions.appendChild(div);
    }
  });
}

// ---------------------------
// Render Skill Tracker
// ---------------------------
function renderSkillTracker() {
  const skills = JSON.parse(localStorage.getItem("trackedSkills") || "[]");
  userSkillStatus.innerHTML = "";

  skills.forEach(skill => {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-gray-100 p-2 rounded mb-1";
    div.innerHTML = `
      <span>${skill}</span>
      <select class="ml-4 rounded border-gray-300 text-sm">
        <option>To Learn</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>
    `;
    userSkillStatus.appendChild(div);
  });
}

// ---------------------------
// On Load
// ---------------------------
renderSkillTracker();

