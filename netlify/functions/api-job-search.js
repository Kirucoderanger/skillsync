
//const baseURL = import.meta.env.VITE_SERVER_URL_GET || import.meta.env.VITE_SERVER_URL;

const fetch = require("node-fetch");
/*
exports.handler = async function(event, context) {
  const { query } = event.queryStringParameters;

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing job title query" })
    };
  }

  const app_id = process.env.ADZUNA_APP_ID;
  const app_key = process.env.ADZUNA_APP_KEY;

  const url = `https://api.adzuna.com/v1/api/jobs/us/search/1?app_id=${app_id}&app_key=${app_key}&results_per_page=5&what=${encodeURIComponent(query)}&content-type=application/json`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const jobs = data.results.map(job => ({
      title: job.title,
      company: job.company.display_name,
      location: job.location.display_name,
      description: job.description,
      url: job.redirect_url
    }));
    
    return {
      statusCode: 200,
      body: JSON.stringify(jobs)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch from Adzuna", details: err.message })
    };
  }
};
*/




exports.handler = async (event) => {
  const query = event.queryStringParameters.query || '';
  const isRemote = event.queryStringParameters.remote === 'true';
  const country = 'us';

  const params = new URLSearchParams({
    app_id: process.env.ADZUNA_APP_ID,
    app_key: process.env.ADZUNA_APP_KEY,
    results_per_page: 10,
    what: query,
    content_type: 'application/json'
  });

  if (isRemote) {
    params.append('where', 'remote'); // Adzuna accepts "remote" as location
  }

  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?${params.toString()}`;

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
};





function convertToJson(res) {
  const jsonResponse = res.json();
  if (res.ok) {
    return jsonResponse;
  } else {
    //throw new Error("Bad Response");
    throw { name: "servicesError", message: jsonResponse };
  }
}

export default class ExternalServices {
  constructor() {
    // this.category = category;
    // this.path = `../public/json/${this.category}.json`;
  }
  async getData(category) {
    const response = await fetch(`${baseURL}products/search/${category}`);
    const data = await convertToJson(response);
    
    return data.Result;
  }
  async findProductById(id) {
    const response = await fetch(`${baseURL}product/${id}`);
    const data = await convertToJson(response);
    console.log(data.Result);
    return data.Result;
  }



async checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(`${baseURL}checkout/`, options);

  if (!response.ok) {
    // Try to parse error message from response body
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || "Checkout request failed.";
    throw new Error(message); // This ensures your catch(err) gets a real Error object
  }

  return await convertToJson(response); // Only runs if response is OK
}


    
}