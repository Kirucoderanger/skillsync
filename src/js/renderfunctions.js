export default async function renderCourses(courses) {
    const courseSuggestions = document.querySelector("#course-suggestions");
  console.log("fetched course on rendercourse", courses);

  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    courseSuggestions.innerHTML = `<div class="text-gray-500">No courses found.</div>`;
    return;
  }

  courseSuggestions.innerHTML = courses.map(course => `
    <div class="bg-green-50 p-3 rounded shadow hover:bg-green-100 transition">
      <h4 class="font-bold">${course.title}</h4>
        <p class="text-sm text-gray-600">Price: ${course.price} • ⭐ ${course.rating}</p>
        <a href="${course.url}" target="_blank" class="text-blue-600 underline">View Course</a>
        <img src="${course.image}" alt="course image" loading="lazy" width=300 hight=200> </div>
    </div>
  `).join('');
}


