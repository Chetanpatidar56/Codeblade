import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import axiosClient from "../client/axiosClient";
import { useParams } from "react-router-dom";
import SubmissionHistory from "../components/SubmissionHistory";
import ChatAI from "../components/ChatAI";
import { Moon, Sun } from "lucide-react";
import Solutions from "../components/Solution";

const CodeEditorPage = () => {
  let { problemId } = useParams();
  const [problem, setProblem] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [runLoading, setRunLoading] = useState(false);
  const [runResult, setRunResult] = useState(null);
  const [submitResult, setSubmitResult] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState("description");
  const [submissions, setSubmissions] = useState([]);
  const [showTestResults, setShowTestResults] = useState(false);
  const [testPanelHeight, setTestPanelHeight] = useState(250);
  const [darkMode, setDarkMode] = useState(true); // Default to dark for code editor

  const editorRef = useRef(null);

  // Load theme either dark or light
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  // Help function to map frontend language to backend language
  const getBackendLanguage = (frontendLang) => {
    switch (frontendLang) {
      case "cpp":
        return "c++";
      case "javascript":
        return "javascript";
      case "java":
        return "java";
      case "python":
        return "python";
      case "c":
        return "c";
      default:
        return "javascript";
    }
  };

  // Fetch problem details
  useEffect(() => {
    const fetchProblem = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get(
          `/problem/getproblembyid/${problemId}`
        );

        const backendLang = getBackendLanguage(selectedLanguage);
        const initialCode =
          response.data.startcode.find(
            (sc) => sc.language.toLowerCase() === backendLang.toLowerCase()
          )?.initialcode || "// Write your code here";

        setCode(initialCode);
        setProblem(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Internal server error:", error);
        setLoading(false);
      }
    };

    fetchProblem();
  }, [problemId, selectedLanguage]);

  // Update code when language changes
  useEffect(() => {
    if (problem) {
      const backendLang = getBackendLanguage(selectedLanguage);
      const initialCode =
        problem.startcode.find(
          (sc) => sc.language.toLowerCase() === backendLang.toLowerCase()
        )?.initialcode || "// Write your code here";
      setCode(initialCode);
    }
  }, [selectedLanguage, problem]);

  // Fetching user submissions from backend
  useEffect(() => {
    const fetchsubmissions = async () => {
      try {
        const response = await axiosClient.get(
          `/problem/submissions/${problemId}`
        );
        setSubmissions(response.data || []);
      } catch (error) {
        console.error("Error fetching submissions", error);
        setSubmissions([]);
      }
    };
    fetchsubmissions();
  }, [problemId]);

  // Monaco editor mount
  function handleEditorDidMount(editor) {
    editorRef.current = editor;
  }

  // handle editor change
  const handleEditorChange = (value) => {
    setCode(value || "");
  };

  // Handle Run code when user click on run code
  const handleRunCode = async () => {
    setRunLoading(true);
    setRunResult(null);
    setShowTestResults(false);
    try {
      const backendLanguage = getBackendLanguage(selectedLanguage);
      const response = await axiosClient.post(`/submission/run/${problemId}`, {
        code,
        language: backendLanguage,
      });

      setRunResult(response.data);
      setRunLoading(false);
      setShowTestResults(true);
    } catch (error) {
      console.error("Error running code:", error);
      setRunResult({
        success: false,
        error: "Internal server error",
      });
      setShowTestResults(true);
      setRunLoading(false);
    }
  };

  // Handle Submit by running hidden test cases
  const handleSubmitCode = async () => {
    setSubmitting(true);
    setSubmitResult(null);
    setActiveLeftTab("result");
    
    try {
      const backendLanguage = getBackendLanguage(selectedLanguage);
      const response = await axiosClient.post(
        `/submission/submit/${problemId}`,
        {
          code,
          language: backendLanguage,
        }
      );
      setSubmitResult(response.data);
      setSubmitting(false);
    } catch (error) {
      console.error("Error Submitting Problem:", error);
      setSubmitResult({
        accepted: false,
        error: "Submission failed. Please try again.",
      });
      setSubmitting(false);
    }
  };

  const getLanguageForMonaco = (lang) => {
    switch (lang) {
      case "cpp":
        return "cpp";
      case "javascript":
        return "javascript";
      case "java":
        return "java";
      case "python":
        return "python";
      case "c":
        return "c";
      default:
        return "javascript";
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return darkMode 
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          : "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "medium":
        return darkMode
          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
          : "bg-amber-50 text-amber-600 border-amber-200";
      case "hard":
        return darkMode
          ? "bg-red-500/10 text-red-400 border-red-500/20"
          : "bg-red-50 text-red-600 border-red-200";
      default:
        return darkMode
          ? "bg-slate-500/10 text-slate-400 border-slate-500/20"
          : "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <div className={`flex h-screen transition-colors duration-300 ${
      darkMode ? 'bg-[#1e1e1e] text-gray-200' : 'bg-white text-gray-900'
    }`}>
      {/* Left Panel */}
      <div className={`w-1/2 flex flex-col border-r transition-colors duration-300 ${
        darkMode ? 'border-[#333]' : 'border-gray-200'
      }`}>
        {/* Left Panel Tabs */}
        <div className={`flex border-b transition-colors duration-300 ${
          darkMode ? 'bg-[#252526] border-[#333]' : 'bg-gray-50 border-gray-200'
        }`}>
          {["description", "solution", "submissions", "result", "ChatAI"].map(
            (tab) => (
              <button
                key={tab}
                className={`px-5 py-3 text-xs font-medium transition-all uppercase tracking-wide border-b-2 ${
                  activeLeftTab === tab
                    ? darkMode
                      ? "text-blue-400 border-blue-500 bg-[#1e1e1e]"
                      : "text-blue-600 border-blue-600 bg-white"
                    : darkMode
                      ? "text-gray-400 border-transparent hover:text-gray-200 hover:bg-[#2d2d2d]"
                      : "text-gray-600 border-transparent hover:text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => setActiveLeftTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

       
        <div className="flex-1 overflow-y-auto">
          {loading && activeLeftTab === "description" && (
            <div className="flex items-center justify-center h-32">
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          
          {problem && activeLeftTab === "description" && (
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className={`text-xl font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {problem.title}
                  </h2>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded border ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-medium rounded border ${
                    darkMode
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : 'bg-purple-50 text-purple-600 border-purple-200'
                  }`}>
                    {problem.tags}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {problem.description}
                </p>
              </div>

              {/* Visible Test Cases */}
              <div className="space-y-3">
                <h3 className={`text-sm font-semibold uppercase tracking-wide ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Examples
                </h3>
                {problem.visibletestcases &&
                problem.visibletestcases.length > 0 ? (
                  <div className="space-y-3">
                    {problem.visibletestcases.map((test, idx) => (
                      <div
                        key={idx}
                        className={`border rounded p-4 space-y-2 transition-colors duration-300 ${
                          darkMode
                            ? 'bg-[#252526] border-[#3c3c3c]'
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="space-y-1.5 font-mono text-xs">
                          <div className="flex gap-2">
                            <span className={`font-medium min-w-[60px] ${
                              darkMode ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              Input:
                            </span>
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {test.input}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <span className={`font-medium min-w-[60px] ${
                              darkMode ? 'text-gray-500' : 'text-gray-500'
                            }`}>
                              Output:
                            </span>
                            <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                              {test.output}
                            </span>
                          </div>
                          {test.explanation && (
                            <div className="flex gap-2">
                              <span className={`font-medium min-w-[60px] ${
                                darkMode ? 'text-gray-500' : 'text-gray-500'
                              }`}>
                                Explain:
                              </span>
                              <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                                {test.explanation}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className={`text-xs italic ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`}>
                    No visible test cases available.
                  </p>
                )}
              </div>
            </div>
          )}

         
          {!loading && activeLeftTab === "solution" && (
            <div className="p-6">
              <h2 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Solution
              </h2>
             <Solutions problem={problem} darkmode={darkMode}></Solutions>
            </div>
          )}

          
          {!loading && activeLeftTab === "submissions" && (
            <div className="p-6">
              <h2 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Submissions
              </h2>
              <SubmissionHistory problemId={problemId} />
            </div>
          )}

          
          {!loading && activeLeftTab === "result" && (
            <div className="p-6">
              <h2 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Submission Result
              </h2>
              
              {submitting ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-12 h-12 border-3 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Evaluating your submission...
                  </p>
                </div>
              ) : submitResult ? (
                <div
                  className={`border rounded-lg p-6 transition-colors duration-300 ${
                    submitResult.accepted
                      ? darkMode
                        ? "bg-emerald-500/5 border-emerald-500/20"
                        : "bg-emerald-50 border-emerald-200"
                      : darkMode
                        ? "bg-red-500/5 border-red-500/20"
                        : "bg-red-50 border-red-200"
                  }`}
                >
                  {submitResult.accepted ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-emerald-500/10' : 'bg-emerald-100'
                        }`}>
                          <svg
                            className={`w-5 h-5 ${
                              darkMode ? 'text-emerald-400' : 'text-emerald-600'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${
                            darkMode ? 'text-emerald-400' : 'text-emerald-600'
                          }`}>
                            Accepted
                          </h4>
                          <p className={`text-xs ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            All test cases passed successfully
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-xs">
                        <div className={`p-3 rounded text-center border transition-colors duration-300 ${
                          darkMode
                            ? 'bg-[#252526] border-[#3c3c3c]'
                            : 'bg-white border-gray-200'
                        }`}>
                          <div className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Tests</div>
                          <div className={`font-semibold ${
                            darkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}>
                            {submitResult.passedTestCases}/
                            {submitResult.totalTestCases}
                          </div>
                        </div>
                        <div className={`p-3 rounded text-center border transition-colors duration-300 ${
                          darkMode
                            ? 'bg-[#252526] border-[#3c3c3c]'
                            : 'bg-white border-gray-200'
                        }`}>
                          <div className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Runtime</div>
                          <div className={`font-semibold ${
                            darkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}>
                            {submitResult.runtime || "N/A"}
                          </div>
                        </div>
                        <div className={`p-3 rounded text-center border transition-colors duration-300 ${
                          darkMode
                            ? 'bg-[#252526] border-[#3c3c3c]'
                            : 'bg-white border-gray-200'
                        }`}>
                          <div className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Memory</div>
                          <div className={`font-semibold ${
                            darkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}>
                            {submitResult.memory || "N/A"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          darkMode ? 'bg-red-500/10' : 'bg-red-100'
                        }`}>
                          <svg
                            className={`w-5 h-5 ${
                              darkMode ? 'text-red-400' : 'text-red-600'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </div>
                        <div>
                          <h4 className={`font-semibold ${
                            darkMode ? 'text-red-400' : 'text-red-600'
                          }`}>
                            {submitResult.error || "Failed"}
                          </h4>
                          <p className={`text-xs ${
                            darkMode ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            Some test cases failed
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className={`p-3 rounded border transition-colors duration-300 ${
                          darkMode
                            ? 'bg-[#252526] border-[#3c3c3c]'
                            : 'bg-white border-gray-200'
                        }`}>
                          <div className={`text-xs mb-1 ${
                            darkMode ? 'text-gray-500' : 'text-gray-500'
                          }`}>
                            Test Cases
                          </div>
                          <div className={`font-semibold ${
                            darkMode ? 'text-gray-200' : 'text-gray-900'
                          }`}>
                            {submitResult.passedTestCases}/
                            {submitResult.totalTestCases}
                          </div>
                        </div>
                        {submitResult.errorDetails && (
                          <div className={`border p-3 rounded transition-colors duration-300 ${
                            darkMode
                              ? 'bg-red-500/10 border-red-500/20'
                              : 'bg-red-50 border-red-200'
                          }`}>
                            <div className={`font-medium text-xs mb-1 ${
                              darkMode ? 'text-red-400' : 'text-red-600'
                            }`}>
                              Error Details
                            </div>
                            <div className={`font-mono text-xs ${
                              darkMode ? 'text-red-300' : 'text-red-700'
                            }`}>
                              {submitResult.errorDetails}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-[#252526]' : 'bg-gray-100'
                  }`}>
                    <span className="text-xl">📝</span>
                  </div>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-500' : 'text-gray-600'
                  }`}>
                    Submit your solution to see results
                  </p>
                </div>
              )}
            </div>
          )}

          
          {!loading && activeLeftTab === "ChatAI" && (
            <div className="p-6">
              <h2 className={`text-lg font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                ChatAI
              </h2>
              <ChatAI problem={problem} />
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 flex flex-col">
        
        <div className={`flex items-center justify-between border-b px-4 py-2.5 transition-colors duration-300 ${
          darkMode
            ? 'bg-[#252526] border-[#333]'
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div className="flex items-center gap-3">
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className={`px-3 py-1.5 rounded border font-mono text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all ${
                darkMode
                  ? 'bg-[#1e1e1e] text-gray-300 border-[#3c3c3c]'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <option value="javascript">JavaScript</option>
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="python">Python</option>
              <option value="c">C</option>
            </select>

            
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded transition-colors ${
                darkMode 
                  ? 'bg-[#2d2d2d] hover:bg-[#3c3c3c] text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleRunCode}
              disabled={runLoading}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {runLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Running...
                </div>
              ) : (
                "Run"
              )}
            </button>

            <button
              onClick={handleSubmitCode}
              disabled={submitting}
              className="px-4 py-1.5 bg-green-600 hover:bg-green-700 text-white text-xs font-medium rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>

        
        <div className="flex-1 flex flex-col overflow-hidden">
        
          <div
            className={`border-b transition-colors duration-300 ${
              darkMode ? 'border-[#333]' : 'border-gray-200'
            }`}
            style={{
              height: showTestResults
                ? `calc(100% - ${testPanelHeight}px)`
                : "100%",
            }}
          >
            <Editor
              height="100%"
              language={getLanguageForMonaco(selectedLanguage)}
              value={code}
              onChange={handleEditorChange}
              onMount={handleEditorDidMount}
              theme={darkMode ? "vs-dark" : "light"}
              options={{
                fontSize: 13,
                fontFamily:
                  "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                insertSpaces: true,
                wordWrap: "on",
                lineNumbers: "on",
                glyphMargin: false,
                folding: true,
                lineDecorationsWidth: 5,
                lineNumbersMinChars: 3,
                renderLineHighlight: "line",
                selectOnLineNumbers: true,
                roundedSelection: false,
                readOnly: false,
                cursorStyle: "line",
                mouseWheelZoom: false,
                padding: { top: 16, bottom: 16 },
              }}
            />
          </div>

          {/* Test Results Panel */}
          {showTestResults && runResult && (
            <div
              className={`border-t overflow-y-auto transition-colors duration-300 ${
                darkMode ? 'bg-[#1e1e1e] border-[#333]' : 'bg-white border-gray-200'
              }`}
              style={{ height: `${testPanelHeight}px` }}
            >
              <div className={`flex items-center justify-between px-4 py-2 border-b transition-colors duration-300 ${
                darkMode ? 'bg-[#252526] border-[#333]' : 'bg-gray-50 border-gray-200'
              }`}>
                <h3 className={`text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Test Results
                </h3>
                <button
                  onClick={() => setShowTestResults(false)}
                  className={`transition-colors ${
                    darkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              
              <div className="p-4">
                {runResult.success ? (
                  <div className="space-y-3">
                    <div className={`flex items-center gap-2 ${
                      darkMode ? 'text-emerald-400' : 'text-emerald-600'
                    }`}>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-xs font-medium">
                        All test cases passed
                      </span>
                    </div>
                    <div className="flex gap-3 text-xs">
                      <div className={`px-3 py-2 rounded border transition-colors duration-300 ${
                        darkMode
                          ? 'bg-[#252526] border-[#3c3c3c]'
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Runtime: </span>
                        <span className={`font-mono ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {runResult.runtime || "N/A"}
                        </span>
                      </div>
                      <div className={`px-3 py-2 rounded border transition-colors duration-300 ${
                        darkMode
                          ? 'bg-[#252526] border-[#3c3c3c]'
                          : 'bg-gray-50 border-gray-200'
                      }`}>
                        <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Memory: </span>
                        <span className={`font-mono ${
                          darkMode ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {runResult.memory || "N/A"}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {runResult.testcases &&
                        runResult.testcases.map((tc, i) => (
                          <div
                            key={i}
                            className={`border rounded p-3 transition-colors duration-300 ${
                              darkMode
                                ? 'bg-[#252526] border-[#3c3c3c]'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="font-mono text-xs space-y-1.5">
                              <div className="flex gap-2">
                                <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Input:</span>
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                  {tc.stdin}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Expected:</span>
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                  {tc.expected_output}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Output:</span>
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                  {tc.stdout}
                                </span>
                              </div>
                              <div className={`flex items-center gap-1.5 ${
                                darkMode ? 'text-emerald-400' : 'text-emerald-600'
                              }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  darkMode ? 'bg-emerald-400' : 'bg-emerald-600'
                                }`}></div>
                                <span className="font-medium">Passed</span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className={`flex items-center gap-2 ${
                      darkMode ? 'text-red-400' : 'text-red-600'
                    }`}>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-xs font-medium">
                        Test cases failed
                      </span>
                    </div>
                    {runResult.error && (
                      <div className={`border p-3 rounded transition-colors duration-300 ${
                        darkMode
                          ? 'bg-red-500/10 border-red-500/20'
                          : 'bg-red-50 border-red-200'
                      }`}>
                        <span className={`font-medium text-xs ${
                          darkMode ? 'text-red-400' : 'text-red-600'
                        }`}>
                          Error:{" "}
                        </span>
                        <span className={`text-xs ${
                          darkMode ? 'text-red-300' : 'text-red-700'
                        }`}>
                          {runResult.error}
                        </span>
                      </div>
                    )}
                    <div className="space-y-2">
                      {runResult.testcases &&
                        runResult.testcases.map((tc, i) => (
                          <div
                            key={i}
                            className={`border rounded p-3 transition-colors duration-300 ${
                              darkMode
                                ? 'bg-[#252526] border-[#3c3c3c]'
                                : 'bg-gray-50 border-gray-200'
                            }`}
                          >
                            <div className="font-mono text-xs space-y-1.5">
                              <div className="flex gap-2">
                                <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Input:</span>
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                  {tc.stdin}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Expected:</span>
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                  {tc.expected_output}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Output:</span>
                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                  {tc.stdout || "—"}
                                </span>
                              </div>
                              {tc.stderr && (
                                <div className={`flex gap-2 ${
                                  darkMode ? 'text-red-400' : 'text-red-600'
                                }`}>
                                  <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Error:</span>
                                  <span>{tc.stderr}</span>
                                </div>
                              )}
                              <div
                                className={`flex items-center gap-1.5 ${
                                  tc.status_id === 3
                                    ? darkMode
                                      ? "text-emerald-400"
                                      : "text-emerald-600"
                                    : darkMode
                                      ? "text-red-400"
                                      : "text-red-600"
                                }`}
                              >
                                <div
                                  className={`w-1.5 h-1.5 rounded-full ${
                                    tc.status_id === 3
                                      ? darkMode
                                        ? "bg-emerald-400"
                                        : "bg-emerald-600"
                                      : darkMode
                                        ? "bg-red-400"
                                        : "bg-red-600"
                                  }`}
                                ></div>
                                <span className="font-medium">
                                  {tc.status_id === 3 ? "Passed" : "Failed"}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPage;
