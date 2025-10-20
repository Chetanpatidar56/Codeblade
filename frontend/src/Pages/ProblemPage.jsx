
import React, { useEffect, useMemo, useState } from "react";
import { logoutUser } from "../utilis/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import axiosClient from "../client/axiosClient";
import { Moon, Sun } from "lucide-react";


const ProblemPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isauthenticated } = useSelector((state) => state.auth);

  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [filters, setFilters] = useState({ difficulty: "all", tags: "all", status: "all" });
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState({ key: "title", dir: "asc" });
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true);
        const [pRes, sRes] = await Promise.all([
          axiosClient.get("/problem/getallproblem"),
          user ? axiosClient.get("/problem/allproblemsolvedbyuser") : Promise.resolve({ data: [] }),
        ]);
        setProblems(Array.isArray(pRes.data) ? pRes.data : []);
        setSolvedProblems(Array.isArray(sRes.data) ? sRes.data : []);
      } catch (error) {
        console.log("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [user]);

  useEffect(() => {
    if (!isauthenticated) navigate("/signup");
  }, [isauthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    setSolvedProblems([]);
  };

  const solvedSet = useMemo(() => new Set(solvedProblems.map((sp) => sp._id)), [solvedProblems]);
  const difficultyOrder = { easy: 0, medium: 1, hard: 2 };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "text-emerald-400";
      case "medium":
        return "text-amber-400";
      case "hard":
        return "text-red-400";
      default:
        return darkMode ? "text-gray-400" : "text-gray-500";
    }
  };

  const filteredProblems = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = problems.filter((problem) => {
      const difficultyMatch =
        filters.difficulty === "all" ||
        problem.difficulty?.toLowerCase() === filters.difficulty;

      const tagMatch =
        filters.tags === "all" ||
        (Array.isArray(problem.tags) &&
          problem.tags.map((t) => t.toLowerCase()).includes(filters.tags));

      const statusMatch =
        filters.status === "all" ||
        (filters.status === "solved" && solvedSet.has(problem._id));

      const searchMatch = !q || problem.title?.toLowerCase().includes(q);

      return difficultyMatch && tagMatch && statusMatch && searchMatch;
    });

    const dir = sort.dir === "desc" ? -1 : 1;
    return list.sort((a, b) => {
      if (sort.key === "difficulty") {
        const ad = difficultyOrder[a.difficulty?.toLowerCase()] ?? 9;
        const bd = difficultyOrder[b.difficulty?.toLowerCase()] ?? 9;
        return (ad - bd) * dir;
      }
      if (sort.key === "status") {
        const av = solvedSet.has(a._id) ? 1 : 0;
        const bv = solvedSet.has(b._id) ? 1 : 0;
        return (av - bv) * dir;
      }
      return (a.title || "").localeCompare(b.title || "") * dir;
    });
  }, [problems, filters, query, sort, solvedSet]);

  const SortButton = ({ k, children }) => (
    <button
      onClick={() =>
        setSort((s) => ({ key: k, dir: s.key === k && s.dir === "asc" ? "desc" : "asc" }))
      }
      className={`px-3 py-1.5 rounded text-xs border transition-colors ${
        darkMode
          ? sort.key === k
            ? "bg-[#252526] text-white border-[#3c3c3c]"
            : "text-gray-400 border-[#3c3c3c] hover:text-gray-200 hover:bg-[#252526]"
          : sort.key === k
            ? "bg-gray-100 text-gray-900 border-gray-300"
            : "text-gray-600 border-gray-300 hover:text-gray-900 hover:bg-gray-50"
      }`}
    >
      {children}
      {sort.key === k && <span className="ml-1">{sort.dir === "asc" ? "↑" : "↓"}</span>}
    </button>
  );

  const handleToggleSolved = async (problemId) => {
    const isSolved = solvedSet.has(problemId);
    try {
      if (isSolved) {
        await axiosClient.delete(`/problem/markasnotsolved/${problemId}`);
        setSolvedProblems((prev) => prev.filter((p) => p._id !== problemId));
      } else {
        await axiosClient.post(`/problem/markassolved/${problemId}`);
        const problem = problems.find((p) => p._id === problemId);
        if (problem) {
          setSolvedProblems((prev) => [...prev, problem]);
        }
      }
    } catch (error) {
      console.log("Error toggling solved status:", error);
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-[#1e1e1e]' : 'bg-white'
    }`}>
      {/* Navbar */}
      <nav className={`border-b sticky top-0 z-30 transition-colors duration-300 ${
        darkMode 
          ? 'bg-[#252526] border-[#333]' 
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-14">
            <NavLink to="/" className={`text-lg font-medium transition-colors ${
              darkMode ? 'text-white hover:text-blue-400' : 'text-gray-900 hover:text-blue-600'
            }`}>
              CodeBlade
            </NavLink>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-[#2d2d2d] hover:bg-[#3c3c3c] text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                    darkMode ? 'hover:bg-[#2d2d2d]' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {user?.firstname?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                    {user?.firstname || "User"}
                  </span>
                </div>
                <ul className={`mt-2 menu menu-sm dropdown-content rounded-lg w-40 shadow-lg ${
                  darkMode ? 'bg-[#252526] border border-[#3c3c3c]' : 'bg-white border border-gray-200'
                }`}>
                  <li>
                      <NavLink
                        to="/profile"
                        className={`px-3 py-2 text-sm transition-colors ${
                          darkMode 
                            ? 'text-gray-300 hover:bg-[#2d2d2d] hover:text-white' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        Profile
                      </NavLink>
                    </li>
                
                  {user?.role === "admin" && (
                    <li>
                      <NavLink
                        to="/admin"
                        className={`px-3 py-2 text-sm transition-colors ${
                          darkMode 
                            ? 'text-gray-300 hover:bg-[#2d2d2d] hover:text-white' 
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        Admin
                      </NavLink>
                    </li>
                    
                    
                  )}
                   <li>
                    <button
                      onClick={handleLogout}
                      className={`px-3 py-2 text-sm transition-colors ${
                        darkMode 
                          ? 'text-gray-300 hover:bg-[#2d2d2d] hover:text-white' 
                          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Toolbar */}
      <div className={`border-b sticky top-14 z-20 transition-colors duration-300 ${
        darkMode ? 'bg-[#1e1e1e] border-[#333]' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-3.5">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search problems..."
                  className={`w-full px-3 py-2 rounded-md text-sm focus:outline-none transition-colors ${
                    darkMode 
                      ? 'bg-[#252526] border border-[#3c3c3c] text-gray-200 focus:border-blue-500' 
                      : 'bg-white border border-gray-300 text-gray-900 focus:border-blue-500'
                  }`}
                />
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  {filteredProblems.length}/{problems.length}
                </span>
              </div>
            </div>

            <select
              className={`px-3 py-2 rounded-md text-sm focus:outline-none cursor-pointer transition-colors ${
                darkMode 
                  ? 'bg-[#252526] border border-[#3c3c3c] text-gray-200 focus:border-blue-500' 
                  : 'bg-white border border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value.toLowerCase() })}
            >
              <option value="all">All Status</option>
              <option value="solved">Solved</option>
            </select>

            <select
              className={`px-3 py-2 rounded-md text-sm focus:outline-none cursor-pointer transition-colors ${
                darkMode 
                  ? 'bg-[#252526] border border-[#3c3c3c] text-gray-200 focus:border-blue-500' 
                  : 'bg-white border border-gray-300 text-gray-900 focus:border-blue-500'
              }`}
              value={filters.difficulty}
              onChange={(e) => setFilters({ ...filters, difficulty: e.target.value.toLowerCase() })}
            >
              <option value="all">All Difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>


            <div className="flex items-center gap-2">
              <SortButton k="difficulty">Difficulty</SortButton>
              <SortButton k="status">Status</SortButton>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className={`rounded-lg border overflow-hidden transition-colors duration-300 ${
          darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-white border-gray-200'
        }`}>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className={`border-b transition-colors duration-300 ${
                  darkMode ? 'border-[#3c3c3c]' : 'border-gray-200'
                }`}>
                  <th className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider w-16 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Status
                  </th>
                  <th className={`px-4 py-3 text-center text-xs font-medium uppercase tracking-wider w-16 ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    No.
                  </th>
                  <th className={`px-4 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Title
                  </th>
                  <th className={`px-0 py-3 text-left text-xs font-medium uppercase tracking-wider ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Difficulty
                  </th>
                  
                </tr>
              </thead>

              <tbody className={`divide-y transition-colors duration-300 ${
                darkMode ? 'divide-[#2d2d2d]' : 'divide-gray-200'
              }`}>
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <tr key={i} className="animate-pulse">
                        <td className="px-4 py-3.5 text-center">
                          <div className={`h-5 w-5 mx-auto rounded-full ${
                            darkMode ? 'bg-[#2d2d2d]' : 'bg-gray-200'
                          }`} />
                        </td>
                        <td className="px-4 py-3.5 text-center">
                          <div className={`h-3 w-8 mx-auto rounded ${
                            darkMode ? 'bg-[#2d2d2d]' : 'bg-gray-200'
                          }`} />
                        </td>
                        <td className="px-4 py-3.5">
                          <div className={`h-3 w-48 rounded ${
                            darkMode ? 'bg-[#2d2d2d]' : 'bg-gray-200'
                          }`} />
                        </td>
                        <td className="px-4 py-3.5">
                          <div className={`h-3 w-16 rounded ${
                            darkMode ? 'bg-[#2d2d2d]' : 'bg-gray-200'
                          }`} />
                        </td>
                        <td className="px-4 py-3.5">
                          <div className={`h-3 w-32 rounded ${
                            darkMode ? 'bg-[#2d2d2d]' : 'bg-gray-200'
                          }`} />
                        </td>
                      </tr>
                    ))
                  : filteredProblems.length === 0 ? (
                      <tr>
                        <td colSpan={5} className={`px-4 py-12 text-center text-sm ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}>
                          No problems found matching your criteria
                        </td>
                      </tr>
                    )
                  : filteredProblems.map((p, index) => {
                      const isSolved = solvedSet.has(p._id);
                      return (
                        <tr
                          key={p._id}
                          className={`transition-colors ${
                            darkMode ? 'hover:bg-[#2d2d2d]' : 'hover:bg-gray-50'
                          }`}
                        >
                          <td className="px-4 py-3.5 text-center">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleToggleSolved(p._id);
                              }}
                              className="group relative mx-auto block"
                              title={isSolved ? "Mark as unsolved" : "Mark as solved"}
                            >
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                                  isSolved
                                    ? "bg-emerald-500 border-emerald-500"
                                    : darkMode
                                      ? "border-gray-600 hover:border-emerald-400 group-hover:bg-emerald-500/10"
                                      : "border-gray-400 hover:border-emerald-500 group-hover:bg-emerald-50"
                                }`}
                              >
                                {isSolved && (
                                  <svg
                                    className="w-3 h-3 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={3}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                              </div>
                            </button>
                          </td>

                          <td className="px-4 py-3.5 text-center">
                            <span className={`text-sm font-medium ${
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              {index + 1}
                            </span>
                          </td>

                          <td className="px-4 py-3.5">
                            <NavLink
                              to={`/problem/${p._id}`}
                              className={`text-sm transition-colors ${
                                darkMode 
                                  ? 'text-gray-200 hover:text-blue-400' 
                                  : 'text-gray-900 hover:text-blue-600'
                              }`}
                            >
                              {p.title}
                            </NavLink>
                          </td>

                          <td className={`py-3.5 px-4 text-sm font-medium ${getDifficultyColor(p.difficulty)}`}>
                            {p.difficulty?.charAt(0).toUpperCase() + p.difficulty?.slice(1)}
                          </td>

                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPage;
