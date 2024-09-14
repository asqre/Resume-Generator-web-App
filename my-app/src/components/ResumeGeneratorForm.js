import React, { useState } from "react";
import FileUpload from "./FileUpload";
import ApiKeyInput from "./ApiKeyInput";
import PdfToResumeProcessor from "./PdfToResume";

const ResumeGeneratorForm = () => {
  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
      <FileUpload onFileSelect={setFile} />
      <ApiKeyInput onApiKeyChange={setApiKey} />
      {/* <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Generate Resume
      </button> */}

      <PdfToResumeProcessor file={file} apiKey={apiKey} />
    </form>
  );
};

export default ResumeGeneratorForm;
