import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Code2, Linkedin } from 'lucide-react';

const TermsAndConditions = () => {
  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-gray-900'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b backdrop-blur-sm ${darkMode ? 'bg-[#1e1e1e]/90 border-[#333]' : 'bg-white/90 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#000000] rounded-lg flex items-center justify-center">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              CodeBlade
            </span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          Terms & Conditions
        </h1>
        <p className={`text-sm mb-8 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Last Updated: December 16, 2025
        </p>

        <div className={`space-y-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          {/* Section 1 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              1. Acceptance of Terms
            </h2>
            <p className="mb-4">
              By accessing and using CodeBlade ("the Platform"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms & Conditions, please do not use the Platform.
            </p>
            <p>
              CodeBlade is a free online coding platform designed to help users practice coding problems, execute code in multiple programming languages, and prepare for technical interviews.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              2. User Registration and Account
            </h2>
            <p className="mb-3">
              To access certain features of CodeBlade, you must register for an account. You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate, current, and complete information during registration</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities that occur under your account</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              3. Use of the Platform
            </h2>
            <p className="mb-3">
              CodeBlade grants you a personal, non-exclusive, non-transferable license to use the Platform. You agree NOT to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the Platform for any illegal or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to any portion of the Platform</li>
              <li>Submit malicious code that could harm the Platform or other users</li>
              <li>Scrape, copy, or redistribute content without permission</li>
              <li>Abuse the code execution system (e.g., infinite loops, excessive API calls)</li>
              <li>Share your account credentials with others</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              4. Code Execution and Content
            </h2>
            <p className="mb-3">
              CodeBlade provides real-time code execution through third-party services. You acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Code execution is subject to time and memory limits</li>
              <li>We do not guarantee uninterrupted or error-free service</li>
              <li>You retain ownership of code you submit</li>
              <li>Submitted solutions may be used for analytics and platform improvement</li>
              <li>We reserve the right to moderate or remove inappropriate content</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              5. Intellectual Property
            </h2>
            <p className="mb-4">
              All content on CodeBlade, including problems, test cases, UI design, and documentation, is the intellectual property of CodeBlade or its licensors. You may not reproduce, distribute, or create derivative works without explicit permission.
            </p>
            <p>
              You grant CodeBlade a worldwide, non-exclusive license to use, display, and distribute your submitted code solutions for platform operations and improvements.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              6. Service Availability
            </h2>
            <p>
              CodeBlade is provided free of charge. We make no guarantees regarding service availability, uptime, or feature continuity. We reserve the right to modify, suspend, or discontinue any part of the Platform at any time without prior notice.
            </p>
          </section>

          {/* Section 7 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              7. Disclaimer of Warranties
            </h2>
            <p>
              THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. USE OF THE PLATFORM IS AT YOUR OWN RISK.
            </p>
          </section>

          {/* Section 8 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              8. Limitation of Liability
            </h2>
            <p>
              CodeBlade shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Platform. Our total liability shall not exceed the amount you paid to use the service (which is zero for free users).
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              9. Account Termination
            </h2>
            <p>
              We reserve the right to suspend or terminate your account at any time for violations of these Terms, including but not limited to: abuse of the platform, submission of malicious code, harassment of other users, or fraudulent activity.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              10. Privacy
            </h2>
            <p>
              Your use of CodeBlade is also governed by our{' '}
              <Link to="/privacypolicy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
              . Please review it to understand how we collect and use your information.
            </p>
          </section>

          {/* Section 11 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Platform. Your continued use after changes constitutes acceptance of the modified Terms.
            </p>
          </section>

          {/* Section 12 */}
          <section>
            <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              12. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms & Conditions, please contact us at{' '}
              <Link to="/contact" className="text-blue-500 hover:underline">
                our contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </main>

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
                href="https://www.linkedin.com/in/yourprofile" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm transition-colors no-underline ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect on LinkedIn</span>
              </a>
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
                <li>
                  <Link to="/faq" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className={`font-semibold mb-4 text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Legal
              </h3>
              <ul className="space-y-3">
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
                  <Link to="/refund-policy" className={`text-sm transition-colors ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
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

export default TermsAndConditions;
