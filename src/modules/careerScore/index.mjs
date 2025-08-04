import { analyzeResume } from '../../api/adapters.mjs';

export function renderCareerScore(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <h2>Career Readiness Score</h2>
    <textarea id="resume-input" placeholder="Paste resume..."></textarea>
    <button id="analyze-resume">Analyze</button>
    <div id="resume-score-result"></div>
  `;

  document.getElementById("analyze-resume").onclick = async () => {
    const text = document.getElementById("resume-input").value;
    const result = await analyzeResume(text);
    document.getElementById("resume-score-result").innerText =
      `Score: ${result.score}\nFeedback: ${result.feedback}`;
  };
}
