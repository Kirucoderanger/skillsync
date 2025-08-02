export function renderSkillTracker(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <h2>Skill Tracker</h2>
    <ul id="skill-list"></ul>
    <input type="text" id="skill-input" placeholder="Add a skill..." />
    <button onclick="addSkill()">Add</button>
  `;
}

window.addSkill = function () {
  const input = document.getElementById("skill-input");
  const skillList = document.getElementById("skill-list");
  const skill = input.value.trim();
  if (skill) {
    const li = document.createElement("li");
    li.textContent = skill + " (To Learn)";
    skillList.appendChild(li);
    input.value = "";
  }
}
