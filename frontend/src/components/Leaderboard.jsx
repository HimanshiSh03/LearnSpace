import React, { useState, useEffect } from "react";
import { Trophy, Medal, Award } from "lucide-react";

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

const Leaderboard = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Contributor Leaderboard</h2>
        <div className="text-gray-500 text-center py-4">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Contributor Leaderboard</h2>
      
      {contributors.length === 0 ? (
        <div className="text-gray-500 text-center py-4">
          No contributors yet. Complete tasks to earn points!
        </div>
      ) : (
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
              {contributors.map((contributor, index) => {
                const role = getContributorRole(contributor.points);
                return (
                  <tr 
                    key={contributor._id} 
                    className={index < 3 ? (index === 0 ? "bg-yellow-50" : index === 1 ? "bg-gray-100" : "bg-orange-50") : ""}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">
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
                      <div className="text-sm font-bold text-blue-600">{contributor.points}</div>
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
      )}
      
      {/* Contributor Roles Explanation */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h3 className="text-lg font-medium text-gray-800 mb-3">Contributor Roles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="border border-yellow-200 rounded-lg p-3 bg-yellow-50">
            <h4 className="font-bold text-yellow-700 flex items-center">
              <Medal className="w-4 h-4 mr-1" />
              New Contributor
            </h4>
            <p className="text-yellow-600 text-xs mt-1">0-19 points</p>
          </div>
          <div className="border border-green-200 rounded-lg p-3 bg-green-50">
            <h4 className="font-bold text-green-700 flex items-center">
              <Medal className="w-4 h-4 mr-1" />
              Regular Contributor
            </h4>
            <p className="text-green-600 text-xs mt-1">20-49 points</p>
          </div>
          <div className="border border-blue-200 rounded-lg p-3 bg-blue-50">
            <h4 className="font-bold text-blue-700 flex items-center">
              <Medal className="w-4 h-4 mr-1" />
              Senior Contributor
            </h4>
            <p className="text-blue-600 text-xs mt-1">50-99 points</p>
          </div>
          <div className="border border-purple-200 rounded-lg p-3 bg-purple-50">
            <h4 className="font-bold text-purple-700 flex items-center">
              <Medal className="w-4 h-4 mr-1" />
              Master Contributor
            </h4>
            <p className="text-purple-600 text-xs mt-1">100+ points</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;