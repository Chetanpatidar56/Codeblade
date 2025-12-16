import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Code2, Moon, Sun, Calendar, Shield, Linkedin} from 'lucide-react';


const PrivacyPolicy = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sample privacy policy data (replace with API call when backend is ready)
  const policyData = {
    title: 'Privacy Policy',
    lastUpdated: '2025-12-15',
    effectiveDate: '2025-01-01',
    introduction: 'At CodeBlade, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our online coding platform. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.',
    sections: [
      {
        heading: 'Information We Collect',
        content: `We collect information that you provide directly to us when you:

• Create an account (name, email address, password)
• Submit code solutions and interact with problems
• Contact us through our support form
• Subscribe to our newsletter or communications

We also automatically collect certain information when you use CodeBlade:

• Device information (browser type, operating system, IP address)
• Usage data (pages visited, time spent, features used)
• Code execution data (submissions, test results, performance metrics)
• Cookies and similar tracking technologies

This information helps us improve our service, personalize your experience, and ensure platform security.`,
        order: 1
      },
      {
        heading: 'How We Use Your Information',
        content: `We use the information we collect for various purposes:

• To provide, maintain, and improve our services
• To process your code submissions and display results
• To track your progress and display submission history
• To send you technical notices, updates, and support messages
• To respond to your comments, questions, and customer service requests
• To analyze usage patterns and optimize platform performance
• To detect, prevent, and address technical issues and security threats
• To comply with legal obligations

We do not sell your personal information to third parties. Your code submissions remain private and are only used to provide execution results and track your progress.`,
        order: 2
      },
      {
        heading: 'Data Storage and Security',
        content: `We implement appropriate technical and organizational measures to protect your personal information:

• All data is stored on secure servers with encryption at rest
• Passwords are hashed using industry-standard bcrypt algorithm
• Code submissions are executed in isolated, sandboxed environments
• We use HTTPS/TLS encryption for all data transmission
• Regular security audits and updates to protect against vulnerabilities
• Access to personal data is restricted to authorized personnel only

However, no method of transmission over the Internet is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.`,
        order: 3
      },
      {
        heading: 'Third-Party Services',
        content: `CodeBlade integrates with third-party services to provide certain functionality:

• Judge0 API: For secure code execution and evaluation
• MongoDB Atlas: For database hosting and management
• Vercel/Render: For application hosting and deployment

These third parties have access only to the information necessary to perform their functions and are obligated not to disclose or use it for other purposes. We carefully vet all third-party services to ensure they meet our security and privacy standards.`,
        order: 4
      },
      {
        heading: 'Cookies and Tracking',
        content: `We use cookies and similar tracking technologies to:

• Maintain your login session
• Remember your preferences (theme, language settings)
• Analyze site traffic and usage patterns
• Improve user experience and platform functionality

You can configure your browser to refuse cookies, but this may limit your ability to use certain features of CodeBlade. By using our platform, you consent to our use of cookies as described in this policy.`,
        order: 5
      },
      {
        heading: 'Your Data Rights',
        content: `You have certain rights regarding your personal information:

• Access: Request a copy of the personal data we hold about you
• Correction: Request correction of inaccurate or incomplete data
• Deletion: Request deletion of your account and associated data
• Portability: Request export of your submission history and data
• Objection: Object to certain processing of your personal information

To exercise these rights, please contact us at infocodeblade@gmail.com. We will respond to your request within 30 days.`,
        order: 6
      },
      {
        heading: 'Data Retention',
        content: `We retain your personal information for as long as necessary to:

• Provide our services and maintain your account
• Comply with legal obligations
• Resolve disputes and enforce our agreements

When you delete your account, we will delete or anonymize your personal information within 90 days, except where we are required to retain it by law. Your code submissions and test results may be anonymized and retained for platform analytics.`,
        order: 7
      },
      {
        heading: 'Children\'s Privacy',
        content: `CodeBlade is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will delete such information from our systems.`,
        order: 8
      },
      {
        heading: 'International Data Transfers',
        content: `Your information may be transferred to and maintained on servers located outside of your country or jurisdiction where data protection laws may differ. By using CodeBlade, you consent to the transfer of your information to our facilities and third-party service providers. We ensure appropriate safeguards are in place for such transfers.`,
        order: 9
      },
      {
        heading: 'Changes to This Policy',
        content: `We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by:

• Posting the new Privacy Policy on this page
• Updating the "Last Updated" date at the top
• Sending an email notification for significant changes

Your continued use of CodeBlade after changes are posted constitutes acceptance of the updated policy.`,
        order: 10
      },
      {
        heading: 'Contact Us',
        content: `If you have questions or concerns about this Privacy Policy or our data practices, please contact us at:

Email: infocodeblade@gmail.com
Address: Indore, Madhya Pradesh, India

We are committed to resolving any privacy concerns you may have and will respond to your inquiries as quickly as possible.`,
        order: 11
      }
    ]
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') setDarkMode(true);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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
          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 ${darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-50 text-[#000000]'}`}>
            <Shield className="w-8 h-8" />
          </div>
          <h1 className={`text-5xl md:text-6xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Privacy Policy
          </h1>
          <div className={`flex items-center justify-center gap-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Calendar className="w-4 h-4" />
            <span>Last Updated: {formatDate(policyData.lastUpdated)}</span>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className={`mb-12 p-6 rounded-lg border ${darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-blue-50 border-blue-100'}`}>
            <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {policyData.introduction}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {policyData.sections
              .sort((a, b) => a.order - b.order)
              .map((section, index) => (
                <div key={index}>
                  <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {section.heading}
                  </h2>
                  <div className={`leading-relaxed whitespace-pre-line ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {section.content}
                  </div>
                </div>
              ))}
          </div>

          {/* Effective Date */}
          <div className={`mt-12 pt-8 border-t ${darkMode ? 'border-[#3c3c3c]' : 'border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Effective Date: {formatDate(policyData.effectiveDate)}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={`py-16 px-6 ${darkMode ? 'bg-[#252526]' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Questions About Privacy?
          </h2>
          <p className={`text-lg mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            If you have any questions about our privacy policy, please contact us
          </p>
          <Link
            to="/contact"
            className="inline-block px-6 py-3 bg-[#000000] text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
          >
            Contact Us
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
              <a 
                 href="https://www.linkedin.com/in/chetan-patidar250" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${darkMode ? 'bg-[#333] text-gray-400 hover:bg-[#0077b5] hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white'}`}
                aria-label="LinkedIn Profile">
                <Linkedin className="w-5 h-5" />
            </a>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/login" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
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
                  <Link to="/privacypolicy" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
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

export default PrivacyPolicy;