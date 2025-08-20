import fs from "fs";
import path from "path";

export const handler = async (event) => {
  const { file } = event.queryStringParameters || {};
  if (!file) {
    return { statusCode: 400, body: "Missing file parameter" };
  }

  const filePath = path.join("/tmp", file);

  if (!fs.existsSync(filePath)) {
    return { statusCode: 404, body: "File not found" };
  }

  const content = fs.readFileSync(filePath);

  return {
    statusCode: 200,
    headers: {
      "Content-Type": file.endsWith(".pdf")
        ? "application/pdf"
        : "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename=${file}`,
    },
    body: content.toString("base64"),
    isBase64Encoded: true,
  };
};
// Note: This function assumes the file is already stored in /tmp directory
