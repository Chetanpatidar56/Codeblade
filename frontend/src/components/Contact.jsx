import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Code2, Moon, Sun, Mail, MapPin, Phone, Send } from 'lucide-react';
import axios from '../client/axiosClient';

const Contact = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'General Inquiry'
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/contact/submit', formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'General Inquiry'
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "support@codeblade.com",
      link: "mailto:support@codeblade.com"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Office",
      content: "Bangalore, Karnataka, India",
      link: null
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+91 XXX XXX XXXX",
      link: "tel:+91XXXXXXXXXX"
    }
  ];

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
              <Link to="/contact" className={`text-sm font-medium transition-colors ${darkMode ? 'text-[#000000]' : 'text-[#000000]'}`}>
                Contact
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={toggleTheme} className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-[#2d2d2d] hover:bg-[#3c3c3c] text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`} aria-label="Toggle theme">
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
            Get in Touch
          </h1>
          <p className={`text-xl leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Have questions, feedback, or need support? We're here to help you succeed.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className={`p-6 rounded-xl border text-center transition-all hover:shadow-lg ${darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-white border-gray-200'}`}>
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center mx-auto mb-4 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-[#000000]'}`}>
                  {info.icon}
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {info.title}
                </h3>
                {info.link ? (
                  <a href={info.link} className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    {info.content}
                  </a>
                ) : (
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{info.content}</p>
                )}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className={`max-w-2xl mx-auto p-8 rounded-xl border ${darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-white border-gray-200'}`}>
            <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Send us a Message
            </h2>

            {success && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg">
                <p className="text-green-500 text-sm">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors ${darkMode ? 'bg-[#1e1e1e] border-[#3c3c3c] text-white focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'}`}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors ${darkMode ? 'bg-[#1e1e1e] border-[#3c3c3c] text-white focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'}`}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors ${darkMode ? 'bg-[#1e1e1e] border-[#3c3c3c] text-white focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'}`}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors ${darkMode ? 'bg-[#1e1e1e] border-[#3c3c3c] text-white focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'}`}
                  placeholder="Brief description of your message"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className={`w-full px-4 py-3 rounded-lg border outline-none transition-colors resize-none ${darkMode ? 'bg-[#1e1e1e] border-[#3c3c3c] text-white focus:border-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'}`}
                  placeholder="Tell us more about your inquiry..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 bg-[#000000] text-white font-medium rounded-lg transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-900'}`}
              >
                {loading ? 'Sending...' : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
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

export default Contact;