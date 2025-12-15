import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Code2, Moon, Sun, Search, ChevronDown, ThumbsUp, ThumbsDown } from 'lucide-react';


const FAQ = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(false);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openFAQ, setOpenFAQ] = useState(null);

  const categories = ['All', 'General', 'Account', 'Code Execution', 'Technical', 'Billing', 'Other'];

  // Sample FAQ data (will be replaced by API call)
  const sampleFAQs = [
    {
      _id: '1',
      category: 'General',
      question: 'What is CodeBlade?',
      answer: 'CodeBlade is an online coding platform designed to help developers practice data structures and algorithms. It provides real-time code execution across 5 programming languages (JavaScript, Python, Java, C++, C), comprehensive test cases, and detailed performance analytics to help you prepare for technical interviews.',
      helpful: 45,
      notHelpful: 2
    },
    {
      _id: '2',
      category: 'General',
      question: 'Which programming languages does CodeBlade support?',
      answer: 'CodeBlade currently supports five popular programming languages: JavaScript, Python, Java, C++, and C. Each language comes with full syntax highlighting, auto-completion, and real-time execution capabilities powered by the Judge0 API.',
      helpful: 38,
      notHelpful: 1
    },
    {
      _id: '3',
      category: 'Account',
      question: 'How do I create an account?',
      answer: 'Creating an account is simple! Click the "Sign Up" button in the top navigation, fill in your name, email, and password, and you\'re ready to start coding. You can also log in with existing credentials if you already have an account.',
      helpful: 52,
      notHelpful: 0
    },
    {
      _id: '4',
      category: 'Account',
      question: 'Is CodeBlade free to use?',
      answer: 'Yes! CodeBlade is completely free to use. You get access to all problems, code execution features, submission history, and performance analytics without any cost. We believe in democratizing access to quality coding education.',
      helpful: 67,
      notHelpful: 1
    },
    {
      _id: '5',
      category: 'Code Execution',
      question: 'How does code execution work?',
      answer: 'When you submit your code, it is securely sent to our backend server, which then forwards it to the Judge0 API for execution in a sandboxed environment. Your code is run against multiple test cases, and you receive immediate feedback including runtime, memory usage, and whether each test case passed or failed.',
      helpful: 41,
      notHelpful: 3
    },
    {
      _id: '6',
      category: 'Code Execution',
      question: 'What is the maximum execution time for code?',
      answer: 'Code execution is limited to 10 seconds to ensure fair usage and prevent infinite loops. Most well-optimized solutions complete in under 2 seconds. If your code exceeds this limit, you\'ll receive a "Time Limit Exceeded" error.',
      helpful: 29,
      notHelpful: 2
    },
    {
      _id: '7',
      category: 'Code Execution',
      question: 'Can I see my submission history?',
      answer: 'Absolutely! Every submission you make is saved to your account. You can view your complete submission history, including the code you submitted, test results, runtime, memory usage, and timestamp. This helps you track your progress and learn from previous attempts.',
      helpful: 55,
      notHelpful: 0
    },
    {
      _id: '8',
      category: 'Technical',
      question: 'What should I do if my code works locally but fails on CodeBlade?',
      answer: 'This usually happens due to differences in input/output format or environment. Make sure you\'re reading input correctly and printing output in the exact format specified. Check for issues like extra whitespace, missing newlines, or incorrect data types. You can also review the expected input/output format in the problem description.',
      helpful: 34,
      notHelpful: 4
    },
    {
      _id: '9',
      category: 'Technical',
      question: 'Why am I getting a runtime error?',
      answer: 'Runtime errors occur when your code crashes during execution. Common causes include array index out of bounds, null pointer exceptions, division by zero, or stack overflow from deep recursion. Review the error message carefully and add proper input validation and error handling to your code.',
      helpful: 28,
      notHelpful: 2
    },
    {
      _id: '10',
      category: 'Technical',
      question: 'How do I optimize my code for better performance?',
      answer: 'Focus on choosing the right algorithm and data structure for the problem. Analyze time and space complexity. Avoid nested loops where possible, use efficient data structures like HashMaps for lookups, and consider dynamic programming for overlapping subproblems. Our performance analytics show runtime and memory usage to help you identify bottlenecks.',
      helpful: 61,
      notHelpful: 1
    },
    {
      _id: '11',
      category: 'Other',
      question: 'Can I contribute problems to CodeBlade?',
      answer: 'We\'re currently not accepting community contributions, but we\'re actively adding new problems regularly. If you have suggestions for problems you\'d like to see, please reach out through our contact form, and we\'ll consider them for future additions.',
      helpful: 19,
      notHelpful: 3
    },
    {
      _id: '12',
      category: 'Other',
      question: 'How can I report a bug or request a feature?',
      answer: 'We appreciate your feedback! To report bugs or request features, visit our Contact page and select "Bug Report" or "Feature Request" from the category dropdown. Provide as much detail as possible, and our team will review it promptly.',
      helpful: 42,
      notHelpful: 0
    }
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
    fetchFAQs();
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const fetchFAQs = async () => {
    try {
      // Uncomment this when backend is ready
      // const params = {};
      // if (selectedCategory !== 'All') params.category = selectedCategory;
      // if (searchTerm) params.search = searchTerm;
      // const response = await axios.get('/faq', { params });
      // setFaqs(response.data.data);

      // For now, using sample data
      setFaqs(sampleFAQs);
    } catch (error) {
      console.error('Failed to fetch FAQs:', error);
      setFaqs(sampleFAQs); // Fallback to sample data
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchFAQs();
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, selectedCategory]);

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const markHelpful = async (id, helpful) => {
    try {
      // Uncomment when backend is ready
      // await axios.post(`/faq/${id}/helpful`, { helpful });
      console.log(`Marked FAQ ${id} as ${helpful ? 'helpful' : 'not helpful'}`);
    } catch (error) {
      console.error('Failed to mark FAQ:', error);
    }
  };

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
      {/* Navbar */}
      <nav className={`border-b sticky top-0 z-50 transition-colors duration-300 ${darkMode ? 'bg-[#252526] border-[#333]' : 'bg-white border-gray-200 shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#000000] rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                CodeBlade
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Home
              </Link>
              <Link to={isAuthenticated ? "/problems" : "/login"} className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Problems
              </Link>
              <Link to="/about" className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                About
              </Link>
              <Link to="/contact" className={`text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-[#2d2d2d] hover:bg-[#3c3c3c] text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {!isAuthenticated ? (
                <>
                  <Link to="/login" className={`px-5 py-2 text-sm font-medium transition-colors ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                    Login
                  </Link>
                  <Link to="/signup" className="px-5 py-2 bg-[#000000] hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors">
                    Sign Up
                  </Link>
                </>
              ) : (
                <Link to="/problems" className="px-5 py-2 bg-[#000000] hover:bg-gray-900 text-white text-sm font-medium rounded-lg transition-colors">
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
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h1>
          <p className={`text-xl leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Find answers to common questions about CodeBlade
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="relative mb-6">
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-12 pr-4 py-4 rounded-lg border outline-none transition-colors ${darkMode ? 'bg-[#252526] border-[#3c3c3c] text-white placeholder-gray-500 focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500'}`}
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[#000000] text-white'
                    : darkMode
                    ? 'bg-[#252526] text-gray-300 hover:bg-[#3c3c3c]'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs List */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Loading FAQs...</p>
            </div>
          ) : filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>No FAQs found matching your criteria</p>
            </div>
          ) : (
            filteredFAQs.map((faq) => (
              <div
                key={faq._id}
                className={`border rounded-lg overflow-hidden transition-all ${darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-white border-gray-200'}`}
              >
                <button
                  onClick={() => toggleFAQ(faq._id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:opacity-80 transition-opacity"
                >
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${openFAQ === faq._id ? 'rotate-180' : ''} ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                  />
                </button>

                {openFAQ === faq._id && (
                  <div className={`px-6 pb-6 border-t ${darkMode ? 'border-[#3c3c3c]' : 'border-gray-200'}`}>
                    <p className={`mt-4 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {faq.answer}
                    </p>

                    <div className="mt-4 flex items-center gap-4">
                      <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                        Was this helpful?
                      </span>
                      <button
                        onClick={() => markHelpful(faq._id, true)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${darkMode ? 'bg-[#1e1e1e] text-gray-400 hover:bg-[#3c3c3c]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        Yes ({faq.helpful})
                      </button>
                      <button
                        onClick={() => markHelpful(faq._id, false)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-colors ${darkMode ? 'bg-[#1e1e1e] text-gray-400 hover:bg-[#3c3c3c]' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                        No ({faq.notHelpful})
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Still Need Help Section */}
      <section className={`py-16 px-6 ${darkMode ? 'bg-[#252526]' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Still have questions?
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Can\'t find what you\'re looking for? Contact our support team
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-[#000000] text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
          >
            Contact Support
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 px-6 border-t ${darkMode ? 'border-[#333] bg-[#1e1e1e]' : 'border-gray-200 bg-white'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#000000] rounded-lg flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  CodeBlade
                </span>
              </Link>
              <p className={`text-sm mb-4 max-w-md ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Master coding interviews with real-time code execution, comprehensive test cases, and detailed analytics.
              </p>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/problems" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    Problems
                  </Link>
                </li>
                <li>
                  <Link to="/about" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Support
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/faq" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/documentation" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className={`pt-8 border-t text-center ${darkMode ? 'border-[#333]' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              &copy; 2025 CodeBlade. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQ;