import React, { useState } from 'react';

const ApiKeyInput = ({ onApiKeyChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="api-key">
        OpenAI API Key
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="api-key"
        type="password"
        placeholder="Enter your OpenAI API key"
        onChange={(e) => onApiKeyChange(e.target.value)}
      />
    </div>
  );
};

export default ApiKeyInput;