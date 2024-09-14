import React from "react";
import ResumeGeneratorForm from "../components/ResumeGeneratorForm";

const Home = () => {
  return (
    <div className="container mx-auto py-4">
      <h1 className="text-2xl font-bold text-center my-8">Resume Generator</h1>
      <ResumeGeneratorForm />
    </div>
  );
};

export default Home;
