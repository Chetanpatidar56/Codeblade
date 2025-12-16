// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { 
//   Code2, 
//   Zap, 
//   Shield, 
//   Trophy, 
//   BookOpen, 
//   ArrowRight,
//   Play,
//   Moon,
//   Sun,
//   Linkedin
// } from 'lucide-react';

// const HomePage = () => {
//   const navigate = useNavigate();
//   const { isAuthenticated } = useSelector((state) => state.auth);
//   const [scrolled, setScrolled] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Load theme preference from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme');
//     if (savedTheme === 'dark') {
//       setDarkMode(true);
//     }
//   }, []);

//   // Toggle theme and save preference
//   const toggleTheme = () => {
//     const newMode = !darkMode;
//     setDarkMode(newMode);
//     localStorage.setItem('theme', newMode ? 'dark' : 'light');
//   };

//   const features = [
//     {
//       icon: <Code2 className="w-6 h-6" />,
//       title: "Multi-Language Support",
//       description: "Write code in JavaScript, Python, Java, C++, and C with full syntax highlighting"
//     },
//     {
//       icon: <Zap className="w-6 h-6" />,
//       title: "Real-Time Execution",
//       description: "Instant code execution with comprehensive test case validation and detailed feedback"
//     },
//     {
//       icon: <Shield className="w-6 h-6" />,
//       title: "Secure Environment",
//       description: "Protected sandboxed execution with JWT authentication and encrypted submissions"
//     },
//     {
//       icon: <Trophy className="w-6 h-6" />,
//       title: "Progress Tracking",
//       description: "Track your solved problems, submission history, and performance analytics"
//     },
//     {
//       icon: <BookOpen className="w-6 h-6" />,
//       title: "Video Editorials",
//       description: "Learn from detailed video explanations and optimal solution approaches"
//     }
//   ];

//   const stats = [
//     { number: "20+", label: "Coding Problems" },
//     { number: "5", label: "Languages" },
//     { number: "200+", label: "Submissions" },
//     { number: "<2s", label: "Execution Time" }
//   ];

//   return (
//     <div className={`min-h-screen transition-colors duration-300 ${
//       darkMode ? 'bg-[#000000]' : 'bg-[#edeced]'
//     }`}>
      
   
//       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled 
//           ? darkMode 
//             ? 'bg-[#1e1e1e]/95 backdrop-blur-sm shadow-lg border-b border-[#333]' 
//             : 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200'
//           : darkMode 
//             ? 'bg-[#1e1e1e]' 
//             : 'bg-white'
//       }`}>
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="flex items-center justify-between h-16">
//             <Link to="/" className="flex items-center gap-2">
//               <div className="w-8 h-8 bg-[#000000] rounded-lg flex items-center justify-center">
//                 <Code2 className="w-5 h-5 text-white" />
//               </div>
//               <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
//                 CodeBlade
//               </span>
//             </Link>

//             <div className="hidden md:flex items-center gap-8">
//               <Link to="/" className={`text-sm font-medium transition-colors ${
//                 darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
//               }`}>
//                 Home
//               </Link>
//               <Link to={isAuthenticated ? "/problems" : "/login"} className={`text-sm font-medium transition-colors ${
//                 darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
//               }`}>
//                 Problems
//               </Link>
//               <Link to="/about" className={`text-sm font-medium transition-colors ${
//                 darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
//               }`}>
//                 About
//               </Link>
//                <Link to="/contact" className={`text-sm font-medium transition-colors ${
//                 darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
//               }`}>
//                 Contact
//               </Link>
             
//             </div>

//             <div className="flex items-center gap-3">
              
//               <button
//                 onClick={toggleTheme}
//                 className={`p-2 rounded-lg transition-colors ${
//                   darkMode 
//                     ? 'bg-[#2d2d2d] hover:bg-[#3c3c3c] text-gray-300' 
//                     : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
//                 }`}
//                 aria-label="Toggle theme"
//               >
//                 {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//               </button>

//               {isAuthenticated ? (
//                 <Link
//                   to="/problems"
//                   className="px-5 py-2 bg-[#000000] text-white text-sm font-medium rounded-lg transition-colors"
//                 >
//                   Dashboard
//                 </Link>
//               ) : (
//                 <>
//                   <Link
//                     to="/login"
//                     className={`px-5 py-2 text-sm font-medium transition-colors ${
//                       darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
//                     }`}
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/signup"
//                     className="px-5 py-2 bg-[#000000] hover:bg-[#000000] text-white text-sm font-medium rounded-lg transition-colors"
//                   >
//                     Sign Up
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

      
//       <section className="pt-32 pb-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="max-w-3xl mx-auto text-center space-y-6">
           

//             <h1 className={`text-5xl md:text-6xl font-bold leading-tight ${
//               darkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               Master Coding with Real-Time Execution
//             </h1>

//             <p className={`text-xl leading-relaxed ${
//               darkMode ? 'text-gray-400' : 'text-gray-600'
//             }`}>
//               Practice data structures and algorithms across 5 programming languages with instant feedback, 
//               comprehensive test cases, and detailed performance analytics.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
//               <Link
//                 to={isAuthenticated ? "/problems" : "/signup"}
//                 className={`px-6 py-3 ${darkMode ? 'bg-white text-black':'bg-[#000000] text-white'} font-medium rounded-lg transition-colors inline-flex items-center gap-2`}
//               >
//                 Start Coding Now
//                 <ArrowRight className="w-4 h-4" />
//               </Link>
//               <Link
//                 to={isAuthenticated ? "/problems": "/login"}
//                 className={`px-6 py-3 font-medium rounded-lg transition-colors inline-flex items-center gap-2 ${
//                   darkMode 
//                     ? 'bg-[#2d2d2d] hover:bg-[#3c3c3c] text-white' 
//                     : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
//                 }`}
//               >
//                 <Play className="w-4 h-4" />
//                 View Problems
//               </Link>
//             </div>

//             <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
//               {['JavaScript', 'Python', 'Java', 'C++', 'C'].map((lang) => (
//                 <span key={lang} className={`px-3 py-1.5 rounded-md text-sm font-medium ${
//                   darkMode 
//                     ? 'bg-[#2d2d2d] text-gray-300 border border-[#3c3c3c]' 
//                     : 'bg-gray-100 text-gray-700'
//                 }`}>
//                   {lang}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

    
//       <section className={`py-16 px-6 ${darkMode ? 'bg-[#252526]' : 'bg-gray-50'}`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map((stat, index) => (
//               <div key={index} className="text-center">
//                 <div className={`text-4xl font-bold mb-2 ${
//                   darkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   {stat.number}
//                 </div>
//                 <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//                   {stat.label}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

    
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 max-w-2xl mx-auto">
//             <h2 className={`text-4xl font-bold mb-4 ${
//               darkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               Why Choose CodeBlade?
//             </h2>
//             <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Everything you need to ace your coding interviews and become a better programmer
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className={`p-6 rounded-xl transition-all ${
//                   darkMode 
//                     ? 'bg-[#252526] border border-[#3c3c3c] hover:border-blue-700/50 hover:shadow-lg hover:shadow-blue-900/20' 
//                     : 'bg-white border border-gray-200 hover:shadow-lg'
//                 }`}
//               >
//                 <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
//                   darkMode 
//                     ? 'bg-blue-900/30 text-white' 
//                     : 'bg-blue-50 text-[#000000]'
//                 }`}>
//                   {feature.icon}
//                 </div>
//                 <h3 className={`text-lg font-semibold mb-2 ${
//                   darkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   {feature.title}
//                 </h3>
//                 <p className={`text-sm leading-relaxed ${
//                   darkMode ? 'text-gray-400' : 'text-gray-600'
//                 }`}>
//                   {feature.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

    

      
//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16 max-w-2xl mx-auto">
//             <h2 className={`text-4xl font-bold mb-4 ${
//               darkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               How It Works
//             </h2>
//             <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Start solving problems in just 3 simple steps
//             </p>
//           </div>

//           <div className="grid md:grid-cols-3 gap-8">
//             {[
//               {
//                 step: "1",
//                 title: "Choose a Problem",
//                 description: "Browse our collection of 50+ problems across multiple difficulty levels and topics"
//               },
//               {
//                 step: "2",
//                 title: "Write Your Code",
//                 description: "Use our Monaco-powered editor with syntax highlighting and autocomplete"
//               },
//               {
//                 step: "3",
//                 title: "Submit & Learn",
//                 description: "Get instant feedback with detailed test results, runtime, and memory usage"
//               }
//             ].map((item, index) => (
//               <div key={index} className="relative">
//                 <div className="flex items-start gap-4">
//                   <div className="flex-shrink-0 w-12 h-12 bg-[#000000] text-white rounded-lg flex items-center justify-center font-bold text-lg">
//                     {item.step}
//                   </div>
//                   <div>
//                     <h3 className={`text-xl font-semibold mb-2 ${
//                       darkMode ? 'text-white' : 'text-gray-900'
//                     }`}>
//                       {item.title}
//                     </h3>
//                     <p className={`text-sm leading-relaxed ${
//                       darkMode ? 'text-gray-400' : 'text-gray-600'
//                     }`}>
//                       {item.description}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className={`py-20 px-6 ${darkMode ? 'bg-[#252526]' : 'bg-gray-50'}`}>
//         <div className="max-w-4xl mx-auto text-center">
//           <div className={`rounded-2xl p-12 ${
//             darkMode 
//               ? 'bg-[#1e1e1e] border border-[#3c3c3c]' 
//               : 'bg-white border border-gray-200'
//           }`}>
//             <h2 className={`text-4xl font-bold mb-4 ${
//               darkMode ? 'text-white' : 'text-gray-900'
//             }`}>
//               Ready to Level Up Your Coding Skills?
//             </h2>
//             <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               Join thousands of developers practicing on CodeBlade and ace your next interview
//             </p>
//             <Link
//               to={isAuthenticated ? "/problems" : "/signup"}
//               className="inline-flex items-center gap-2 px-6 py-3 bg-[#000000] hover:[bg-bg-gray-800 text-white font-medium rounded-lg transition-colors"
//             >
//               Get Started for Free
//               <ArrowRight className="w-4 h-4" />
//             </Link>
//           </div>
//         </div>
//       </section>

//       <footer className={`py-12 px-6 border-t ${
//         darkMode ? 'border-[#333] bg-[#1e1e1e]' : 'border-gray-200 bg-white'
//       }`}>
//         <div className="max-w-7xl mx-auto">
//           <div className="grid md:grid-cols-4 gap-8 mb-8">
//             <div className="col-span-2">
//               <Link to="/" className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 bg-[#000000] rounded-lg flex items-center justify-center">
//                   <Code2 className="w-5 h-5 text-white" />
//                 </div>
//                 <span className={`text-xl font-semibold ${
//                   darkMode ? 'text-white' : 'text-gray-900'
//                 }`}>
//                   CodeBlade
//                 </span>
//               </Link>
//               <p className={`text-sm mb-4 max-w-md ${
//                 darkMode ? 'text-gray-400' : 'text-gray-600'
//               }`}>
//                 Master coding interviews with real-time code execution, comprehensive test cases, and detailed analytics.
//               </p>
//                  <a 
//                 href="https://www.linkedin.com/in/chetan-patidar250" 
//                 target="_blank" 
//                 rel="noopener noreferrer"
//                 className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${darkMode ? 'bg-[#333] text-gray-400 hover:bg-[#0077b5] hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white'}`}
//                 aria-label="LinkedIn Profile"
// >
//                 <Linkedin className="w-5 h-5" />
//                 </a>
              
//             </div>

//             <div>
//               <h3 className={`font-semibold mb-4 text-sm ${
//                 darkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 Quick Links
//               </h3>
//               <ul className="space-y-3">
//                 <li>
//                   <Link to="/login" className={`text-sm transition-colors ${
//                     darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
//                   }`}>
//                     Problems
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/about" className={`text-sm transition-colors ${
//                     darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
//                   }`}>
//                     About
//                   </Link>
//                 </li>
//                  <li>
//                   <Link to="/contact" className={`text-sm transition-colors ${
//                     darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
//                   }`}>
//                     Contact
//                   </Link>
//                 </li>
                
//               </ul>
//             </div>

//             <div>
//               <h3 className={`font-semibold mb-4 text-sm ${
//                 darkMode ? 'text-white' : 'text-gray-900'
//               }`}>
//                 Support
//               </h3>
//               <ul className="space-y-3">
//                 <li>
//                   <Link to='/faq' className={`text-sm transition-colors ${
//                     darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
//                   }`}>
//                     FAQ
//                   </Link>
//                 </li>
               
//                 <li>
//                   <Link to='/privacypolicy' className={`text-sm transition-colors ${
//                     darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
//                   }`}>
//                     Privacy Policy
//                   </Link>
//                 </li>
//                    <li>
//             <Link to="/terms" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
//               Terms & Conditions
//             </Link>
//           </li>
//           <li>
//             <Link to="/refundpolicy" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
//               Cancellation & Refunds
//             </Link>
//           </li>
//               </ul>
//             </div>
//           </div>

//           <div className={`pt-8 border-t text-center ${
//             darkMode ? 'border-[#333]' : 'border-gray-200'
//           }`}>
//             <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
//               &copy; 2025 CodeBlade. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default HomePage;
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  Code2, 
  Zap, 
  Shield, 
  Trophy, 
  BookOpen, 
  ArrowRight,
  Play,
  Moon,
  Sun,
  Linkedin,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Toggle theme and save preference
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const features = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: "Multi-Language Support",
      description: "Write code in JavaScript, Python, Java, C++, and C with full syntax highlighting"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-Time Execution",
      description: "Instant code execution with comprehensive test case validation and detailed feedback"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Environment",
      description: "Protected sandboxed execution with JWT authentication and encrypted submissions"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Progress Tracking",
      description: "Track your solved problems, submission history, and performance analytics"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Video Editorials",
      description: "Learn from detailed video explanations and optimal solution approaches"
    }
  ];

  const stats = [
    { number: "20+", label: "Coding Problems" },
    { number: "5", label: "Languages" },
    { number: "200+", label: "Submissions" },
    { number: "<2s", label: "Execution Time" }
  ];

  const benefits = [
    "Interview-focused problems",
    "Real-time code execution",
    "Detailed explanations",
    "Progress analytics",
    "Free forever"
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-[#000000]' : 'bg-[#edeced]'
    }`}>
      
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? darkMode 
            ? 'bg-[#1e1e1e]/95 backdrop-blur-sm shadow-lg border-b border-[#333]' 
            : 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200'
          : darkMode 
            ? 'bg-[#1e1e1e]' 
            : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-[#000000] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                CodeBlade
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={`text-sm font-medium transition-colors ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Home
              </Link>
              <Link to={isAuthenticated ? "/problems" : "/login"} className={`text-sm font-medium transition-colors ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                Problems
              </Link>
              <Link to="/about" className={`text-sm font-medium transition-colors ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
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
                className={`p-2 rounded-lg transition-all hover:scale-110 ${
                  darkMode 
                    ? 'bg-[#2d2d2d] hover:bg-[#3c3c3c] text-gray-300' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {isAuthenticated ? (
                <Link
                  to="/problems"
                  className="px-5 py-2 bg-[#000000] hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-all hover:scale-105"
                >
                  Dashboard
                </Link>
              ) : (
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
                    className="px-5 py-2 bg-[#000000] hover:bg-gray-800 text-white text-sm font-medium rounded-lg transition-all hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 ${darkMode ? 'opacity-20' : 'opacity-10'}`}>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* New badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 mb-4">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Free coding platform for interview prep
              </span>
            </div>

            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold leading-tight ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Master Coding with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Real-Time Execution
              </span>
            </h1>

            <p className={`text-xl md:text-2xl leading-relaxed ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Practice data structures and algorithms across 5 programming languages with instant feedback, 
              comprehensive test cases, and detailed performance analytics.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
              <Link
                to={isAuthenticated ? "/problems" : "/signup"}
                className={`px-8 py-4 ${darkMode ? 'bg-white text-black hover:bg-gray-100':'bg-[#000000] hover:bg-gray-800 text-white'} font-semibold rounded-lg transition-all inline-flex items-center gap-2 hover:scale-105 shadow-lg`}
              >
                Start Coding Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to={isAuthenticated ? "/problems": "/login"}
                className={`px-8 py-4 font-semibold rounded-lg transition-all inline-flex items-center gap-2 hover:scale-105 ${
                  darkMode 
                    ? 'bg-[#2d2d2d] hover:bg-[#3c3c3c] text-white' 
                    : 'bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200'
                }`}
              >
                <Play className="w-5 h-5" />
                View Problems
              </Link>
            </div>

            {/* Enhanced language badges with hover effect */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-8">
              {['JavaScript', 'Python', 'Java', 'C++', 'C'].map((lang, index) => (
                <span 
                  key={lang} 
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-110 cursor-pointer ${
                    darkMode 
                      ? 'bg-[#2d2d2d] text-gray-300 border border-[#3c3c3c] hover:border-blue-500/50' 
                      : 'bg-white text-gray-700 shadow-sm hover:shadow-md'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {lang}
                </span>
              ))}
            </div>

            {/* New: Benefits list */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced with animations */}
      <section className={`py-16 px-6 ${darkMode ? 'bg-[#252526]' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className={`text-center p-6 rounded-xl transition-all hover:scale-105 ${
                  darkMode ? 'bg-[#1e1e1e] hover:bg-[#2d2d2d]' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <div className={`text-5xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
                  {stat.number}
                </div>
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced with active state */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Why Choose CodeBlade?
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Everything you need to ace your coding interviews and become a better programmer
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                className={`p-8 rounded-xl transition-all cursor-pointer ${
                  activeFeature === index
                    ? darkMode 
                      ? 'bg-[#252526] border-2 border-blue-500 shadow-xl shadow-blue-900/30 scale-105' 
                      : 'bg-white border-2 border-blue-500 shadow-xl scale-105'
                    : darkMode 
                      ? 'bg-[#252526] border border-[#3c3c3c] hover:border-blue-700/50' 
                      : 'bg-white border border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all ${
                  activeFeature === index
                    ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white scale-110'
                    : darkMode 
                      ? 'bg-blue-900/30 text-white' 
                      : 'bg-blue-50 text-[#000000]'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className={`py-20 px-6 ${darkMode ? 'bg-[#252526]' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              How It Works
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Start solving problems in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>

            {[
              {
                step: "1",
                title: "Choose a Problem",
                description: "Browse our collection of 20+ problems across multiple difficulty levels and topics"
              },
              {
                step: "2",
                title: "Write Your Code",
                description: "Use our Monaco-powered editor with syntax highlighting and autocomplete"
              },
              {
                step: "3",
                title: "Submit & Learn",
                description: "Get instant feedback with detailed test results, runtime, and memory usage"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="flex flex-col items-center text-center">
                  <div className={`relative z-10 w-14 h-14 font-bold text-xl rounded-xl flex items-center justify-center mb-4 transition-all group-hover:scale-110 ${
                    darkMode 
                      ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'bg-gradient-to-br from-blue-500 to-purple-500 text-white shadow-lg'
                  }`}>
                    {item.step}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`rounded-2xl p-12 relative overflow-hidden ${
            darkMode 
              ? 'bg-gradient-to-br from-[#1e1e1e] to-[#2d2d2d] border border-[#3c3c3c]' 
              : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-xl'
          }`}>
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Ready to Level Up Your Coding Skills?
              </h2>
              <p className={`text-lg md:text-xl mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Join thousands of developers practicing on CodeBlade and ace your next interview
              </p>
              <Link
                to={isAuthenticated ? "/problems" : "/signup"}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all hover:scale-105 shadow-lg"
              >
                Get Started for Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
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
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-8 h-8 bg-[#000000] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
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
              <a 
                href="https://www.linkedin.com/in/chetan-patidar250" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-all hover:scale-110 ${darkMode ? 'bg-[#333] text-gray-400 hover:bg-[#0077b5] hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white'}`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 text-sm ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/login" className={`text-sm transition-colors ${
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
                  <Link to='/faq' className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to='/privacypolicy' className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/refundpolicy" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    Cancellation & Refunds
                  </Link>
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

export default HomePage;
