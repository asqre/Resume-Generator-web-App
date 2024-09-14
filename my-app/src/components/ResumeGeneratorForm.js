import React, { useState } from "react";
import FileUpload from "./FileUpload";
import ApiKeyInput from "./ApiKeyInput";
import PdfToResumeProcessor from "./PdfToResume";

const ResumeGeneratorForm = () => {
  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [apiProvider, setApiProvider] = useState("openai");

  return (
    <div className="flex flex-col items-center">
      <div className="max-w-md mx-auto mt-8">
        <FileUpload onFileSelect={setFile} />

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Select API Provider:
          </label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="apiProvider"
                value="openai"
                checked={apiProvider === "openai"}
                onChange={(e) => setApiProvider(e.target.value)}
              />
              <span className="ml-2">OpenAI</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio"
                name="apiProvider"
                value="gemini"
                checked={apiProvider === "gemini"}
                onChange={(e) => setApiProvider(e.target.value)}
              />
              <span className="ml-2">Gemini</span>
            </label>
          </div>
        </div>

        <ApiKeyInput onApiKeyChange={setApiKey} provider={apiProvider} />
      </div>
      <PdfToResumeProcessor
        file={file}
        apiKey={apiKey}
        apiProvider={apiProvider}
      />
    </div>
  );
};

export default ResumeGeneratorForm;
