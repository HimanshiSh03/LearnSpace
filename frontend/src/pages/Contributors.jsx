import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trophy, Medal, Award, Users, Star, Target, Crown, Zap } from "lucide-react";

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contributors/leaderboard`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setContributors(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      setLoading(false);
    }
  };

  // Function to determine contributor role based on points
  const getContributorRole = (points) => {
    if (points >= 100) return { name: "Master Contributor", color: "text-purple-600", bgColor: "bg-purple-100" };
    if (points >= 50) return { name: "Senior Contributor", color: "text-blue-600", bgColor: "bg-blue-100" };
    if (points >= 20) return { name: "Regular Contributor", color: "text-green-600", bgColor: "bg-green-100" };
    return { name: "New Contributor", color: "text-yellow-600", bgColor: "bg-yellow-100" };
  };

  // Function to get medal based on rank
  const getMedal = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  // Filter contributors based on search term
  const filteredContributors = contributors.filter(contributor =>
    contributor.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Contributors</h1>
            <Link 
              to="/" 
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Back to Home
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
            <p className="text-center mt-4 text-gray-600">Loading contributors...</p>
          </div>
        </div>
      </div>
    );
  }

  // Get top contributor
  const topContributor = contributors.length > 0 ? contributors[0] : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Contributors</h1>
            <p className="text-gray-600 mt-2">Meet the amazing people helping improve LearnSpace</p>
          </div>
          <Link 
            to="/" 
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
          >
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Featured Contributor */}
        {topContributor && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg p-6 mb-8 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <div className="bg-white bg-opacity-20 rounded-full p-2 w-24 h-24 flex items-center justify-center">
                  <Crown className="text-yellow-300 w-12 h-12" />
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                  <Trophy className="text-yellow-300" />
                  <h2 className="text-2xl font-bold">Featured Contributor</h2>
                </div>
                
                <h3 className="text-3xl font-bold mb-2">{topContributor.username}</h3>
                
                <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-3">
                  <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                    <div className="font-bold text-xl">{topContributor.points}</div>
                    <div className="text-sm">Total Points</div>
                  </div>
                  
                  <div className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">
                    <div className="font-bold text-xl">
                      {topContributor.level1Tasks + topContributor.level2Tasks + topContributor.level3Tasks}
                    </div>
                    <div className="text-sm">Tasks Completed</div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Zap className="text-yellow-300" />
                  <span className="font-medium">
                    {getContributorRole(topContributor.points).name}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
            <div className="bg-indigo-100 p-3 rounded-lg">
              <Users className="text-indigo-600 w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Contributors</p>
              <p className="text-2xl font-bold">{contributors.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
            <div className="bg-green-100 p-3 rounded-lg">
              <Trophy className="text-green-600 w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Top Contributor</p>
              <p className="text-2xl font-bold truncate">
                {contributors.length > 0 ? contributors[0].username : "N/A"}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
            <div className="bg-yellow-100 p-3 rounded-lg">
              <Star className="text-yellow-600 w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Total Points</p>
              <p className="text-2xl font-bold">
                {contributors.reduce((sum, contributor) => sum + contributor.points, 0)}
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Target className="text-blue-600 w-6 h-6" />
            </div>
            <div className="ml-4">
              <p className="text-gray-500 text-sm">Avg. Points</p>
              <p className="text-2xl font-bold">
                {contributors.length > 0 
                  ? Math.round(contributors.reduce((sum, contributor) => sum + contributor.points, 0) / contributors.length)
                  : 0}
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Leaderboard</h2>
            <div className="w-full md:w-auto">
              <input
                type="text"
                placeholder="Search contributors..."
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        {filteredContributors.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">No contributors found</h3>
            <p className="mt-1 text-gray-500">
              {searchTerm ? "No contributors match your search." : "Be the first to contribute!"}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contributor
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level 1 Tasks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level 2 Tasks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Level 3 Tasks
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContributors.map((contributor, index) => {
                    const role = getContributorRole(contributor.points);
                    return (
                      <tr 
                        key={contributor._id} 
                        className={index < 3 ? (index === 0 ? "bg-yellow-50" : index === 1 ? "bg-gray-100" : "bg-orange-50") : ""}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-lg font-bold text-gray-900">
                            {getMedal(index)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-800 font-medium">
                                {contributor.username.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{contributor.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${role.bgColor} ${role.color}`}>
                            <Award className="w-4 h-4 mr-1" />
                            {role.name}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-indigo-600">{contributor.points}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contributor.level1Tasks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contributor.level2Tasks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {contributor.level3Tasks}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Contributor Roles Explanation */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Contributor Roles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
              <h3 className="font-bold text-yellow-700 flex items-center">
                <Medal className="w-5 h-5 mr-2" />
                New Contributor
              </h3>
              <p className="text-yellow-600 text-sm mt-2">0-19 points</p>
              <p className="text-gray-600 text-sm mt-1">Getting started with contributions</p>
            </div>
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="font-bold text-green-700 flex items-center">
                <Medal className="w-5 h-5 mr-2" />
                Regular Contributor
              </h3>
              <p className="text-green-600 text-sm mt-2">20-49 points</p>
              <p className="text-gray-600 text-sm mt-1">Active community member</p>
            </div>
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="font-bold text-blue-700 flex items-center">
                <Medal className="w-5 h-5 mr-2" />
                Senior Contributor
              </h3>
              <p className="text-blue-600 text-sm mt-2">50-99 points</p>
              <p className="text-gray-600 text-sm mt-1">Experienced contributor</p>
            </div>
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
              <h3 className="font-bold text-purple-700 flex items-center">
                <Medal className="w-5 h-5 mr-2" />
                Master Contributor
              </h3>
              <p className="text-purple-600 text-sm mt-2">100+ points</p>
              <p className="text-gray-600 text-sm mt-1">Top community leader</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contributors;