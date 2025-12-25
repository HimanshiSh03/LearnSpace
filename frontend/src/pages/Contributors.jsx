import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, Medal, Award, Users, Star, Target, Crown, Zap, HomeIcon, GitBranch, Code } from "lucide-react";

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [githubContributors, setGithubContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all"); // all, app, github

  useEffect(() => {
    fetchLeaderboard();
    fetchGithubContributors();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contributors/leaderboard`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setContributors(data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const fetchGithubContributors = async () => {
    try {
      // Using the GitHub API to fetch contributors
      const response = await fetch('https://api.github.com/repos/HimanshiSh03/LearnSpace/contributors');
      if (!response.ok) {
        throw new Error(`GitHub API error! Status: ${response.status}`);
      }
      const githubData = await response.json();
      
      // Format GitHub contributors to match our data structure
      const formattedGithubContributors = githubData.map((contributor, index) => ({
        ...contributor,
        isGithubContributor: true,
        points: Math.max(1, Math.floor(100 / (index + 1))), // Assign points based on position
        level1Tasks: contributor.contributions, // Using GitHub contributions as level1 tasks
        level2Tasks: Math.floor(contributor.contributions / 2),
        level3Tasks: Math.floor(contributor.contributions / 5),
        _id: `github-${contributor.id}`
      }));
      
      setGithubContributors(formattedGithubContributors);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching GitHub contributors:", error);
      setLoading(false);
    }
  };

  const getContributorRole = (points) => {
    if (points >= 100) return { name: "Master Contributor", color: "text-purple-600", bgColor: "bg-purple-100" };
    if (points >= 50) return { name: "Senior Contributor", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (points >= 20) return { name: "Regular Contributor", color: "text-green-600", bgColor: "bg-green-100" };
    return { name: "New Contributor", color: "text-yellow-600", bgColor: "bg-yellow-100" };
  };

  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  const filteredContributors = contributors.filter(contributor =>
    contributor.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600 text-center">Loading contributors...</p>
        </div>
      </div>
    );
  }

  const topContributor = contributors.length > 0 ? contributors[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
              <Trophy className="mr-2 text-yellow-500" />
              Contributors Leaderboard
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Meet the amazing people helping improve LearnSpace</p>
          </div>
          <Link 
            to="/" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center text-sm sm:text-base"
          >
            <HomeIcon className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Featured Contributor */}
        {topContributor && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="bg-white bg-opacity-20 rounded-full p-2 w-24 h-24 flex items-center justify-center">
                  <Crown className="text-yellow-300 w-12 h-12" />
                </div>
              </div>
              <div className="text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                  <Trophy className="text-yellow-300" />
                  <h2 className="text-xl sm:text-2xl font-bold">Featured Contributor</h2>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 truncate">{topContributor.username}</h3>
                <div className="flex flex-wrap gap-4 justify-center sm:justify-start mb-3">
                  <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg min-w-[100px]">
                    <div className="font-bold text-xl">{topContributor.points}</div>
                    <div className="text-sm">Total Points</div>
                  </div>
                  <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg min-w-[100px]">
                    <div className="font-bold text-xl">
                      {topContributor.isGithubContributor 
                        ? topContributor.contributions 
                        : topContributor.level1Tasks + topContributor.level2Tasks + topContributor.level3Tasks}
                    </div>
                    <div className="text-sm">
                      {topContributor.isGithubContributor ? "GitHub Contributions" : "Tasks Completed"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <Zap className="text-yellow-300" />
                  <span className="font-medium">{getContributorRole(topContributor.points).name}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex items-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Users className="text-indigo-600 w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Contributors</p>
              <p className="text-2xl font-bold">{getAllContributors().length}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex items-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-100 p-3 rounded-lg">
              <Trophy className="text-green-600 w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Top Contributor</p>
              <p className="text-2xl font-bold truncate">{contributors.length > 0 ? contributors[0].username : "N/A"}</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex items-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="text-yellow-600 w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Points</p>
              <p className="text-2xl font-bold">
                {contributors.reduce((sum, c) => sum + c.points, 0)}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 flex items-center hover:shadow-xl transition-shadow duration-300">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Code className="text-blue-600 w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Avg. Points</p>
              <p className="text-2xl font-bold">
                {contributors.length > 0 
                  ? Math.round(contributors.reduce((sum, c) => sum + c.points, 0) / contributors.length)
                  : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
            <Medal className="mr-2 text-yellow-500" />
            Leaderboard Rankings
          </h2>
          <input
            type="text"
            placeholder="Search contributors..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Leaderboard Table */}
        {filteredContributors.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No contributors found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm ? "No contributors match your search." : "Be the first to contribute!"}
            </p>
            <div className="mt-6">
              <Link 
                to="/kanban" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Start Contributing
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-3 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contributor</th>
                  <th className="px-3 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-3 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                  <th className="px-3 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L1 Tasks</th>
                  <th className="px-3 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L2 Tasks</th>
                  <th className="px-3 sm:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L3 Tasks</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContributors.map((contributor, index) => {
                  const role = getContributorRole(contributor.points);
                  return (
                    <tr 
                      key={contributor._id} 
                      className={`hover:bg-gray-50 transition-colors duration-150 ${index < 3 ? (index === 0 ? "bg-yellow-50" : index === 1 ? "bg-gray-100" : "bg-orange-50") : ""}`}
                    >
                      <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base font-bold">{getMedal(index)}</td>
                      <td className="px-3 sm:px-6 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-indigo-100 flex items-center justify-center text-sm sm:text-base font-medium text-indigo-800">
                            {contributor.username.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-2 sm:ml-4">
                            <div className="text-sm sm:text-base font-medium text-gray-900 truncate">{contributor.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-2 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${role.bgColor} ${role.color}`}>
                          <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          {role.name}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base font-bold flex items-center">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-500" />
                        {contributor.points}
                      </td>
                      <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 flex items-center">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-500" />
                        {contributor.level1Tasks}
                      </td>
                      <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 flex items-center">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-blue-500" />
                        {contributor.level2Tasks}
                      </td>
                      <td className="px-3 sm:px-6 py-2 whitespace-nowrap text-sm sm:text-base text-gray-500 flex items-center">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-purple-500" />
                        {contributor.level3Tasks}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Roles and How to Earn Points Sections */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Roles */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
            <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-yellow-700 flex items-center"><Medal className="w-5 h-5 mr-2" />New Contributor</h3>
              <p className="text-yellow-600 text-sm mt-1">0-19 points</p>
              <p className="text-gray-600 text-sm mt-1">Getting started with contributions</p>
            </div>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-green-700 flex items-center"><Medal className="w-5 h-5 mr-2" />Regular Contributor</h3>
              <p className="text-green-600 text-sm mt-1">20-49 points</p>
              <p className="text-gray-600 text-sm mt-1">Active community member</p>
            </div>
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-blue-700 flex items-center"><Medal className="w-5 h-5 mr-2" />Senior Contributor</h3>
              <p className="text-blue-600 text-sm mt-1">50-99 points</p>
              <p className="text-gray-600 text-sm mt-1">Experienced contributor</p>
            </div>
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50 hover:shadow-md transition-shadow">
              <h3 className="font-bold text-purple-700 flex items-center"><Medal className="w-5 h-5 mr-2" />Master Contributor</h3>
              <p className="text-purple-600 text-sm mt-1">100+ points</p>
              <p className="text-gray-600 text-sm mt-1">Top community leader</p>
            </div>
            
            {/* GitHub-specific roles */}
            <div className="border border-green-200 rounded-lg p-4 bg-green-50 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-bold text-green-700 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Open Source Contributor
              </h3>
              <p className="text-green-600 text-sm mt-2">GitHub contributors</p>
              <p className="text-gray-600 text-sm mt-1">Contributed to the codebase</p>
            </div>
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-bold text-blue-700 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Active Contributor
              </h3>
              <p className="text-blue-600 text-sm mt-2">20+ GitHub points</p>
              <p className="text-gray-600 text-sm mt-1">Regular GitHub contributor</p>
            </div>
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50 hover:shadow-md transition-shadow duration-300">
              <h3 className="font-bold text-purple-700 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Core Maintainer
              </h3>
              <p className="text-purple-600 text-sm mt-2">50+ GitHub points</p>
              <p className="text-gray-600 text-sm mt-1">Key project maintainer</p>
            </div>
          </div>

          {/* How to Earn Points */}
          <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-bold text-green-700 flex items-center"><Star className="w-5 h-5 mr-2 text-green-500" />Level 1 Tasks</h3>
              <p className="text-gray-600 text-sm mt-1">Easy tasks worth 2 points each</p>
              <ul className="text-gray-500 text-xs mt-2 list-disc pl-5">
                <li>Documentation fixes</li>
                <li>Minor bug reports</li>
                <li>Small UI improvements</li>
              </ul>
            </div>
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-bold text-blue-700 flex items-center"><Star className="w-5 h-5 mr-2 text-blue-500" />Level 2 Tasks</h3>
              <p className="text-gray-600 text-sm mt-1">Moderate tasks worth 5 points each</p>
              <ul className="text-gray-500 text-xs mt-2 list-disc pl-5">
                <li>Feature requests</li>
                <li>Bug fixes</li>
                <li>Code reviews</li>
              </ul>
            </div>
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
              <h3 className="font-bold text-purple-700 flex items-center"><Star className="w-5 h-5 mr-2 text-purple-500" />Level 3 Tasks</h3>
              <p className="text-gray-600 text-sm mt-1">Advanced tasks worth 10 points each</p>
              <ul className="text-gray-500 text-xs mt-2 list-disc pl-5">
                <li>Major feature implementation</li>
                <li>Complex bug fixes</li>
                <li>Community mentorship</li>
              </ul>
            </div>
            
            {/* GitHub contribution info */}
            <div className="md:col-span-3 border border-gray-200 rounded-lg p-4 bg-gray-50 mt-4">
              <h3 className="font-bold text-gray-700 flex items-center">
                <GitBranch className="w-5 h-5 mr-2" />
                GitHub Contributions
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                Make pull requests to the{' '}
                <a 
                  href="https://github.com/HimanshiSh03/LearnSpace" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  LearnSpace repository
                </a>{' '}
                to appear on this leaderboard. Your contributions will be recognized based on merged pull requests.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contributors;