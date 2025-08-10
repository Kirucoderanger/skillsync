export async function handler(event, context) {

  const appId = process.env.VITE_ADZUNA_APP_ID;
  const appKey = process.env.VITE_ADZUNA_APP_KEY;


   // Get query params from the request URL
  //const params = event.queryStringParameters;
  //const title = params.title;
  //const location = params.location;
  
  //const url = "https://api.adzuna.com/v1/api/jobs/gb/search/20?app_id=65231098&app_key=3b76c3fd0b141cc7c4d20f934ead9253&content-type=application/json";
  //const url = "https://api.adzuna.com/v1/api/jobs/gb/search/5?app_id=65231098&app_key=3b76c3fd0b141cc7c4d20f934ead9253&results_per_page=10&what=frontend";
  //const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${appId}&app_key=${appKey}&what=${encodeURIComponent(query)}&results_per_page=10&content_type=application/json${remoteOnly ? '&remote=1' : ''}`;
  //const url = `https://api.adzuna.com/v1/api/jobs/gb/search/5?app_id=65231098&app_key=3b76c3fd0b141cc7c4d20f934ead9253&results_per_page=10&what=${title}&content-type=application/json`;
  //const url = `https://api.adzuna.com/v1/api/jobs/gb/search/5?app_id=${appId}&app_key=${appKey}&results_per_page=10&what=${title}&content-type=application/json`;
  const url = `https://api.adzuna.com/v1/api/jobs/us/categories?app_id=${appId}&app_key=${appKey}&content-type=application/json`;

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
