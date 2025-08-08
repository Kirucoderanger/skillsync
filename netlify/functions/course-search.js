// netlify/functions/course-search.js
export async function handler(event) {
  const params = event.queryStringParameters;
  const title = params.title;
  const rapidAPI_KEY = process.env.VITE_X_RAPIDAPI_KEY;

  const url1 = `https://paid-udemy-course-for-free.p.rapidapi.com/search?s=${title}`;
  const options1 = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': rapidAPI_KEY,
      'x-rapidapi-host': 'paid-udemy-course-for-free.p.rapidapi.com'
    }
  };

  const url2 = `https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/search?page=1&page_size=10&query=${title}`;
  const options2 = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': rapidAPI_KEY,
      'x-rapidapi-host': 'udemy-paid-courses-for-free-api.p.rapidapi.com'
    }
  };

  try {
    const [res1, res2] = await Promise.allSettled([
      fetch(url1, options1).then(res => res.json()),
      fetch(url2, options2).then(res => res.json())
    ]);

    let mergedCourses = [];

    if (res1.status === 'fulfilled' && Array.isArray(res1.value.courses)) {
      const courses1 = res1.value.courses.slice(0, 6).map(course => ({
        title: course.title || course.name || 'Untitled',
        url: course.url || course.coupon,
        price: course.org_price || course.actual_price_usd || 'Free',
        rating: course.rating || 'N/A',
        image: course.pic || course.image,
        source: 'API 1'
      }));
      mergedCourses.push(...courses1);
    }

    if (res2.status === 'fulfilled' && Array.isArray(res2.value.courses)) {
      const courses2 = res2.value.courses.slice(0, 6).map(course => ({
        title: course.name || course.name || 'Untitled',
        url: course.url || course.coupon,
        price: course.actual_price_usd || course.org_price || 'Free',
        description: course.description || 'N/A', // using description as fallback
        image: course.pic  || course.image,
        source: 'API 2'
      }));
      mergedCourses.push(...courses2);
    }

    return {
      statusCode: 200,
      body: JSON.stringify(mergedCourses),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      }
    };
  }
}

/*export async function handler(event) {
    const params = event.queryStringParameters;
    const title = params.title;
    const rapidAPI_KEY = process.env.VITE_X_RAPIDAPI_KEY;
    const appId = process.env.VITE_ADZUNA_APP_ID;


        const url = `https://paid-udemy-course-for-free.p.rapidapi.com/search?s=${title}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': rapidAPI_KEY,
                'x-rapidapi-host': 'paid-udemy-course-for-free.p.rapidapi.com'
            }
        };

        const url2 = `https://udemy-paid-courses-for-free-api.p.rapidapi.com/rapidapi/courses/search?page=1&page_size=10&query=${title}`;
        const options2 = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': rapidAPI_KEY,
                'x-rapidapi-host': 'udemy-paid-courses-for-free-api.p.rapidapi.com'
            }
        };

    try {
        const response = await fetch(url, options);
        const response2 = await fetch(url2, options2);
        //const result = await response.text();
        //console.log(result);

        const json = await response.json();
        const json2 = await response2.json();

         const courses = (json.courses || []).slice(0, 6).map(course => ({
            title: course.title,
            url: course.url,
            price: course.org_price || 'Free',
            rating: course.rating || 'N/A',
            image: course.pic,
        }));
        const courses2 = (json2.courses || []).slice(0, 6).map(course => ({
            name: course.name,
            url: course.url,
            price: course.actual_price_usd || 'Free',
            description: course.description || 'N/A',
            image: course.pic,
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(courses2),
            headers: {
                "Access-Control-Allow-Origin": "*", // Allow local dev
                "Content-Type": "application/json",
            },
        };



    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
        
    }

}*/

/*export async function handler(event) {
  const query = event.queryStringParameters.query || 'frontend';
  //const params = event.queryStringParameters;
  //const query = params.query;

  //const url = `https://udemy-search-free.p.rapidapi.com/search?query=${query}&page=1`;
 

  const url = `https://udemy-search-free.p.rapidapi.com/search?query=${encodeURIComponent(query)}&page=1`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // store this in Netlify environment variables
        'X-RapidAPI-Host': 'udemy-search-free.p.rapidapi.com'
      }
    });

    //if (!response.ok) {
      //throw new Error(`API responded with ${response.status}`);
    //}

    const json = await response.json();
    const courses = (json.courses || []).slice(0, 6).map(course => ({
      title: course.title,
      url: course.url,
      price: course.price || 'Free',
      rating: course.rating || 'N/A',
      image: course.image,
    }));*/

    /*return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courses),
    };*/
    /*
    const url = 'https://udemy-api2.p.rapidapi.com/v1/udemy/category/%7Bcategory%7D';
const options = {
	method: 'POST',
	headers: {
		'x-rapidapi-key': false positive,
		'x-rapidapi-host': 'udemy-api2.p.rapidapi.com',
		'Content-Type': 'application/json'
	},
	body: {
		page: 1,
		page_size: 1,
		ratings: '',
		instructional_level: [],
		lang: [],
		price: [],
		duration: [],
		subtitles_lang: [],
		sort: 'popularity',
		features: [],
		locale: 'en_US',
		extract_pricing: true
	}
};

/*try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
    return result
} catch (error) {
	console.error(error);
}*/

/*
 try {
    const response = await fetch(url, options);
	//const result = await response.text();
    //const res = await fetch(url);
    const data = await response.json();

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
//}



/*const json = await response.json();
    const courses = (json.courses || []).slice(0, 6).map(course => ({
      title: course.title,
      url: course.url,
      price: course.price || 'Free',
      rating: course.rating || 'N/A',
      image: course.image,
    }));



    return {
      statusCode: 200,
      body: JSON.stringify(json),
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow local dev
        "Content-Type": "application/json",
      },
    };


  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}

*/




 /*const url = `https://udemy-api2.p.rapidapi.com/v1/udemy/search?text=${title}`;
        const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'false positive',
            'x-rapidapi-host': 'udemy-api2.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: {
            page: 1,
            page_size: 1,
            ratings: '',
            instructional_level: [],
            lang: [],
            price: [],
            duration: [],
            subtitles_lang: [],
            sort: 'popularity',
            features: [],
            locale: 'en_US',
            extract_pricing: true
        }
    };*/


















// netlify/functions/course-search.js
//import fetch from 'node-fetch';


/*url --request GET \
	--url https://udemy-course-scrapper-api.p.rapidapi.com/course-names/course-instructor/course-url \
	--header 'x-rapidapi-host: udemy-course-scrapper-api.p.rapidapi.com' \
	--header 'x-rapidapi-key: false [ositive'
*/
/*
export async function handler(event) {
  //const title = event.queryStringParameters.query || 'frontend';
  const params = event.queryStringParameters;
  const title = params.query;

   

  //const response = await fetch(`https://coursera-course-data.p.rapidapi.com/search?query=${title}`, {
  //const response = await fetch(`https://udemy-course-scrapper-api.p.rapidapi.com/${title}`, {
  // const response = await fetch(`https://udemy-course-scrapper-api.p.rapidapi.com/course-names/course-instructor/course-ur`, {
  const response = await fetch(`https://udemy-search-free.p.rapidapi.com/search?Practical Data Entry Course&page=1`, {

    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      //'x-rapidapi-key': 'false',
      //'x-rapidapi-host': 'udemy-course-scrapper-api.p.rapidapi.com'
      'X-RapidAPI-Host': 'udemy-search-free.p.rapidapi.com'
      
      //'X-RapidAPI-Host': 'coursera-course-data.p.rapidapi.com'
      
    }
  });
  const data = await response.json();

  const courses = (data.courses || []).slice(0, 6).map(c => ({
    provider: 'Coursera',
    title: c.courseName,
    url: c.link,
    description: c.description,
    rating: c.rating || 'N/A',
  }));

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(courses),
  };
}
*/










/*
    const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
	if (this.readyState === this.DONE) {
		console.log(this.responseText);
	}
});

xhr.open('GET', 'https://golf-course-finder.p.rapidapi.com/api/golf-clubs/?miles=10&latitude=36.56910381018662&longitude=-121.95035631683683');
xhr.setRequestHeader('x-rapidapi-key', 'false
xhr.setRequestHeader('x-rapidapi-host', 'golf-course-finder.p.rapidapi.com');

xhr.send(data);*/
