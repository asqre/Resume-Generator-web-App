import React, { useState } from 'react';

const FileUpload = ({ onFileSelect }) => {
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileSelect(file);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file-upload">
        Upload LinkedIn PDF
      </label>
      <div className="relative border-2 border-gray-300 border-dashed rounded-md p-6">
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          accept="application/pdf"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <p className="mt-1 text-sm text-gray-600">
            {fileName ? fileName : "Click to upload or drag and drop"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;