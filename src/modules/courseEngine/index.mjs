import { fetchCourses } from '../../api/adapters.mjs';

export async function renderCourseRecommendations(containerId, skill) {
  const container = document.getElementById(containerId);
  const courses = await fetchCourses(skill);
  container.innerHTML = `
    <h2>Recommended Courses for "${skill}"</h2>
    <ul>
      ${courses.map(c => `<li><a href="\${c.url}" target="_blank">${c.title} (${c.provider})</a></li>`).join('')}
    </ul>
  `;
}
