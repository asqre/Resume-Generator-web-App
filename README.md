# LinkedIn PDF to Resume Converter

This project is a React-based web application that converts LinkedIn profile PDFs into well-structured HTML resumes using AI. It leverages either OpenAI's GPT-3.5 or Google's Gemini AI to process the PDF content and generate a professional-looking resume.

## Features

- Upload LinkedIn profile PDFs
- Extract text from PDF files
- Generate structured HTML resumes using AI
- Support for both OpenAI (GPT-3.5) and Google Gemini AI
- Real-time preview of the generated resume

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An API key for either OpenAI or Google Gemini AI

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/pdf-to-resume-converter.git
   ```

2. Navigate to the project directory:
   ```
   cd pdf-to-resume-converter
   ```

3. Install the dependencies:
   ```
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory of the project.
2. Add your API keys to the `.env` file:
   ```
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
   REACT_APP_GEMINI_API_KEY=your_gemini_api_key_here
   ```

## Usage

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`.

3. Upload a LinkedIn profile PDF.

4. Select the AI provider (OpenAI or Gemini).

5. Click the "Generate Resume" button.

6. View the generated HTML resume in the preview window.

## Contributing

Contributions to the PDF to Resume Converter are welcome. Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature/your-feature-name`.
5. Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [OpenAI](https://openai.com/)
- [Google Generative AI](https://ai.google.dev/)
- [react-pdftotext](https://www.npmjs.com/package/react-pdftotext)
- [react-hot-toast](https://react-hot-toast.com/)