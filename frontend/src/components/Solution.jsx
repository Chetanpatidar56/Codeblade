
import React, { useState } from 'react';

const Solutions = ({ problem, darkmode }) => {
  const [selectedLanguage, setSelectedLanguage] = useState(
    problem?.refrencesolution?.[0]?.language || 'javascript'
  );
  const [copied, setCopied] = useState(false);

  const languageNames = {
    javascript: 'JavaScript',
    python: 'Python',
    java: 'Java',
    'c++': 'C++',
    c: 'C'
  };

  const currentSolution = problem?.refrencesolution?.find(
    (sol) => sol.language === selectedLanguage
  );

  const handleCopy = () => {
    if (currentSolution?.completecode) {
      navigator.clipboard.writeText(currentSolution.completecode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!problem?.refrencesolution || problem.refrencesolution.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[#0d1117] text-gray-400">
        <p className="text-lg">No solutions available for this problem.</p>
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex flex-col ${darkmode ? 'bg-[#0d1117]' : 'bg-gray-200'} text-gray-300 overflow-hidden`}>
      {/* Language Tabs */}
      <div className={`flex gap-2 p-4 ${darkmode ? 'bg-[#0d1117]' : 'bg-white'}border-b border-[#30363d] flex-wrap`}>
        {problem.refrencesolution.map((solution) => (
          <button
            key={solution.language}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              selectedLanguage === solution.language
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-[#21262d] text-gray-400 border border-[#30363d] hover:bg-[#30363d] hover:text-gray-300'
            }`}
            onClick={() => setSelectedLanguage(solution.language)}
          >
            {languageNames[solution.language] || solution.language}
          </button>
        ))}
      </div>

      {/* Solution Content */}
      <div className="flex-1 p-5 overflow-y-auto">
        {currentSolution ? (
          <>
            {/* Header */}
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-[#30363d]">
              <h3 className={`text-lg font-semibold ${darkmode ? 'text-white':'text-[#000000]'}`}>
                {languageNames[selectedLanguage] || selectedLanguage} Solution
              </h3>
              <button
                className="px-4 py-2 bg-[#21262d] text-gray-300 border border-[#30363d] rounded-md text-sm hover:bg-[#30363d] hover:border-blue-500 transition-all"
                onClick={handleCopy}
              >
                {copied ? '✓ Copied!' : 'Copy Code'}
              </button>
            </div>

            {/* Code Block */}
            {/* <div className={`${darkmode ? 'bg-[#0d1117]' : 'bg-white'} border border-[#30363d] rounded-lg overflow-auto max-h-[calc(100vh-300px)]`}>
              <pre className="m-0 p-5 overflow-x-auto">
                <code className={`font-mono text-sm ${darkmode ? 'text-white':'text-[#000000]'} leading-relaxed whitespace-pre`}>
                  {currentSolution.completecode}
                </code>
              </pre>
            </div> */}
            <div className={`overflow-x-auto rounded-lg ${darkmode ? 'bg-[#161b22]' : 'bg-gray-100'}`}>
  <pre className="m-0 p-5 overflow-x-auto">
    <code className={`font-mono text-sm ${darkmode ? 'text-white' : 'text-black'} leading-relaxed whitespace-pre`}>
      {currentSolution.completecode}
    </code>
  </pre>
</div>


            {/* Note */}
            <div className={`mt-5 p-4 ${darkmode ? 'bg-[#161b22]' : 'bg-gray-100'}border border-[#30363d] rounded-md`}>
              <p className="m-0 text-sm leading-relaxed text-gray-400">
                💡Try to solve the problem on your own first before viewing the solution. Understanding the approach is more important than memorizing the code.
              </p>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-52 text-gray-400 text-base">
            <p>Solution not available for this language.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Solutions;
