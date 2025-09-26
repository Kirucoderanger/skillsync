//import fs from 'fs';
//import pdfParse from 'pdf-parse';
//import mammoth from 'mammoth';
//import { Configuration, OpenAIApi } from 'openai';
//import { Document, Packer, Paragraph, TextRun } from 'docx';
//import PDFDocument from 'pdfkit';

// init OpenAI client
//const openai = new OpenAIApi(new Configuration({ apiKey: process.env.OPENAI_API_KEY }));

export async function parseFileToText(file) {
  const name = file.originalFilename || file.name || file.filepath;
  const ext = name.split('.').pop().toLowerCase();
  if (ext === 'pdf') {
    const buffer = await fs.promises.readFile(file.filepath);
    const data = await pdfParse(buffer);
    return data.text || '';
  } else if (ext === 'docx') {
    const data = await mammoth.extractRawText({ path: file.filepath });
    return data.value || '';
  } else if (ext === 'txt') {
    return await fs.promises.readFile(file.filepath, 'utf8');
  } else {
    // fallback read text
    try { return await fs.promises.readFile(file.filepath, 'utf8'); } catch { return ''; }
  }
}



// utils.js
//import cohere from 'cohere-ai';
import { CohereClient } from "cohere-ai";

//const cohere = new CohereClient(process.env.VITE_COHERE_KEY);
const cohere = new CohereClient({ token: process.env.VITE_COHERE_KEY });

export async function callLLM(prompt, system = "You are a helpful assistant.") {
  try {
    const resp = await cohere.chat({
      model: "command-r-plus-08-2024",   // good for reasoning + JSON extraction
      message: prompt,
      preamble: system,
      temperature: 0.2,
    });

    // Cohere returns text directly
    return resp.text || '';
  } catch (err) {
    console.error("Cohere API error:", err);
    return '';
  }
}


// LLM helpers
export async function callLLMOpenAi(prompt, system="You are a helpful assistant.") {
  const resp = await openai.createChatCompletion({
    model: "gpt-4",
    messages: [
      { role: "system", content: system },
      { role: "user", content: prompt }
    ],
    temperature: 0.2,
    max_tokens: 1500
  });
  return resp.data.choices?.[0]?.message?.content || '';
}

// convert text => docx base64
export async function textToDocxBase64(text, filename = 'output.docx') {
  const doc = new Document({ sections: [{ children: [ new Paragraph({ children: [ new TextRun(text) ] }) ] }] });
  const buffer = await Packer.toBuffer(doc);
  return { base64: buffer.toString('base64'), mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', filename };
}

// convert text => pdf base64
export function textToPdfBase64(text, filename='output.pdf') {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const doc = new PDFDocument({ margin: 40 });
    doc.on('data', d => chunks.push(d));
    doc.on('end', () => {
      const buf = Buffer.concat(chunks);
      resolve({ base64: buf.toString('base64'), mime: 'application/pdf', filename });
    });
    doc.fontSize(12).text(text, { align: 'left' });
    doc.end();
  });
}
