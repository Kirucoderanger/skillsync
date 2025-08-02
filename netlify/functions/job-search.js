const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { query } = event.queryStringParameters;
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${encodeURIComponent(query)}&content-type=application/json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Adzuna fetch failed', details: err.message })
    };
  }
};


// Netlify Function: job-search.js
// Fetches trending jobs and required skills from Adzuna API
/*
const fetch = require('node-fetch');

exports.handler = async (event) => {
  const { title = 'Frontend Developer' } = event.queryStringParameters;
  const app_id = process.env.ADZUNA_APP_ID;
  const app_key = process.env.ADZUNA_APP_KEY;
  const country = 'us';

  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=10&what=${encodeURIComponent(title)}&content-type=application/json`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results.map(job => ({
      title: job.title,
      location: job.location.display_name,
      salary: job.salary_is_predicted === "1" ? `$${job.salary_min} - $${job.salary_max}` : "N/A",
      description: job.description,
      company: job.company.display_name
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ jobs: results })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};*/

