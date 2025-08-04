import { fetchTrendingJobs } from '../../api/adapters.mjs';

export async function renderTrendingJobs(containerId) {
  const container = document.getElementById(containerId);
  const jobs = await fetchTrendingJobs("all");
  container.innerHTML = `
    <h2>Trending Jobs</h2>
    <ul>
      ${jobs.map(j => `<li>${j.title} – ${j.location} – ${j.salary}</li>`).join('')}
    </ul>
  `;
}
