


const courseContainer = document.getElementById('course-list');
//const jobTitle = 'python';

export default async function fetchCourses(jobTitle) {
    console.log(jobTitle);
  //courseContainer.innerHTML = 'Loading courses...';
  try {
    const res = await fetch(`/.netlify/functions/course-search?title=${encodeURIComponent(jobTitle)}`);
    //let handler = `/.netlify/functions/job-search?title=${encodeURIComponent(jobTitle)}`
    //const data = await fetch(handler);
    //const response = await fetch('/.netlify/functions/course-search'); 
    //const data = await response.json();
    
    if (!res.ok) throw new Error('Course API failed');
    const courses = await res.json();
    console.log(courses);

    /*courseContainer.innerHTML = courses.map(course => `
      <div class="bg-white p-4 rounded shadow">
        <h4 class="font-bold">${course.title}</h4>
        <p class="text-sm text-gray-600">Price: ${course.org_price} • ⭐ ${course.rating}</p>
        <a href="${course.coupon}" target="_blank" class="text-blue-600 underline">View Course</a>
        <img src="${course.pic}" alt="course image" loading="lazy" width=300 hight=200> </div>
    `).join('');*/

    return courses;
  } catch (err) {
    courseContainer.innerHTML = `<p class="text-red-500">Error: ${err.message}</p>`;
  }
}

//fetchCourses(jobTitle);
