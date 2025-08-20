import { Document, Packer, Paragraph, TextRun } from "docx";
import fs from "fs";
import PDFDocument from "pdfkit";

export async function generateDocx(content, filePath) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [new Paragraph({ children: [new TextRun(content)] })],
      },
    ],
  });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(filePath, buffer);
}

export async function generatePdf(content, filePath) {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(12).text(content);
  doc.end();
}
export async function generateDocxBase64(content, filename = "output.docx") {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [new Paragraph({ children: [new TextRun(content)] })],
      },
    ],
  });
  const buffer = await Packer.toBuffer(doc);
  return { base64: buffer.toString("base64"), mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", filename };
}
