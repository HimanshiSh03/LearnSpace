import { Link } from "react-router-dom";
import { Github, Mail, HomeIcon } from "lucide-react";
import Logo from "../components/LearnSpace logo.png";

const Owner = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 md:gap-0">
          <h1 className="text-3xl font-bold text-gray-800">About LearnSpace</h1>
          <Link
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left Section */}
            <div className="md:flex-shrink-0 md:w-1/3 bg-indigo-600 flex items-center justify-center p-8">
              <div className="text-center">
                <img
                  src={Logo}
                  alt="LearnSpace Logo"
                  className="w-32 h-32 mx-auto rounded-full border-4 border-white shadow-lg object-contain"
                />
                <h2 className="text-2xl font-bold text-white mt-4">LearnSpace</h2>
                <p className="text-indigo-200 mt-2 text-sm md:text-base">
                  Learning & Productivity Hub
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="p-6 md:p-8 md:w-2/3 flex flex-col gap-6">
              {/* Project Info */}
              <div className="flex items-start md:items-center gap-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Project Information</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Open Source Learning Platform
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm md:text-base">
                LearnSpace is an open-source learning and productivity platform designed to help students, 
                developers, and lifelong learners organize their educational journey. It combines essential 
                productivity tools with learning resources in one cohesive environment.
              </p>

              {/* Features & Tech Stack */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2">Key Features</h4>
                  <ul className="text-gray-600 list-disc pl-5 space-y-1 text-sm md:text-base">
                    <li>Kanban task management board</li>
                    <li>Curated book and resource library</li>
                    <li>Digital whiteboard for brainstorming</li>
                    <li>Contributor leaderboard system</li>
                    <li>Responsive design for all devices</li>
                  </ul>
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-800 mb-2">Tech Stack</h4>
                  <ul className="text-gray-600 list-disc pl-5 space-y-1 text-sm md:text-base">
                    <li>Frontend: React, Tailwind CSS</li>
                    <li>Backend: Node.js, Express</li>
                    <li>Database: MongoDB</li>
                    <li>State Management: React Hooks</li>
                    <li>Deployment: Netlify + Render</li>
                  </ul>
                </div>
              </div>

              {/* Connect */}
              <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
                <h4 className="font-bold text-gray-800 mb-2 md:mb-0">Connect with the Community</h4>
                <div className="flex flex-col md:flex-row gap-4">
                  <a
                    href="https://github.com/HimanshiSh03/LearnSpace"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition duration-200 text-sm md:text-base"
                  >
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </a>
                  <a
                    href="mailto:learnspaceteam@example.com"
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200 text-sm md:text-base"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contribution Guidelines */}
          <div className="bg-gray-50 p-6 md:p-8 border-t border-gray-200 flex flex-col gap-6">
            <h3 className="text-xl font-bold text-gray-800">Contribution Guidelines</h3>
            <p className="text-gray-700 text-sm md:text-base">
              We welcome contributions from the community! Whether you're fixing bugs, adding features, 
              improving documentation, or suggesting enhancements, your help is appreciated.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow text-sm md:text-base">
                <h4 className="font-bold text-gray-800 mb-2">1. Fork & Clone</h4>
                <p className="text-gray-600">Fork the repository and clone it locally to start contributing.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-sm md:text-base">
                <h4 className="font-bold text-gray-800 mb-2">2. Create Branch</h4>
                <p className="text-gray-600">Create a new branch for your feature or bug fix.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-sm md:text-base">
                <h4 className="font-bold text-gray-800 mb-2">3. Submit PR</h4>
                <p className="text-gray-600">Push your changes and submit a pull request for review.</p>
              </div>
            </div>
            <div className="mt-4">
              <Link
                to="/contributors"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm md:text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
              >
                View Contributors Leaderboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Owner;