import { greetUser } from '../modules/user.mjs';
import { renderSkillTracker } from '../components/skillTracker.mjs';
import { renderResumeAnalyzer } from '../components/resumeAnalyzer.mjs';
import loadHeaderFooter from "./utilities.mjs";
//import { updateCategoryDropdown } from '../modules/skillTracker/JobSkillPathGenerator.mjs';



loadHeaderFooter("#header", "#footer");
//document.querySelector('#hamburger').addEventListener('click', () => {
   //document.querySelector('#mobile-nav').classList.toggle('show');
//});

greetUser();
renderSkillTracker("skill-tracker");
renderResumeAnalyzer("resume-analyzer");

function updateCategoryDropdown() {
  const categoryDropdown = document.getElementById("career-goal");
  
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
  //skillList.innerHTML = ""; // clear previous

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
  renderSkillTracking(category);

  skills.forEach(skill => {
    const li = document.createElement("li");
    li.className = "bg-blue-100 text-blue-800 px-3 py-1 m-1 rounded cursor-pointer hover:bg-blue-200";
    li.textContent = skill;
    li.addEventListener("click", () => {
      //addSkill(skill, category);
      //generateCourses(skill);
      //renderSkillTracker(category);
    });
    //trendingSkillsList.appendChild(li);
  });

  //generateCourses(skills);

  



});

}
const userSkillStatus = document.querySelector("#user-skill-tracker");
const progressBar = document.querySelector(".progress-bar");
//const progress = document.querySelector(".progress");




// Render Skill Tracker
// ---------------------------
function renderSkillTracking(category) {

    // Mapping for option values
const levelMap = {
  10: "To Learn",
  50: "In Progress",
  100: "Completed"
};

// Reverse map for setting dropdown value from text
const reverseLevelMap = {
  "To Learn": 10,
  "In Progress": 50,
  "Completed": 100
};

let countProgressBar = 0;

  const skills = JSON.parse(localStorage.getItem(`${category}-trackedSkills`) || "[]");
  userSkillStatus.innerHTML = "";
  progressBar.innerHTML = "";
  skills.forEach((skill, index) => {
    const progressValue = reverseLevelMap[skill.level];
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

    //progress.style.width = `${progressValue}%`;
    const progressBarLabel = document.createElement("div");
    progressBarLabel.className = "text-sm text-gray-600 ml-2";
    progressBarLabel.textContent = `${skill.name}`;

    const progress = document.createElement("div");
    //progress.className = "progress bg-blue-600 h-full rounded-full";
    progress.className = `progress${countProgressBar} bg-blue-600 h-full rounded-full`;
    progress.style.width = `${progressValue}%`;
    countProgressBar++;
    progressBar.appendChild(progressBarLabel);
    progressBar.appendChild(progress);

    userSkillStatus.appendChild(skillDiv);  
  });




  document.querySelectorAll("select").forEach(select => {
    const progress = document.querySelector(`.progress${select.getAttribute("data-index")}`);
    select.addEventListener("change", (e) => {
      
      const index = e.target.getAttribute("data-index");
      const newLevel = levelMap[e.target.value];
      
      // Update in array
      skills[index].level = newLevel;

      // Save back to localStorage
      localStorage.setItem(`${category}-trackedSkills`, JSON.stringify(skills));

      // Update progress bar immediately
      //const progressBar = e.target.closest("div").nextElementSibling.querySelector(".progress-bar");
      progress.style.width = e.target.value + "%";
    });
  });
}



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


document.addEventListener("DOMContentLoaded", () => {
  updateCategoryDropdown();
});



const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotModal = document.getElementById('chatbot-modal');
const chatSendBtn = document.getElementById('chat-send-btn');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');

import chatBot from "../modules/chatbot";
chatBot();