const SKILL_KEY = "skillTrackerData";

export function renderSkillTracker(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <h2>Skill Tracker</h2>
    <input id="skill-input" placeholder="New skill" />
    <select id="skill-state">
      <option>To Learn</option>
      <option>In Progress</option>
      <option>Completed</option>
    </select>
    <button onclick="addSkill()">Add</button>
    <ul id="tracked-skills"></ul>
  `;

  displaySkills();
}

window.addSkill = function () {
  const input = document.getElementById("skill-input");
  const state = document.getElementById("skill-state").value;
  const skills = JSON.parse(localStorage.getItem(SKILL_KEY)) || [];
  skills.push({ name: input.value, state });
  localStorage.setItem(SKILL_KEY, JSON.stringify(skills));
  input.value = "";
  displaySkills();
}

function displaySkills() {
  const ul = document.getElementById("tracked-skills");
  const skills = JSON.parse(localStorage.getItem(SKILL_KEY)) || [];
  ul.innerHTML = skills.map(skill =>
    `<li style="color:${getColor(skill.state)}">${skill.name} (${skill.state})</li>`
  ).join('');
}

function getColor(state) {
  switch(state) {
    case "Completed": return "green";
    case "In Progress": return "orange";
    case "To Learn": return "gray";
  }
}
