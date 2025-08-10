// DOM Elements
/*
const jobInput = document.getElementById('job-title-input');
const searchBtn = document.getElementById('job-search-btn');
const trendingJobs = document.getElementById('trending-jobs');
const courseSuggestions = document.getElementById('course-suggestions');
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotModal = document.getElementById('chatbot-modal');
const chatSendBtn = document.getElementById('chat-send-btn');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');

// 🧠 Local Cache
let trendingSkillCache = {};
let courseCache = {};

// ✨ Event Listeners
searchBtn.addEventListener('click', () => {
  const title = jobInput.value.trim();
  if (!title) return;
  fetchJobSkills(title);
  fetchCourses(title);
});

chatbotBtn.addEventListener('click', () => {
  chatbotModal.classList.remove('hidden');
});
chatbotModal.addEventListener('click', (e) => {
  if (e.target === chatbotModal) chatbotModal.classList.add('hidden');
});
chatSendBtn.addEventListener('click', () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  chatLog.innerHTML += `<div class="mb-2"><strong>You:</strong> ${msg}</div>`;
  chatInput.value = '';
  simulateBotReply(msg);
});

// 🔍 Fetch job data from Adzuna API (mocked)
async function fetchJobSkills(jobTitle) {
  trendingJobs.innerHTML = `<div class="col-span-2 text-center text-sm text-gray-500">Fetching trending skills...</div>`;
  try {
    // Simulate real API
    const skills = await mockFetchTrendingSkills(jobTitle);
    trendingSkillCache[jobTitle] = skills;
    renderSkills(skills);
    localStorage.setItem('trendingSkills', JSON.stringify(trendingSkillCache));
  } catch (err) {
    trendingJobs.innerHTML = `<div class="text-red-600 text-sm">Failed to fetch skills. Try again.</div>`;
  }
}

// 🎓 Fetch personalized courses (mocked)
async function fetchCourses(topic) {
  courseSuggestions.innerHTML = `<div class="col-span-2 text-center text-sm text-gray-500">Finding best learning paths...</div>`;
  try {
    const courses = await mockFetchCourses(topic);
    courseCache[topic] = courses;
    renderCourses(courses);
    localStorage.setItem('courseSuggestions', JSON.stringify(courseCache));
  } catch (err) {
    courseSuggestions.innerHTML = `<div class="text-red-600 text-sm">Could not load courses.</div>`;
  }
}

// 🧠 Simulated bot
function simulateBotReply(msg) {
  const reply = `🤖: You asked about "${msg}". I recommend starting with learning the fundamentals and checking the course section.`;
  setTimeout(() => {
    chatLog.innerHTML += `<div class="mb-2 text-purple-700">${reply}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  }, 800);
}

// 🛠️ Render trending skills UI
function renderSkills(skills) {
  trendingJobs.innerHTML = skills
    .map(
      (skill) => `
      <div class="bg-blue-50 p-3 rounded shadow hover:bg-blue-100 transition">
        <h3 class="text-md font-semibold">${skill.title}</h3>
        <p class="text-sm text-gray-600">Top Skill: ${skill.topSkill}</p>
        <span class="text-xs text-gray-500">${skill.count}+ openings</span>
      </div>
    `
    )
    .join('');
}

// 🛠️ Render course suggestions
function renderCourses(courses) {
  courseSuggestions.innerHTML = courses
    .map(
      (course) => `
      <div class="bg-green-50 p-3 rounded shadow hover:bg-green-100 transition">
        <h4 class="font-medium text-md">${course.title}</h4>
        <p class="text-sm text-gray-600">${course.provider}</p>
        <a href="${course.url}" target="_blank" class="text-blue-500 text-sm underline">View Course</a>
      </div>
    `
    )
    .join('');
}

// ✅ Mock trending skill API
async function mockFetchTrendingSkills(jobTitle) {
  return new Promise((res) =>
    setTimeout(() => {
      res([
        { title: jobTitle, topSkill: 'JavaScript', count: 231 },
        { title: jobTitle, topSkill: 'React.js', count: 178 },
        { title: jobTitle, topSkill: 'Git', count: 92 },
      ]);
    }, 1200)
  );
}

// ✅ Mock course API
async function mockFetchCourses(topic) {
  return new Promise((res) =>
    setTimeout(() => {
      res([
        {
          title: `${topic} – Beginner to Pro`,
          provider: 'Udemy',
          url: 'https://www.udemy.com',
        },
        {
          title: `Mastering ${topic} Skills`,
          provider: 'Coursera',
          url: 'https://www.coursera.org',
        },
      ]);
    }, 1000)
  );
}*/

import { handler } from "../../../netlify/functions/job-search";




//import ExternalServices from "./ExternalServices.mjs";



// DOM Elements
//const jobInput = document.getElementById('job-title-input');
//const searchBtn = document.getElementById('job-search-btn1');
const trendingJobs = document.getElementById('trending-jobs');
const courseSuggestions = document.getElementById('course-suggestions');
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotModal = document.getElementById('chatbot-modal');
const chatSendBtn = document.getElementById('chat-send-btn');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');
const categoryDropdown = document.getElementById('category-dropdown');
const countryDropdown = document.getElementById('country-dropdown');


// Local cache
let trendingSkillCache = JSON.parse(localStorage.getItem('trendingSkills') || '{}');
let courseCache = JSON.parse(localStorage.getItem('courseSuggestions') || '{}');

// Event Listeners
/*searchBtn.addEventListener('click', async () => {
  const title = jobInput.value.trim();
  if (!title) return;
  await fetchJobSkills(title);
  await fetchCourses(title);
});*/

const remoteToggle = document.getElementById('remote-toggle');

/*searchBtn.addEventListener('click', async () => {
  const title = jobInput.value.trim();
  const remote = remoteToggle.checked;
  if (!title) return;
  await fetchJobSkills(title, remote);
  await fetchCourses(title);
});*/





/*chatbotBtn.addEventListener('click', () => {
  chatbotModal.classList.remove('hidden');
});
chatbotModal.addEventListener('click', e => {
  if (e.target === chatbotModal) chatbotModal.classList.add('hidden');
});
chatSendBtn.addEventListener('click', async () => {
  const msg = chatInput.value.trim();
  if (!msg) return;
  chatLog.innerHTML += `<div class="mb-2"><strong>You:</strong> ${msg}</div>`;
  chatInput.value = '';
  await sendChatbotQuery(msg);
});*/

// Fetch job skills via Netlify function
/*
async function fetchJobSkills(jobTitle) {
  trendingJobs.innerHTML = `<div class="col-span-2 text-center text-gray-500">Loading trending jobs...</div>`;
  try {
    const resp = await fetch(`/api/job-search?query=${encodeURIComponent(jobTitle)}`);
    if (!resp.ok) throw new Error('Failed to fetch jobs');
    const jobs = await resp.json();
    trendingSkillCache[jobTitle] = jobs;
    localStorage.setItem('trendingSkills', JSON.stringify(trendingSkillCache));
    renderTrendingJobs(jobs);
  } catch (err) {
    trendingJobs.innerHTML = `<div class="text-red-600 text-sm">Error fetching jobs. ${err.message}</div>`;
  }
}*/


//import { searchJobs } from './api/jobSearch.js';
/*import searchJobs from "./ExternalServices.mjs";

async function fetchJobSkills(jobTitle, remoteOnly = false) {
  trendingJobs.innerHTML = `<div class="text-center text-gray-500">Loading trending jobs...</div>`;

  try {
    const location = remoteOnly ? 'remote' : '';
    const jobs = await searchJobs(jobTitle, location, 'us');
    trendingSkillCache[jobTitle] = jobs;
    localStorage.setItem('trendingSkills', JSON.stringify(trendingSkillCache));
    renderTrendingJobs(jobs);
  } catch (err) {
    trendingJobs.innerHTML = `<div class="text-red-600 text-sm">Error: ${err.message}</div>`;
  }
}*/



/*
async function fetchJobSkills(jobTitle, remoteOnly = false) {
  trendingJobs.innerHTML = `<div class="col-span-2 text-center text-gray-500">Loading trending jobs...</div>`;
  try {
    const url = `/api/job-search?query=${encodeURIComponent(jobTitle)}&remote=${remoteOnly}`;
    const resp = await fetch(url);
    if (!resp.ok) throw new Error('Failed to fetch jobs');
    const jobs = await resp.json();
    trendingSkillCache[jobTitle] = jobs;
    localStorage.setItem('trendingSkills', JSON.stringify(trendingSkillCache));
    renderTrendingJobs(jobs);
  } catch (err) {
    trendingJobs.innerHTML = `<div class="text-red-600 text-sm">Error fetching jobs. ${err.message}</div>`;
  }
}*/
function convertToJson(res) {
  const jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    //throw new Error("Bad Response");
    throw { name: "servicesError", message: jsonResponse };
  }
}

import fetchCourses from "../courseEngine/courseSuggest.mjs";
document.querySelector('#job-search-btn').addEventListener('click', async () => {
  const jobTitle = document.querySelector('#job-title-input').value.trim();
  const categoryDropdownValue = document.getElementById('category-dropdown').value.trim();
  const countryDropdownValue = document.getElementById('country-dropdown').value.trim();
  const dateCreated = document.getElementById('date-created').value.trim();
  const remoteOnly = document.querySelector('#remote-toggle').checked;

  try {
    let handler = `/.netlify/functions/job-search?title=${encodeURIComponent(jobTitle)}&category=${encodeURIComponent(categoryDropdownValue)}&date=${encodeURIComponent(dateCreated)}&country=${encodeURIComponent(countryDropdownValue)}`;
    const data = await fetch(handler);
    
    if (!data.ok) throw new Error('Failed to fetch jobs');
     const jobs = await data.json();
     console.log('Fetched jobs:', jobs);
     renderTrendingJobs(jobs.results);
     //let courses = fetchCourses(jobTitle);
     const courses = await fetchCourses(jobTitle);
    
     console.log("from livejob",courses);
     fetchCourse(jobTitle, courses);
     //renderCourses(courses);

    // Render jobs to DOM here
  } catch (error) {
    console.error(error.message);
  }
});

const countries = [
    {"Name":"United Kingdom","Code":"gb"},{"Name":"United States","Code":"us"},{"Name":"Austria","Code":"at"},
    {"Name":"Australia","Code":"au"},{"Name":"Belgium","Code":"be"},{"Name":"Brazil","Code":"br"},{"Name":"Canada","Code":"ca"},
    {"Name":"Switzerland","Code":"ch"},{"Name":"Germany","Code":"de"},{"Name":"Spain","Code":"es"},{"Name":"France","Code":"fr"},
    {"Name":"India","Code":"in"},{"Name":"Italy","Code":"it"},{"Name":"Mexico","Code":"mx"},{"Name":"Netherlands","Code":"nl"},{"Name":"New Zealand","Code":"nz"},
    {"Name":"Poland","Code":"pl"},{"Name":"Singapore","Code":"sg"},{"Name":"South Africa","Code":"za"}
]

//category dropdown from the api
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('/.netlify/functions/fetchCategory'); 
    const data = await response.json();
    console.log(data);
    data.results.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.tag;
      option.textContent = cat.label;
      categoryDropdown.appendChild(option);
    });

    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.Code;
      option.textContent = country.Name;
      countryDropdown.appendChild(option);
    });

  } catch (err) {
    console.error('Failed to load categories:', err);
  }
});



// Fetch course recommendations via Netlify function or Udemy API
async function fetchCourse(jobTitle, courses) {
  courseSuggestions.innerHTML = `<div class="text-center text-gray-500">Loading courses...</div>`;
  try {
    //const resp = await fetch(`/api/courses?query=${encodeURIComponent(jobTitle)}`);
    //if (!resp.ok) throw new Error('Failed to fetch courses');
    
    //const courses = await resp.json();
    //const course = courses.json();
    courseCache[jobTitle] = courses;
    localStorage.setItem('courseSuggestions', JSON.stringify(courseCache));
    renderCourses(courses);
  } catch (err) {
    courseSuggestions.innerHTML = `<div class="text-red-600 text-sm">Error loading courses. ${err.message}</div>`;
  }
}

// Send chat message to OpenAI
async function sendChatbotQuery(message) {
  chatLog.innerHTML += `<div class="mb-2 text-purple-700">🤖: typing...</div>`;
  chatLog.scrollTop = chatLog.scrollHeight;
  try {
    const resp = await fetch('/api/openai', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message, mode: 'chat' })
    });
    if (!resp.ok) throw new Error('Chat failed');
    const { result } = await resp.json();
    chatLog.innerHTML = chatLog.innerHTML.replace(/typing\.\.\./, '');
    chatLog.innerHTML += `<div class="mb-2 text-purple-700">🤖: ${result}</div>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  } catch (err) {
    chatLog.innerHTML += `<div class="mb-2 text-red-600">Error: ${err.message}</div>`;
  }
}

// Render trending job cards
function renderTrendingJobs(jobs) {
  if (!jobs.length) {
    trendingJobs.innerHTML = `<div class="text-gray-500">No jobs found.</div>`;
    return;
  }

  const targetId = countryDropdown.value;
  const foundObject = countries.find(item => item.Code === targetId);
  const adjacentName = foundObject.Name;

  trendingJobs.innerHTML = jobs.map((job, index) => `
    <div class="bg-blue-50 p-3 rounded shadow hover:bg-blue-100 transition cursor-pointer job-card" 
         data-title="${job.title}" 
         data-category="${job.category?.label || 'General'}"
         data-index="${index}">
      <h3 class="text-md font-semibold">${job.title}</h3>
      <p class="text-sm text-gray-600">${job.company?.display_name || 'Unknown Company'} — ${job.location?.display_name || 'Unknown Location'}</p>
      <p><strong>Category:</strong> ${job.category?.label || "N/A"}</p>
      <p><strong>Salary:</strong> £${job.salary_min?.toLocaleString()} - £${job.salary_max?.toLocaleString()}</p>
      <p><strong>Contract:</strong> ${job.contract_type || "permanent/temporary"} (${job.contract_time || "full_time/part_time"})</p>
      <p><strong>created:</strong> ${job.created}</p>
      <p><strong>${adjacentName}</strong> <a href="${job.redirect_url}" target="_blank" class="text-blue-500 text-sm underline">View Job</a></p>
    </div>
  `).join('');

  // Attach click events to each job card
  document.querySelectorAll(".job-card").forEach(card => {
    card.addEventListener("click", async () => {
      
      const roleTitle = card.dataset.title;
      console.log(roleTitle);
      const category = card.dataset.category;
      const skillTracker = document.getElementById("skill-tracker");

      // Clear previous skills
      skillTracker.innerHTML = `<p class="text-gray-400 text-sm italic">Loading skills for "${roleTitle}"...</p>`;

      try {
        const res = await fetch(`/.netlify/functions/extract-skill?title=${encodeURIComponent(roleTitle)}`);
        const data  = await res.json();
        
        console.log("skills", data);
        //data.results.forEach(cat => {

        skillTracker.innerHTML = data.skills.map(skill => `
          <button 
            class="bg-green-100 hover:bg-green-200 text-green-800 text-sm m-1 px-3 py-1 rounded skill-button"
            data-skill="${skill}" 
            data-category="${category}">
            ${skill}
          </button>
        `).join('');

        // Attach click to each skill button
        document.querySelectorAll(".skill-button").forEach(btn => {
          btn.addEventListener("click", () => {
            const skill = btn.dataset.skill;
            const catKey = btn.dataset.category;
            const categoryKey = `skills:${catKey}`;

            // Load existing or start fresh
            const existing = JSON.parse(localStorage.getItem(categoryKey)) || [];
            if (!existing.includes(skill)) {
              existing.push(skill);
              localStorage.setItem(categoryKey, JSON.stringify(existing));
              btn.classList.add("bg-green-300"); // visually confirm save
            }
          });
        });

      } catch (err) {
        console.error("Skill fetch error:", err);
        skillTracker.innerHTML = `<p class="text-red-500 text-sm">Failed to load skills.</p>`;
      }
    });
  });
}
/*
function renderTrendingJobs(jobs) {
  if (!jobs.length) {
    trendingJobs.innerHTML = `<div class="text-gray-500">No jobs found.</div>`;
    return;
  } 
    const targetId = countryDropdown.value;
    const foundObject = countries.find(item => item.Code === targetId);
    const adjacentName = foundObject.Name; 
    console.log(adjacentName);
  console.log(jobs);
  trendingJobs.innerHTML = jobs.map(job => `
    <div class="bg-blue-50 p-3 rounded shadow hover:bg-blue-100 transition">
      <h3 class="text-md font-semibold">${job.title}</h3>
      <p class="text-sm text-gray-600">${job.company?.display_name || 'Unknown Company'} — ${job.location?.display_name || 'Unknown Location'}</p>
      <p><strong>Category:</strong> ${job.category?.label || "N/A"}</p>
      <p><strong>Salary:</strong> £${job.salary_min?.toLocaleString()} - £${job.salary_max?.toLocaleString()}</p>
      <p><strong>Contract:</strong> ${job.contract_type || "permanent/temporary"} (${job.contract_time || "full_time/part_time"})</p>
      <p><strong>created:</strong>${job.created}</p>
      <p><strong>${adjacentName}</strong> <a href="${job.redirect_url}" target="_blank" class="text-blue-500 text-sm underline">View Job</a></p>
    </div>
  `).join('');
}*/

// Render course suggestion cards
/*async function renderCourses(courses) {
   console.log("fetched course on rendercourse",courses);
  if (!courses) {
    console.log("fetched course on rendercourse",courses);
    courseSuggestions.innerHTML = `<div class="text-gray-500">No courses found.</div>`;
    return;
  }
  let cours = courses.json();
  courseSuggestions.innerHTML = cours.map(course => `
    <div class="bg-green-50 p-3 rounded shadow hover:bg-green-100 transition">
      <h4 class="font-medium text-md">${course.title}</h4>
      <p class="text-sm text-gray-600">${course.provider}</p>
      <a href="${course.url}" target="_blank" class="text-blue-500 text-sm underline">View Course</a>
    </div>
  `).join('');
}*/


 async function renderCourses(courses) {
  console.log("fetched course on rendercourse", courses);

  if (!courses || !Array.isArray(courses) || courses.length === 0) {
    courseSuggestions.innerHTML = `<div class="text-gray-500">No courses found.</div>`;
    return;
  }

  courseSuggestions.innerHTML = courses.map(course => `
    <div class="bg-green-50 p-3 rounded shadow hover:bg-green-100 transition">
      <h4 class="font-bold">${course.title}</h4>
        <p class="text-sm text-gray-600">Price: ${course.org_price} • ⭐ ${course.rating}</p>
        <a href="${course.coupon}" target="_blank" class="text-blue-600 underline">View Course</a>
        <img src="${course.pic}" alt="course image" loading="lazy" width=300 hight=200> </div>
    </div>
  `).join('');
}

import chatBot from "../chatbot";
chatBot();


