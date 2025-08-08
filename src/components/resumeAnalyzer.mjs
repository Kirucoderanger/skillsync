import { analyzeResume } from '../api/adapters.mjs';

export function renderResumeAnalyzer(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <h2>Career Readiness Score</h2>
    <textarea id="resume-input" placeholder="Paste your resume here..."></textarea>
    <button id="analyze-btn">Analyze</button>
    <div id="analysis-result"></div>
  `;

  document.getElementById("analyze-btn").onclick = async () => {
    const text = document.getElementById("resume-input").value;
    const result = await analyzeResume(text);
    document.getElementById("analysis-result").innerText =`Score: ${result.score}\nFeedback: ${result.feedback}`;
  };
}

