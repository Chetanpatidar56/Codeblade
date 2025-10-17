import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../utilis/authSlice';
import axiosClient from '../client/axiosClient';
import { User, Code2, Trophy, Calendar, LogOut, Moon, Sun } from 'lucide-react';

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isauthenticated } = useSelector((state) => state.auth);
  
  const [stats, setStats] = useState({
    totalSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    totalProblems: 0
  });
  const [loading, setLoading] = useState(true);
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
    if (!isauthenticated) {
      navigate('/login');
      return;
    }

    const fetchUserStats = async () => {
      try {
        setLoading(true);
        const [solvedRes, problemsRes] = await Promise.all([
          axiosClient.get('/problem/allproblemsolvedbyuser'),
          axiosClient.get('/problem/getallproblem')
        ]);

        const solvedProblems = Array.isArray(solvedRes.data) ? solvedRes.data : [];
        const allProblems = Array.isArray(problemsRes.data) ? problemsRes.data : [];

        const easySolved = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'easy').length;
        const mediumSolved = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'medium').length;
        const hardSolved = solvedProblems.filter(p => p.difficulty?.toLowerCase() === 'hard').length;

        setStats({
          totalSolved: solvedProblems.length,
          easySolved,
          mediumSolved,
          hardSolved,
          totalProblems: allProblems.length
        });
      } catch (error) {
        console.error('Error fetching user stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, [isauthenticated, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  const getProgressPercentage = () => {
    if (stats.totalProblems === 0) return 0;
    return Math.round((stats.totalSolved / stats.totalProblems) * 100);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-50'
      }`}>
        <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <div className={`border-b transition-colors duration-300 ${
        darkMode ? 'bg-[#252526] border-[#333]' : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className={`text-xl font-semibold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Profile
          </h1>
          <div className="flex items-center gap-3">
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
            <button
              onClick={handleLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                darkMode
                  ? 'bg-red-900/30 hover:bg-red-900/50 text-red-400'
                  : 'bg-red-50 hover:bg-red-100 text-red-600'
              }`}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Profile Card */}
        <div className={`rounded-lg border p-8 mb-6 transition-colors duration-300 ${
          darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
              {user?.firstname?.charAt(0).toUpperCase() || 'U'}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h2 className={`text-2xl font-bold mb-1 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {user?.firstname || 'User'} {user?.lastname || ''}
              </h2>
              <p className={`text-sm mb-3 ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {user?.emailId|| ""}
              </p>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className={`w-4 h-4 ${
                    darkMode ? 'text-gray-500' : 'text-gray-400'
                  }`} />
                  <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                    Joined {new Date(user?.createdAt || Date.now()).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Problems Solved Card */}
          <div className={`rounded-lg border p-6 transition-colors duration-300 ${
            darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${
                darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
              }`}>
                <Trophy className={`w-5 h-5 ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`} />
              </div>
              <h3 className={`font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Problems Solved
              </h3>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className={`text-4xl font-bold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {stats.totalSolved}
                </span>
                <span className={`text-sm ${
                  darkMode ? 'text-gray-500' : 'text-gray-400'
                }`}>
                  / {stats.totalProblems}
                </span>
              </div>
              <div className={`mt-2 text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {getProgressPercentage()}% completed
              </div>
            </div>

            {/* Progress Bar */}
            <div className={`h-2 rounded-full overflow-hidden ${
              darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-100'
            }`}>
              <div 
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Difficulty Breakdown Card */}
          <div className={`rounded-lg border p-6 transition-colors duration-300 ${
            darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-white border-gray-200'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${
                darkMode ? 'bg-purple-900/30' : 'bg-purple-50'
              }`}>
                <Code2 className={`w-5 h-5 ${
                  darkMode ? 'text-purple-400' : 'text-purple-600'
                }`} />
              </div>
              <h3 className={`font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                By Difficulty
              </h3>
            </div>

            <div className="space-y-4">
              {/* Easy */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Easy
                </span>
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-32 rounded-full overflow-hidden ${
                    darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-100'
                  }`}>
                    <div 
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${stats.easySolved > 0 ? (stats.easySolved / stats.totalSolved) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-semibold min-w-[3rem] text-right ${
                    darkMode ? 'text-emerald-400' : 'text-emerald-600'
                  }`}>
                    {stats.easySolved}
                  </span>
                </div>
              </div>

              {/* Medium */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Medium
                </span>
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-32 rounded-full overflow-hidden ${
                    darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-100'
                  }`}>
                    <div 
                      className="h-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${stats.mediumSolved > 0 ? (stats.mediumSolved / stats.totalSolved) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-semibold min-w-[3rem] text-right ${
                    darkMode ? 'text-amber-400' : 'text-amber-600'
                  }`}>
                    {stats.mediumSolved}
                  </span>
                </div>
              </div>

              {/* Hard */}
              <div className="flex items-center justify-between">
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Hard
                </span>
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-32 rounded-full overflow-hidden ${
                    darkMode ? 'bg-[#1e1e1e]' : 'bg-gray-100'
                  }`}>
                    <div 
                      className="h-full bg-red-500 transition-all duration-500"
                      style={{ width: `${stats.hardSolved > 0 ? (stats.hardSolved / stats.totalSolved) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className={`text-sm font-semibold min-w-[3rem] text-right ${
                    darkMode ? 'text-red-400' : 'text-red-600'
                  }`}>
                    {stats.hardSolved}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

            <button
              onClick={() => navigate('/')}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                darkMode
                  ? 'bg-gray-100 hover:bg-[#3c3c3c] text-gray-700'
                  : 'bg-gray-400 hover:bg-gray-200 text-gray-700'
              }`}
            >
              Back to Problems
            </button>
       
      </div>
    </div>
  );
};

export default UserProfile;
