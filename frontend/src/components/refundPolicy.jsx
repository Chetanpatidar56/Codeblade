import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Code2, Moon, Sun, Linkedin } from 'lucide-react';

const RefundPolicy = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [darkMode, setDarkMode] = useState(false);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
    window.scrollTo(0, 0);
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

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

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Cancellation & Refund Policy
        </h1>
        <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Last Updated: December 16, 2025
        </p>

        <div className={`space-y-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {/* Section 1 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              1. Free Service
            </h2>
            <p className="mb-4">
              CodeBlade is currently a <strong>completely free platform</strong>. All features, including code execution, problem-solving, and analytics, are provided at no cost to users.
            </p>
            <p>
              Since no payment is required to use CodeBlade, there are no refunds or cancellations applicable at this time.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              2. Account Cancellation
            </h2>
            <p className="mb-3">
              You may cancel your CodeBlade account at any time by:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contacting us through our <Link to="/contact" className="text-blue-500 hover:underline">contact page</Link></li>
              <li>Sending an email request to delete your account</li>
              <li>Using account deletion options in your profile settings (if available)</li>
            </ul>
            <p className="mt-4">
              Upon account cancellation, your personal data will be handled according to our{' '}
              <Link to="/privacypolicy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              3. Data Retention After Cancellation
            </h2>
            <p className="mb-3">
              When you cancel your account:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your personal information will be deleted within 30 days</li>
              <li>Submitted code solutions may be anonymized and retained for analytics</li>
              <li>Public contributions (if any) may remain visible but disassociated from your account</li>
              <li>You will no longer have access to your submission history and progress</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              4. Future Paid Services
            </h2>
            <p className="mb-4">
              If CodeBlade introduces premium features or paid subscriptions in the future, this policy will be updated to include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Refund eligibility period:</strong> Typically 7-30 days from purchase</li>
              <li><strong>Cancellation process:</strong> How to cancel paid subscriptions</li>
              <li><strong>Prorated refunds:</strong> Whether partial refunds are offered for unused time</li>
              <li><strong>Non-refundable fees:</strong> Any setup or processing fees that cannot be refunded</li>
              <li><strong>Refund processing time:</strong> Expected timeline for refund completion</li>
            </ul>
            <p className="mt-4">
              Users will be notified of any changes to this policy before paid features are introduced.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              5. Service Interruptions
            </h2>
            <p>
              As a free service, CodeBlade does not provide refunds or compensation for service interruptions, downtime, or technical issues. We strive to maintain platform availability but cannot guarantee 100% uptime.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              6. Code Execution Limits
            </h2>
            <p className="mb-3">
              CodeBlade provides free code execution with reasonable usage limits:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Time limits per execution (typically 5-10 seconds)</li>
              <li>Memory limits per execution</li>
              <li>Daily submission quotas (if implemented)</li>
            </ul>
            <p className="mt-4">
              These limits are subject to change based on system resources and fair usage policies. No refunds apply as the service is free.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              7. Third-Party Services
            </h2>
            <p>
              CodeBlade uses third-party services (like Judge0) for code execution. Any issues arising from third-party service failures or limitations are not subject to refunds or compensation from CodeBlade.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              8. Policy Updates
            </h2>
            <p>
              We reserve the right to modify this Cancellation & Refund Policy at any time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of CodeBlade after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              9. Questions and Support
            </h2>
            <p className="mb-3">
              If you have questions about this policy or need assistance with account cancellation, please:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Visit our <Link to="/contact" className="text-blue-500 hover:underline">Contact Page</Link></li>
              <li>Check our <Link to="/faq" className="text-blue-500 hover:underline">FAQ section</Link></li>
              <li>Review our <Link to="/terms" className="text-blue-500 hover:underline">Terms & Conditions</Link></li>
            </ul>
          </section>

          {/* Note Box */}
          <div className={`p-6 rounded-lg border ${darkMode ? 'bg-[#2a2a2a] border-[#444]' : 'bg-gray-50 border-gray-200'}`}>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong>Note:</strong> This policy is designed for a free service. If CodeBlade introduces paid features, this document will be comprehensively updated with detailed refund procedures, eligibility criteria, and processing timelines in accordance with consumer protection laws.
            </p>
          </div>
        </div>
      </main>

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
              <a 
                href="https://www.linkedin.com/in/chetan-patidar250" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center w-9 h-9 rounded-lg transition-colors ${darkMode ? 'bg-[#333] text-gray-400 hover:bg-[#0077b5] hover:text-white' : 'bg-gray-100 text-gray-600 hover:bg-[#0077b5] hover:text-white'}`}
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
                  <Link to="/faq" className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link to="/privacypolicy" className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/refundpolicy" className={`text-sm transition-colors ${
                    darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}>
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

export default RefundPolicy;
