export async function handler(event) {
    const params = event.queryStringParameters;
    const title = params.title;
    const message = `List the top 10 in-demand skills for a ${title}. 
        Respond with only a JSON oject of the skill names with the key skills, no explanation or extra text.`;
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

//const result = reply.message.content[0].text;
//const result = `{ skills: [${data}] }`;
const rawText = reply.message.content[0].text;


const jsonMatch = rawText.match(/```json([\s\S]*?)```/);
    const cleaned = jsonMatch ? jsonMatch[1].trim() : rawText.trim();

    const result = JSON.parse(cleaned);



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