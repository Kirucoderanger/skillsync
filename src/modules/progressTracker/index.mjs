export function renderProgressTracker(containerId) {
  const container = document.getElementById(containerId);
  const skills = JSON.parse(localStorage.getItem("skillTrackerData")) || [];
  const total = skills.length;
  const completed = skills.filter(s => s.state === "Completed").length;
  const percent = total ? Math.round((completed / total) * 100) : 0;

  container.innerHTML = `
    <h2>Learning Progress</h2>
    <progress value="${percent}" max="100"></progress>
    <p>${percent}% Completed</p>
  `;
}


