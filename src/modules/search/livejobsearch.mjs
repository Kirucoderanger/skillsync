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




//import ExternalServices from "./ExternalServices.mjs";



// DOM Elements
const jobInput = document.getElementById('job-title-input');
const searchBtn = document.getElementById('job-search-btn');
const trendingJobs = document.getElementById('trending-jobs');
const courseSuggestions = document.getElementById('course-suggestions');
const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotModal = document.getElementById('chatbot-modal');
const chatSendBtn = document.getElementById('chat-send-btn');
const chatInput = document.getElementById('chat-input');
const chatLog = document.getElementById('chat-log');

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

searchBtn.addEventListener('click', async () => {
  const title = jobInput.value.trim();
  const remote = remoteToggle.checked;
  if (!title) return;
  await fetchJobSkills(title, remote);
  await fetchCourses(title);
});





chatbotBtn.addEventListener('click', () => {
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
});

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
import searchJobs from "./ExternalServices.mjs";

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
}




/*async function fetchJobSkills(jobTitle, remoteOnly = false) {
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


// Fetch course recommendations via Netlify function or Udemy API
async function fetchCourses(jobTitle) {
  courseSuggestions.innerHTML = `<div class="text-center text-gray-500">Loading courses...</div>`;
  try {
    const resp = await fetch(`/api/courses?query=${encodeURIComponent(jobTitle)}`);
    if (!resp.ok) throw new Error('Failed to fetch courses');
    const courses = await resp.json();
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
  trendingJobs.innerHTML = jobs.map(job => `
    <div class="bg-blue-50 p-3 rounded shadow hover:bg-blue-100 transition">
      <h3 class="text-md font-semibold">${job.title}</h3>
      <p class="text-sm text-gray-600">${job.company} — ${job.location}</p>
      <a href="${job.url}" target="_blank" class="text-blue-500 text-sm underline">View Job</a>
    </div>
  `).join('');
}

// Render course suggestion cards
function renderCourses(courses) {
  if (!courses.length) {
    courseSuggestions.innerHTML = `<div class="text-gray-500">No courses found.</div>`;
    return;
  }
  courseSuggestions.innerHTML = courses.map(course => `
    <div class="bg-green-50 p-3 rounded shadow hover:bg-green-100 transition">
      <h4 class="font-medium text-md">${course.title}</h4>
      <p class="text-sm text-gray-600">${course.provider}</p>
      <a href="${course.url}" target="_blank" class="text-blue-500 text-sm underline">View Course</a>
    </div>
  `).join('');
}




