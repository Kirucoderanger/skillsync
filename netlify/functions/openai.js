const fetch = require('node-fetch');

exports.handler = async function (event) {
  const { prompt, messages, mode = 'chat' } = JSON.parse(event.body || '{}');
  const apiKey = process.env.VITE_OPENAI_API_KEY;

  const body = mode === 'chat' ? {
    model: "gpt-4",
    messages,
    temperature: 0.7,
  } : {
    model: "gpt-4",
    prompt,
    max_tokens: 500,
    temperature: 0.7,
  };

  const response = await fetch('https://api.openai.com/v1/' + (mode === 'chat' ? 'chat/completions' : 'completions'), {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return {
    statusCode: 200,
    body: JSON.stringify(data)
  };
};



// Netlify Function: openai.js
// Uses OpenAI API to score resume text or offer career advice
/*
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

exports.handler = async (event) => {
  const { prompt, mode = "score" } = JSON.parse(event.body);

  const systemPrompt = mode === "score"
    ? "You are a career advisor. Score the user’s resume from 0-100 based on completeness, clarity, and relevance to modern tech roles. Also suggest improvements."
    : "You are a helpful career mentor. Answer the user's career development questions in a friendly and expert tone.";

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt }
      ]
    });

    const result = completion.data.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};*/