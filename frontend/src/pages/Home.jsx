import { Link } from "react-router-dom";
import { Columns3, BookOpen, Presentation, Users, TrendingUp, Lightbulb, Github } from "lucide-react";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            A Modern Platform for Better Education
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to organize, learn, and grow in one unified platform.
          </p>
        </div>

        {/* Feature Cards Grid - Properly aligned with no overlapping */}
        <div className="max-w-7xl mx-auto">
          {/* First Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Kanban Board Card */}
            <Link 
              to="/kanban" 
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center transform hover:-translate-y-1"
            >
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <Columns3 className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Kanban Board</h3>
              <p className="text-gray-600 leading-relaxed">
                Organize your tasks with drag-and-drop simplicity. Visualize your workflow and boost productivity.
              </p>
            </Link>

            {/* BookSpace Card */}
            <Link 
              to="/books" 
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center transform hover:-translate-y-1"
            >
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">BookSpace</h3>
              <p className="text-gray-600 leading-relaxed">
                Access curated learning resources and books categorized by topics and difficulty levels.
              </p>
            </Link>

            {/* Whiteboard Card */}
            <Link 
              to="/whiteboard" 
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center transform hover:-translate-y-1"
            >
              <div className="bg-purple-100 rounded-full p-4 mb-4">
                <Presentation className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Whiteboard</h3>
              <p className="text-gray-600 leading-relaxed">
                Brainstorm ideas visually with our collaborative whiteboard tool. Perfect for planning and creativity.
              </p>
            </Link>
          </div>

          {/* Second Row - 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Community Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-green-100 rounded-full p-4 mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with fellow learners and contributors. Share knowledge and grow together.
              </p>
            </div>

            {/* Progress Tracking Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-blue-100 rounded-full p-4 mb-4">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
              <p className="text-gray-600 leading-relaxed">
                Monitor your learning journey with detailed analytics and achievement badges.
              </p>
            </div>

            {/* Smart Recommendations Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-yellow-100 rounded-full p-4 mb-4">
                <Lightbulb className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Recommendations</h3>
              <p className="text-gray-600 leading-relaxed">
                Get personalized learning suggestions based on your interests and progress.
              </p>
            </div>
          </div>

          {/* Third Row - 2 Cards Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Contributors Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-indigo-100 rounded-full p-4 mb-4">
                <Users className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Contributors</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Meet the amazing people helping improve LearnSpace.
              </p>
              <Link 
                to="/contributors" 
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                View Contributors
              </Link>
            </div>

            {/* GitHub Repository Card */}
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-gray-100 rounded-full p-4 mb-4">
                <Github className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">GitHub Repository</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Check out our open-source project and contribute.
              </p>
              <a 
                href="https://github.com/KaranUnique/LearnSpace" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Get Started Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
