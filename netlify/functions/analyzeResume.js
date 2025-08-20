import { CohereClient } from "cohere-ai";

export const handler = async (event) => {
  try {
    const { resumeText, jobDescription } = JSON.parse(event.body);

    if (!resumeText || !jobDescription) {
      return { statusCode: 400, body: JSON.stringify({ error: "Resume or job description missing" }) };
    }

    const cohere = new CohereClient({ token: process.env.VITE_COHERE_KEY });

    const response = await cohere.chat({
      model: "command-r-plus",
      message: `
You are an expert career coach AI.
Analyze the resume against the job description.
Respond ONLY in valid JSON with fields:
{
  "strengths": [],
  "gaps": [],
  "keywordsToAdd": []
}

Resume:
${resumeText}

Job Description:
${jobDescription}`
    });

    return { statusCode: 200, body: JSON.stringify({ analysis: response.text }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};







/*import { CohereClient } from "cohere-ai";

export const handler = async (event) => {
  try {
    const { resumeText, jobDescription } = JSON.parse(event.body);

    if (!resumeText || !jobDescription) {
      return { statusCode: 400, body: JSON.stringify({ error: "Resume or job description missing" }) };
    }

    const cohere = new CohereClient({ token: process.env.VITE_COHERE_KEY });

    const response = await cohere.chat({
      model: "command-r-plus",
      message: `You are an expert career coach AI.
Analyze this resume against the job description.
List strengths, gaps, and give a rewritten resume draft.

Resume:
${resumeText}

Job Description:
${jobDescription}
      `
    });

    return { statusCode: 200, body: JSON.stringify({ analysis: response.text }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
*/







/*import { CohereClient } from "cohere-ai";

export const handler = async (event) => {
  try {
    const { resumeText, jobDescription } = JSON.parse(event.body);

    const cohere = new CohereClient({ token: process.env.VITE_COHERE_KEY });

    const response = await cohere.chat({
      model: "command-r-plus",
      message: `Here is a candidate's resume:\n${resumeText}\n\nAnd here is the job description:\n${jobDescription}\n\nPlease analyze how well this resume matches the job requirements, suggest improvements, and give a match score.`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ analysis: response.text }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};*/





/*import { parseResumeFile } from "./parseResume.js";
import { analyzeWithLLM } from "./analyze.js";
import { generateDocx, generatePdf } from "./fileGen.js";
import Busboy from "busboy";
import fs from "fs";
import path from "path";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    // Parse multipart form upload using Busboy
    const busboy = Busboy({ headers: event.headers });
    let fileBuffer = Buffer.from("");
    let jobJson = null;

    await new Promise((resolve, reject) => {
      busboy.on("file", (fieldname, file) => {
        file.on("data", (data) => {
          fileBuffer = Buffer.concat([fileBuffer, data]);
        });
      });

      busboy.on("field", (fieldname, value) => {
        if (fieldname === "job") {
          jobJson = JSON.parse(value);
        }
      });

      busboy.on("finish", () => resolve());
      busboy.on("error", reject);

      busboy.end(Buffer.from(event.body, event.isBase64Encoded ? "base64" : "utf8"));
    });

    if (!jobJson) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing job description" }),
      };
    }

    // Step 1: Parse resume text
    const resumeText = await parseResumeFile(fileBuffer);

    // Step 2: Call language model for analysis & tailored resume
    const analysis = await analyzeWithLLM(resumeText, jobJson);

    // Step 3: Generate professional files
    const outDir = "/tmp";
    const docxPath = path.join(outDir, "resume.docx");
    const pdfPath = path.join(outDir, "resume.pdf");

    await generateDocx(analysis.resume, docxPath);
    await generatePdf(analysis.resume, pdfPath);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Resume analyzed successfully",
        analysis,
        downloadLinks: {
          docx: "/.netlify/functions/download?file=resume.docx",
          pdf: "/.netlify/functions/download?file=resume.pdf",
        },
      }),
    };
  } catch (err) {
    console.error("Error analyzing resume:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error", details: err.message }),
    };
  }
};*/
