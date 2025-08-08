//export async function handler(event, context) {
export async function handler(event) {
    const params = event.queryStringParameters;
    const message = params.message;
    const cohereAPI_KEY = process.env.VITE_COHERE_KEY;


const response = await fetch("https://api.cohere.com/v2/chat", {
  method: "POST",
  headers: {
    "accept": "application/json",
    "Authorization": `Bearer ${cohereAPI_KEY}`,
    "Content-Type": "application/json"
    
  },
  body: JSON.stringify({
    //model: "command-r-plus",
    model: "command-a-03-2025",
    //message: message,
    messages: [{ role: "user", content: message }],
    temperature: 0.7,
  })
});


const reply = await response.json();
const result = reply.message.content[0].text;

//return result;
//return result.choices?.[0]?.message?.content || "Sorry, I couldn't respond.";
//return result.message.content[0].text;
//return result || "Sorry, I couldn't respond.";

const result1 = [
  {
    "id": 1,
    "title": "Responsive Web Design",
    "provider": "freeCodeCamp",
    "level": "Beginner",
    "link": "https://www.freecodecamp.org/learn/responsive-web-design/"
  },
  {
    "id": 2,
    "title": "Frontend Developer Career Path",
    "provider": "Scrimba",
    "level": "Intermediate",
    "link": "https://scrimba.com/learn/frontend"
  }
];


try {
   //const result = await response.json();
   
  //return {result, statusCode: 200};
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      //body: result.message.content[0].text,
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