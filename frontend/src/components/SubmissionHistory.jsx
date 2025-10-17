import { memo, useEffect, useState } from "react";
import axiosClient from "../client/axiosClient";

const SubmissionHistory = ({ problemId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const response = await axiosClient.get(`/problem/submissions/${problemId}`);
        // Ensure submissions is always an array
        setSubmissions(Array.isArray(response.data) ? response.data : []);
        setError(null);
      } catch (error) {
        console.error("Error fetching submissions:", error);
        setError("Failed to fetch submission history");
        setSubmissions([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };
    
    if (problemId) {
      fetchSubmissions();
    }
  }, [problemId]);

  const getStatusColor = (status) => {
    const normalizedStatus = status?.toLowerCase();
    switch (normalizedStatus) {
      case "accepted":
        return darkMode
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          : "bg-emerald-50 text-emerald-600 border-emerald-200";
      case "wrong":
      case "wrong answer":
        return darkMode
          ? "bg-red-500/10 text-red-400 border-red-500/20"
          : "bg-red-50 text-red-600 border-red-200";
      case "error":
      case "runtime error":
        return darkMode
          ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
          : "bg-amber-50 text-amber-600 border-amber-200";
      case "pending":
        return darkMode
          ? "bg-blue-500/10 text-blue-400 border-blue-500/20"
          : "bg-blue-50 text-blue-600 border-blue-200";
      default:
        return darkMode
          ? "bg-gray-500/10 text-gray-400 border-gray-500/20"
          : "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const formatMemory = (memory) => {
    if (!memory) return "N/A";
    if (memory < 1024) return `${memory} KB`;
    return `${(memory / 1024).toFixed(2)} MB`;
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`rounded-lg p-4 border ${
        darkMode
          ? 'bg-red-500/10 border-red-500/20 text-red-400'
          : 'bg-red-50 border-red-200 text-red-600'
      }`}>
        <span className="text-sm">{error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!Array.isArray(submissions) || submissions.length === 0 ? (
        <div className={`text-center py-8 ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <p className="text-sm">No submissions found for this problem</p>
        </div>
      ) : (
        <>
          <div className={`rounded-lg border overflow-hidden ${
            darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-white border-gray-200'
          }`}>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className={`border-b ${
                    darkMode ? 'border-[#3c3c3c] bg-[#1e1e1e]' : 'border-gray-200 bg-gray-50'
                  }`}>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>#</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Language</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Status</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Runtime</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Memory</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Test Cases</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Submitted</th>
                    <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>Code</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${
                  darkMode ? 'divide-[#2d2d2d]' : 'divide-gray-200'
                }`}>
                  {submissions.map((sub, index) => (
                    <tr key={sub._id || index} className={`transition-colors ${
                      darkMode ? 'hover:bg-[#2d2d2d]' : 'hover:bg-gray-50'
                    }`}>
                      <td className={`px-4 py-3 text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{index + 1}</td>
                      <td className={`px-4 py-3 text-sm font-mono ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{sub.language}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(sub.status)}`}>
                          {sub.status?.charAt(0).toUpperCase() + sub.status?.slice(1)}
                        </span>
                      </td>
                      <td className={`px-4 py-3 text-sm font-mono ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{sub.runtime || 'N/A'}</td>
                      <td className={`px-4 py-3 text-sm font-mono ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>{formatMemory(sub.memory)}</td>
                      <td className={`px-4 py-3 text-sm font-mono ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {sub.testCasePassed || 0}/{sub.testCasesTotal || 0}
                      </td>
                      <td className={`px-4 py-3 text-sm ${
                        darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>{formatDate(sub.createdAt)}</td>
                      <td className="px-4 py-3">
                        <button
                          className={`px-3 py-1 text-xs font-medium rounded border transition-colors ${
                            darkMode
                              ? 'bg-blue-900/30 text-blue-400 border-blue-700/30 hover:bg-blue-900/50'
                              : 'bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100'
                          }`}
                          onClick={() => setSelectedSubmission(sub)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={`text-sm ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Showing {submissions.length} submission{submissions.length !== 1 ? 's' : ''}
          </p>
        </>
      )}

      {/* Modal */}
      {selectedSubmission && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setSelectedSubmission(null)}
        >
          <div
            className={`w-11/12 max-w-4xl max-h-[90vh] overflow-auto rounded-lg border shadow-xl ${
              darkMode
                ? 'bg-[#1e1e1e] border-[#3c3c3c]'
                : 'bg-white border-gray-200'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`sticky top-0 px-6 py-4 border-b ${
              darkMode
                ? 'bg-[#252526] border-[#3c3c3c]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <h3 className={`text-lg font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Submission Details: {selectedSubmission.language}
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded border ${getStatusColor(selectedSubmission.status)}`}>
                  {selectedSubmission.status}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded border ${
                  darkMode
                    ? 'bg-[#2d2d2d] text-gray-400 border-[#3c3c3c]'
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  Runtime: {selectedSubmission.runtime || 'N/A'}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded border ${
                  darkMode
                    ? 'bg-[#2d2d2d] text-gray-400 border-[#3c3c3c]'
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  Memory: {formatMemory(selectedSubmission.memory)}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded border ${
                  darkMode
                    ? 'bg-[#2d2d2d] text-gray-400 border-[#3c3c3c]'
                    : 'bg-gray-100 text-gray-600 border-gray-200'
                }`}>
                  Passed: {selectedSubmission.testCasePassed || 0}/
                  {selectedSubmission.testCasesTotal || 0}
                </span>
              </div>

              {selectedSubmission.errorMessage && (
                <div className={`rounded-lg p-3 border ${
                  darkMode
                    ? 'bg-red-500/10 border-red-500/20 text-red-400'
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  <span className="text-sm">{selectedSubmission.errorMessage}</span>
                </div>
              )}

              <div className={`rounded-lg overflow-hidden border ${
                darkMode ? 'border-[#3c3c3c]' : 'border-gray-200'
              }`}>
                <pre className={`p-4 overflow-auto text-sm font-mono ${
                  darkMode ? 'bg-[#0d1117] text-gray-300' : 'bg-gray-900 text-gray-100'
                }`}>
                  <code>{selectedSubmission.code}</code>
                </pre>
              </div>
            </div>

            <div className={`sticky bottom-0 px-6 py-4 border-t flex justify-end ${
              darkMode
                ? 'bg-[#252526] border-[#3c3c3c]'
                : 'bg-gray-50 border-gray-200'
            }`}>
              <button
                className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                  darkMode
                    ? 'bg-[#2d2d2d] hover:bg-[#3c3c3c] text-gray-200'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
                onClick={() => setSelectedSubmission(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(SubmissionHistory);
