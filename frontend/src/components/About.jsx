import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Zap, Bot, Trophy, Code2, Moon, Sun, ArrowRight } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
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

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-Time Code Execution",
      description: "Execute your code instantly across 5 programming languages. Our integration with Judge0 API provides a secure, sandboxed environment that gives you immediate feedback on your solutions, just like in real technical interviews."
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI-Powered Assistant",
      description: "Stuck on a problem? Our integrated AI assistant provides hints, explains concepts, reviews your code, and answers questions—like having a mentor available 24/7."
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor your growth with detailed statistics showing problems solved by difficulty, submission history, and performance metrics. Watch your skills improve over time."
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Professional Development Environment",
      description: "Code in a VS Code-powered editor with syntax highlighting, auto-completion, and multiple themes. Practice in an environment that feels like home."
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-[#1e1e1e]' : 'bg-white'
    }`}>
      {/* Navbar */}
      <nav className={`border-b sticky top-0 z-50 transition-colors duration-300 ${
        darkMode 
          ? 'bg-[#252526] border-[#333]' 
          : 'bg-white border-gray-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#000000] rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-semibold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                CodeBlade
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={`text-sm font-medium transition-colors ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                Home
              </Link>
              <Link to={isAuthenticated ? "/problems" : "/login"} className={`text-sm font-medium transition-colors ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                Problems
              </Link>
              <Link to="/about" className={`text-sm font-medium transition-colors ${
                darkMode ? 'text-[#000000]' : 'text-[#000000]'
              }`}>
                About
              </Link>
              <Link to="/contact" className={`text-sm font-medium transition-colors ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                Contact
              </Link>
            </div>

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

              {!isAuthenticated && (
                <>
                  <Link
                    to="/login"
                    className={`px-5 py-2 text-sm font-medium transition-colors ${
                      darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 bg-[#000000] hover:bg-[#000000] text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Sign Up
                  </Link>
                </>
              )}
              
              {isAuthenticated && (
                <Link
                  to="/problems"
                  className="px-5 py-2 bg-[#000000] hover:bg-[#000000] text-white text-sm font-medium rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            About CodeBlade
          </h1>
          <p className={`text-xl leading-relaxed ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            CodeBlade is a modern coding platform designed to help developers master algorithms, 
            ace technical interviews, and build strong programming fundamentals across multiple languages.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className={`py-16 px-6 ${
        darkMode ? 'bg-[#252526]' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-3xl font-bold mb-6 text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Our Mission
          </h2>
          <p className={`text-lg leading-relaxed mb-4 ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            At CodeBlade, we believe that everyone deserves access to high-quality coding education 
            and practice resources. Our mission is to democratize technical interview preparation and 
            algorithmic thinking by providing a platform that combines real-time code execution, 
            comprehensive learning materials, and AI-powered assistance.
          </p>
          <p className={`text-lg leading-relaxed ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            We're committed to helping developers at all skill levels—from beginners taking their first 
            steps into programming to experienced engineers preparing for senior roles at top tech companies. 
            Every feature we build is designed with one goal in mind: making you a better programmer.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose CodeBlade?
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Everything you need to succeed in technical interviews and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-8 rounded-xl border transition-all hover:shadow-lg ${
                  darkMode
                    ? 'bg-[#252526] border-[#3c3c3c] hover:border-blue-700/50'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-4 ${
                  darkMode ? 'bg-blue-900/30 text-[#000000]' : 'bg-blue-50 text-[#000000]'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-6 ${
        darkMode ? 'bg-[#252526]' : 'bg-gray-50'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className={`p-12 rounded-2xl border ${
            darkMode ? 'bg-[#1e1e1e] border-[#3c3c3c]' : 'bg-white border-gray-200'
          }`}>
            <h2 className={`text-4xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Ready to Start Your Journey?
            </h2>
            <p className={`text-lg mb-8 ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Join thousands of developers improving their coding skills on CodeBlade
            </p>
            <Link
              to={isAuthenticated ? "/problems" : "/signup"}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#000000] text-white font-medium rounded-lg transition-colors"
            >
              {isAuthenticated ? 'Browse Problems' : 'Get Started for Free'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${
        darkMode ? 'border-[#333] bg-[#1e1e1e]' : 'border-gray-200 bg-white'
      }`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#000000] rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xl font-semibold ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  CodeBlade
                </span>
              </Link>
              <p className={`text-sm mb-4 max-w-md ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Master coding interviews with real-time code execution, comprehensive test cases, and detailed analytics.
              </p>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 text-sm ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/problems" className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    Problems
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 text-sm ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className={`pt-8 border-t text-center ${
            darkMode ? 'border-[#333]' : 'border-gray-200'
          }`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              &copy; 2025 CodeBlade. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
