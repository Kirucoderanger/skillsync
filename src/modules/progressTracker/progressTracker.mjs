// ======================
// SkillSync Skill Tracker with Progress History
// ======================

const STORAGE_KEY = "skillsync_skills";

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

// ===== CRUD Functions =====
function addSkill(name, level, progress) {
  let skills = getSkills();
  const newSkill = {
    id: generateId(),
    name,
    level,
    progress,
    history: [{ date: new Date().toLocaleDateString(), progress }]
  };
  skills.push(newSkill);
  saveSkills(skills);
  renderSkills();
}

function updateSkill(id, newLevel, newProgress) {
  let skills = getSkills();
  skills = skills.map(skill => {
    if (skill.id === id) {
      skill.level = newLevel;
      skill.progress = newProgress;
      skill.history.push({ date: new Date().toLocaleDateString(), progress: newProgress });
    }
    return skill;
  });
  saveSkills(skills);
  renderSkills();
}

function deleteSkill(id) {
  let skills = getSkills().filter(skill => skill.id !== id);
  saveSkills(skills);
  renderSkills();
}

// ===== Rendering =====
function renderSkills() {
  const skills = getSkills();
  const skillList = document.getElementById("skillList");
  skillList.innerHTML = "";

  if (skills.length === 0) {
    skillList.innerHTML = "<p class='text-gray-500'>No skills added yet.</p>";
    return;
  }

  skills.forEach(skill => {
    const row = document.createElement("div");
    row.className = "p-4 border-b bg-white rounded shadow mb-4";

    row.innerHTML = `
      <div class="flex justify-between items-center">
        <div>
          <strong>${skill.name}</strong>
          <span class="text-sm text-gray-500">(${skill.level})</span>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-1">
            <div class="bg-blue-500 h-2 rounded-full" style="width: ${skill.progress}%;"></div>
          </div>
        </div>
        <div class="flex gap-2">
          <button onclick="updateSkill(${skill.id}, prompt('New Level:', '${skill.level}'), parseInt(prompt('New Progress %:', ${skill.progress})))" 
            class="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
          <button onclick="deleteSkill(${skill.id})" 
            class="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
        </div>
      </div>
      <canvas id="chart-${skill.id}" height="100" class="mt-4"></canvas>
    `;

    skillList.appendChild(row);

    // Draw progress history chart
    drawSkillChart(`chart-${skill.id}`, skill.history);
  });
}

// ===== Chart.js Integration =====
function drawSkillChart(canvasId, history) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: history.map(entry => entry.date),
      datasets: [{
        label: 'Progress (%)',
        data: history.map(entry => entry.progress),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
}

// ===== Example UI Logic =====
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();

  document.getElementById("addSkillForm").addEventListener("submit", e => {
    e.preventDefault();
    const name = document.getElementById("skillName").value.trim();
    const level = document.getElementById("skillLevel").value;
    const progress = parseInt(document.getElementById("skillProgress").value);
    if (!name) return alert("Please enter a skill name.");
    addSkill(name, level, progress);
    e.target.reset();
  });
});
