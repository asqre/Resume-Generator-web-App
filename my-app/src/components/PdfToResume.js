import React, { useState } from "react";
import axios from "axios";
import pdfToText from "react-pdftotext";

const PdfToResumeProcessor = ({ file, apiKey }) => {
  const [resumeHtml, setResumeHtml] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const extractTextFromPdf = async (file) => {
    return new Promise((resolve, reject) => {
      pdfToText(file)
        .then((text) => {
          resolve(text);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  const generateResume = async (pdfText) => {
    const prompt = `Convert the following LinkedIn profile information into a well-structured HTML resume:

${pdfText}

The HTML should be clean, professional, and ready to be displayed. Include appropriate semantic HTML5 tags and add classes for styling. The structure should include sections for personal information, summary, experience, education, and skills.`;

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 2000,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      throw error;
    }
  };

  const handleProcessPdf = async () => {
    setIsLoading(true);
    setError("");
    try {
      const pdfText = await extractTextFromPdf(file);
      const htmlResume = await generateResume(pdfText);
      setResumeHtml(htmlResume);
    } catch (error) {
      setError("Error processing PDF or generating resume. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={handleProcessPdf}
        disabled={isLoading || !file || !apiKey}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Generate Resume"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {resumeHtml && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Generated Resume:</h2>
          <div
            dangerouslySetInnerHTML={{ __html: resumeHtml }}
            className="border p-4 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default PdfToResumeProcessor;
