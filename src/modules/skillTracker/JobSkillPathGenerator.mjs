

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
searchBtn.addEventListener("click", async() => {
  const title = jobSearchInput.value.trim().toLowerCase();
  //if (!title || !mockSkills[title]) {
    //trendingSkillsList.innerHTML = `<li class="text-red-500">No skills found for "${title}"</li>`;
    //return;
  //}
  const res = await fetch(`/.netlify/functions/extract-skill?title=${encodeURIComponent(title)}`);
  const data  = await res.json();

  /*skillTracker.innerHTML = data.skills.map(skill => `
          <button 
            class="bg-green-100 hover:bg-green-200 text-green-800 text-sm m-1 px-3 py-1 rounded skill-button"
            data-skill="${skill}" 
            data-category="${category}">
            ${skill}
          </button>
        `).join('');*/

  //const skills = mockSkills[title];
  const skills = data.skills;
  trendingSkillsList.innerHTML = "";
  skills.forEach(skill => {
    const li = document.createElement("li");
    li.className = "bg-blue-100 text-blue-800 px-3 py-1 m-1 rounded cursor-pointer hover:bg-blue-200";
    li.textContent = skill;
    li.addEventListener("click", () => {
      const categoryKey = `skills:${title}`;
      const existing = JSON.parse(localStorage.getItem(categoryKey)) || [];
            if (!existing.includes(skill)) {
              existing.push(skill);
              localStorage.setItem(categoryKey, JSON.stringify(existing));
              //btn.classList.add("bg-green-300"); // visually confirm save
            }




      addSkill(skill, title);
      generateCourses(skill);
      renderSkillTracker(title);
    });
    trendingSkillsList.appendChild(li);
  });

  //generateCourses(skills);
});


// ===== Utility Functions =====
function getSkills() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveSkills(skills) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(skills));
}

function generateId() {
  return Date.now();
}


function addSkill(skill, category, level = "To Learn") {
  let tracked = JSON.parse(localStorage.getItem(`${category}-trackedSkills`) || "[]");
  if (!tracked.some(s => s.name === skill)) {
  //if (!tracked.includes(skill)) {
  //let skills = getSkills();
  //let level = "To Learn"; // default level
  const newSkill = {
    //id: generateId(),
    name: skill,
    level: level,
    //skill: level,
    //history: [{ date: new Date().toLocaleDateString(), progress }]
  };
  tracked.push(newSkill);
  localStorage.setItem(`${category}-trackedSkills`, JSON.stringify(tracked));
  renderSkillTracker(category);
  //saveSkills(tracked);
  //renderSkills();
}
}




/*function addSkill(skill, category) {
  let tracked = JSON.parse(localStorage.getItem(`${category}-trackedSkills`) || "[]");
  if (!tracked.includes(skill)) {
    tracked.push(skill);
    localStorage.setItem(`${category}-trackedSkills`, JSON.stringify(tracked));
    renderSkillTracker(category);
  }
}*/

import fetchCourses from "../courseEngine/courseSuggest.mjs";
import renderCourses from "../../js/renderfunctions.js";
   
async function generateCourses(skills) {
  const courseSuggestions = document.querySelector("#course-suggestions");

  const courses = await fetchCourses(skills);
  console.log(courses);
  renderCourses(courses);

/*
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
  });*/
}

// ---------------------------
// Render Skill Tracker
// ---------------------------
function renderSkillTracker(category) {
  const skills = JSON.parse(localStorage.getItem(`${category}-trackedSkills`) || "[]");
  userSkillStatus.innerHTML = "";

  /*skills.forEach(skill => {
    const div = document.createElement("div");
    div.className = "flex justify-between items-center bg-gray-100 p-2 rounded mb-1";
    div.innerHTML = `
      <span>${skill.name}</span>
      <select class="ml-4 rounded border-gray-300 text-sm">
        <option value="10">To Learn</option>
        <option value="50">In Progress</option>
        <option value="100">Completed</option>
      </select>
    `;
    userSkillStatus.appendChild(div);*/


    
     skills.forEach((skill, index) => {
    const skillDiv = document.createElement("div");
    skillDiv.className = "flex justify-between items-center bg-gray-100 p-2 rounded mb-1";

    skillDiv.innerHTML = `
      <span class="font-medium">${skill.name}</span>
      <select data-index="${index}" class="ml-4 rounded border-gray-300 text-sm">
        <option value="10" ${skill.level === "To Learn" ? "selected" : ""}>To Learn</option>
        <option value="50" ${skill.level === "In Progress" ? "selected" : ""}>In Progress</option>
        <option value="100" ${skill.level === "Completed" ? "selected" : ""}>Completed</option>
      </select>
    `;

    userSkillStatus.appendChild(skillDiv);  
  });


  // Mapping for option values
const levelMap = {
  10: "To Learn",
  50: "In Progress",
  100: "Completed"
};

  document.querySelectorAll("select").forEach(select => {
    select.addEventListener("change", (e) => {
      const index = e.target.getAttribute("data-index");
      const newLevel = levelMap[e.target.value];
      
      // Update in array
      skills[index].level = newLevel;

      // Save back to localStorage
      localStorage.setItem(`${category}-trackedSkills`, JSON.stringify(skills));
    });
  });
}

// ---------------------------
// On Load
// ---------------------------
//renderSkillTracker();


const categorySelect = document.getElementById("career-goal");


 function updateCategoryDropdown() {
  const categoryDropdown = document.getElementById("career-goal");
  //categoryDropdown.innerHTML = ""; // clear previous

  //getSkillCategories();

  // Iterate all localStorage keys
  /*for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("skill:")) {
      const category = key.replace("skill:", "");

      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryDropdown.appendChild(option);
    }
  }*/
 const skillsByCategory = getSkillCategories();

// Fill category dropdown
const categorySelect = document.getElementById("career-goal");
for (const category in skillsByCategory) {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
}



categorySelect.addEventListener("change", (e) => {
  const category = document.getElementById("career-goal").value;
  const skillList = document.getElementById("skills-container");
  skillList.innerHTML = ""; // clear previous

  const selectedCategory = e.target.value;
  
  const skills = skillsByCategory[selectedCategory] || [];
  //const skills = selectedCategory || [];
  console.log("selectedCategory", skills )
  console.log("selectedCategory", category )

  /*skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillList.appendChild(li);
  });*/

  skills.forEach(skill => {
    const li = document.createElement("li");
    li.className = "bg-blue-100 text-blue-800 px-3 py-1 m-1 rounded cursor-pointer hover:bg-blue-200";
    li.textContent = skill;
    li.addEventListener("click", () => {
      addSkill(skill, category);
      generateCourses(skill);
      renderSkillTracker(category);
    });
    trendingSkillsList.appendChild(li);
  });

  //generateCourses(skills);

  



});

}


document.addEventListener("DOMContentLoaded", () => {
  updateCategoryDropdown();
});



function getAllStoredSkills() {
  const skillData = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("skill-")) {
      const category = key.replace("skill-", "");
      const skills = JSON.parse(localStorage.getItem(key));
      skillData[category] = skills;
    }
  }

  return skillData; // { "Retail Analytics": [...], "Category Management": [...] }
}



const skillData = getAllStoredSkills();
const categoryDropdown = document.getElementById("career-goal");

Object.keys(skillData).forEach(category => {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categoryDropdown.appendChild(option);
});




const skillListContainer = document.getElementById("skillList");

categoryDropdown.addEventListener("change", () => {
  const selectedCategory = categoryDropdown.value;
  const skills = getAllStoredSkills()[selectedCategory] || [];

  skillListContainer.innerHTML = skills.map(skill => `
    <button class="bg-green-100 hover:bg-green-200 text-green-800 text-sm m-1 px-3 py-1 rounded skill-button">
      ${skill}
    </button>
  `).join('');
});


function getSkillCategories() {
  const skills = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key.startsWith("skills:")) {
      try {
        const value = JSON.parse(localStorage.getItem(key));
        if (Array.isArray(value)) {
          const category = key.replace("skills:", ""); // remove prefix
          skills[category] = value;
        }
      } catch (e) {
        console.warn(`Invalid skill data at ${key}`);
      }
    }
  }

  return skills;
}


/*const skillsByCategory = getSkillCategories();

// Fill category dropdown
const categorySelect = document.getElementById("category-dropdown");
for (const category in skillsByCategory) {
  const option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
}*/

// On category change → populate skill list
/*categorySelect.addEventListener("change", (e) => {
  const skillList = document.getElementById("skills-container");
  skillList.innerHTML = ""; // clear previous

  const selectedCategory = e.target.value;
  const skills = skillsByCategory[selectedCategory] || [];

  skills.forEach(skill => {
    const li = document.createElement("li");
    li.textContent = skill;
    skillList.appendChild(li);
  });
});*/

import chatBot from "../chatbot";
chatBot();