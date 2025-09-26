//const fetch = require('node-fetch');

/*
exports.handler = async (event) => {
  const query = event.queryStringParameters.query || '';
  const isRemote = event.queryStringParameters.remote === 'true';
  const country = 'us';

  const params = new URLSearchParams({
    app_id: process.env.VITE_ADZUNA_APP_ID,
    app_key: process.env.VITE_ADZUNA_APP_KEY,
    results_per_page: 10,
    what: query,
    content_type: 'application/json'
  });

  if (isRemote) {
    params.append('where', 'remote'); // Adzuna accepts "remote" as location
  }

  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?${params.toString()}`;
  console.log(url)

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    const jobs = data.results.map(job => ({
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      url: job.redirect_url
    }));
    return {
      statusCode: 200,
      body: JSON.stringify(jobs)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch jobs' })
    };
  }
};*/




// netlify/functions/job-search.js
/*export async function handler(event, context) {
  const { queryStringParameters } = event;
  const jobTitle = queryStringParameters.query || "frontend";
  const remoteOnly = queryStringParameters.remote === "true";

  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  const baseUrl = `https://api.adzuna.com/v1/api/jobs/us/search/1`;
  const params = new URLSearchParams({
    app_id: appId,
    app_key: appKey,
    results_per_page: "10",
    what: jobTitle,
    content_type: "application/json",
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    // Optionally filter for remote jobs if needed (since Adzuna lacks proper remote filtering)
    const filtered = remoteOnly
      ? data.results.filter((job) =>
          /remote|work from home/i.test(job.location.display_name)
        )
      : data.results;

    return {
      statusCode: 200,
      body: JSON.stringify({ results: filtered }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch jobs", details: err.message }),
    };
  }
}
*/

// netlify/functions/job-search.mjs
//import fetch from 'node-fetch';
/*
export async function handler(event) {
  try {
    const { query = 'developer', country = 'us', remote = '' } = event.queryStringParameters;

    const appId = process.env.VITE_ADZUNA_APP_ID;
    const appKey = process.env.VITE_ADZUNA_APP_KEY;

    if (!appId || !appKey) {
      console.error('Missing APP ID or APP KEY');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing API credentials' }),
      };
    }

    //const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${encodeURIComponent(query)}&content_type=application/json${remote === 'true' ? '&remote=1' : ''}`;
    //const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&content_type=application/json`;
      const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(query)}&results_per_page=10&content_type=application/json${remoteOnly ? '&remote=1' : ''}`;

    console.log('Requesting:', url);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Adzuna API error: ${response.status}`);

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.results),
    };
  } catch (err) {
    console.error('Job search function error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
*/


export async function handler(event, context) {

  const appId = process.env.VITE_ADZUNA_APP_ID;
  const appKey = process.env.VITE_ADZUNA_APP_KEY;


   // Get query params from the request URL
  const params = event.queryStringParameters;
  const title = params.title;
  const category = params.category;
  const date = params.date;
  const country = params.country;
  const remote = params.remote;


  //const url = "https://api.adzuna.com/v1/api/jobs/gb/search/20?app_id=65231098&app_key=3b76c3fd0b141cc7c4d20f934ead9253&content-type=application/json";
  //const url = "https://api.adzuna.com/v1/api/jobs/gb/search/5?app_id=65231098&app_key=3b76c3fd0b141cc7c4d20f934ead9253&results_per_page=10&what=frontend";
  //const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(query)}&results_per_page=10&content_type=application/json${remoteOnly ? '&remote=1' : ''}`;
  //const url = `https://api.adzuna.com/v1/api/jobs/gb/search/5?app_id=65231098&app_key=3b76c3fd0b141cc7c4d20f934ead9253&results_per_page=10&what=${title}&content-type=application/json`;
  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${title}&category=${category}&what_phrase=${remote}&sort_by=date&max_days_old=${date}&content-type=application/json`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow local dev
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}



/*
export async function handler(event) {
  try {
    const { query = 'developer', country = 'us', remote = '' } = event.queryStringParameters;

    const appId = process.env.VITE_ADZUNA_APP_ID;
    const appKey = process.env.VITE_ADZUNA_APP_KEY;

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${encodeURIComponent(query)}&content_type=application/json${remote ? '&remote=1' : ''}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`API error ${response.status}`);

    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.results),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

*/
/*export async function handler(event) {
  try {
    const params = new URLSearchParams(event.queryStringParameters);
    const query = params.get('query') || 'developer';
    const country = params.get('country') || 'us';

    const baseUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/1`;
    const appId = process.env.VITE_ADZUNA_APP_ID;
    const appKey = process.env.VITE_ADZUNA_APP_KEY;

    const response = await fetch(`${baseUrl}?app_id=${appId}&app_key=${appKey}&what=${query}`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}*/


/*
// netlify/functions/job-search.js
export async function handler(event, context) {
  const query = event.queryStringParameters.query || 'frontend';
  const remote = event.queryStringParameters.remote || '';

  const app_id = process.env.VITE_ADZUNA_APP_ID;
  const app_key = process.env.VITE_ADZUNA_APP_KEY;

  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=10&what=${query}&content_type=application/json`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

*/



/*
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
*/

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

