import React, { useState } from "react";
import axios from "axios";
import pdfToText from "react-pdftotext";
import toast from "react-hot-toast";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PdfToResumeProcessor = ({ file, apiKey, apiProvider }) => {
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

  const generateResumeOpenAI = async (pdfText) => {
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
      if (error.response?.data?.error?.code === "invalid_api_key") {
        throw new Error("Invalid OpenAI API Key");
      } else if (error.response?.data?.error?.code === "insufficient_quota") {
        throw new Error("Insufficient OpenAI API Quota");
      } else {
        throw new Error("An error occurred with OpenAI API");
      }
    }
  };

  const generateResumeGemini = async (pdfText) => {
    const prompt = `Convert the following LinkedIn profile information into a well-structured HTML resume:

${pdfText}

The HTML should be clean, professional, and ready to be displayed. Include appropriate semantic HTML5 tags and add classes for styling. The structure should include sections for personal information, summary, experience, education, and skills.`;

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const htmlContent = text.match(/```html\n([\s\S]*?)\n```/)[1];

      return htmlContent;
    } catch (error) {
      throw new Error("Invalid Gemini API Key");
    }
  };

  const handleProcessPdf = async () => {
    setIsLoading(true);
    setError("");
    try {
      const pdfText = await extractTextFromPdf(file);
      let htmlResume;
      if (apiProvider === "openai") {
        htmlResume = await generateResumeOpenAI(pdfText);
      } else if (apiProvider === "gemini") {
        htmlResume = await generateResumeGemini(pdfText);
      } else {
        throw new Error("Invalid API provider selected");
      }
      setResumeHtml(htmlResume);
    } catch (error) {
      const errorMessage = error.message || "An error occurred";
      toast.error(errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 w-full">
      <div className="flex justify-center">
        <button
          onClick={handleProcessPdf}
          disabled={isLoading || !file || !apiKey}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
        >
          {isLoading ? "Processing..." : "Generate Resume"}
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {resumeHtml && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Generated Resume:</h2>
          <iframe
            srcDoc={resumeHtml}
            title="Generated Resume"
            width="100%"
            height="600px"
            className="border rounded"
          />
        </div>
      )}
    </div>
  );
};

export default PdfToResumeProcessor;