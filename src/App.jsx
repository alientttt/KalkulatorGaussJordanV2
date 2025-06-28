import React, { useState } from "react";
import "./App.css";
import Header from "./components/fragments/Header/Header";
import MethodSelection from "./components/layouts/MethodSelection";
import MainContent from "./components/layouts/MainContent";
import Footer from "./components/fragments/Footer/Footer";

const NumericalCalculator = () => {
  const [activeMethod, setActiveMethod] = useState("gauss-jordan");
  const [result, setResult] = useState(null);
  return (
    <div className="min-h-screen bg-[url(./assets/sun.jpg)] bg-cover p-4 rounded">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <Header/>
        {/* Method Selection */}
        <MethodSelection activeMethod={activeMethod} setActiveMethod={setActiveMethod} setResult={setResult}/>
        {/* Main Content */}
        <MainContent activeMethod={activeMethod} result={result} setResult={setResult}/>
        {/* Footer */}
        <Footer/>
      </div>
    </div>
  );
};

export default NumericalCalculator;
