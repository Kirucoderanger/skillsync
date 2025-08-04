import { fetchTrendingJobs } from '../../api/adapters.mjs';

export async function renderJobSearch(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = `
    <h2>Job Title Search</h2>
    <input id="job-title-input" placeholder="e.g. Frontend Developer" />
    <button id="search-job-btn">Search</button>
    <ul id="job-skills-results"></ul>
  `;

  document.getElementById("search-job-btn").onclick = async () => {
    const title = document.getElementById("job-title-input").value;
    const results = await fetchTrendingJobs(title);
    const ul = document.getElementById("job-skills-results");
    ul.innerHTML = results.map(r => `<li>${r.title} - ${r.skills.join(', ')}</li>`).join('');
  };
}
