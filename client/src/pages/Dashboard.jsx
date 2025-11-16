import React, { useState, useEffect } from "react";
import Leaderboard from "../components/Leaderboard";

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    todo: 0,
    inprogress: 0,
    done: 0
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/tasks`);
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      setTasks(data);
      
      // Calculate statistics
      const todoCount = data.filter(task => task.status === "todo").length;
      const inprogressCount = data.filter(task => task.status === "inprogress").length;
      const doneCount = data.filter(task => task.status === "done").length;
      
      setStats({
        total: data.length,
        todo: todoCount,
        inprogress: inprogressCount,
        done: doneCount
      });
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
        <div className="text-xl font-semibold">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <a 
            href="/kanban" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Go to Kanban Board
          </a>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-gray-800">{stats.total}</div>
            <div className="text-gray-600 mt-2">Total Tasks</div>
          </div>
          
          <div className="bg-red-100 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-red-800">{stats.todo}</div>
            <div className="text-red-600 mt-2">To Do</div>
          </div>
          
          <div className="bg-orange-100 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-orange-800">{stats.inprogress}</div>
            <div className="text-orange-600 mt-2">In Progress</div>
          </div>
          
          <div className="bg-green-100 rounded-lg shadow p-6">
            <div className="text-3xl font-bold text-green-800">{stats.done}</div>
            <div className="text-green-600 mt-2">Completed</div>
          </div>
        </div>
        
        {/* Recent Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Tasks</h2>
          
          {tasks.length === 0 ? (
            <div className="text-gray-500 text-center py-8">
              No tasks found. Create some tasks to see them here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Task
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks.slice(0, 5).map((task) => (
                    <tr key={task._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${task.status === 'todo' ? 'bg-red-100 text-red-800' : 
                            task.status === 'inprogress' ? 'bg-orange-100 text-orange-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {task.status === 'todo' ? 'To Do' : 
                           task.status === 'inprogress' ? 'In Progress' : 'Done'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(task.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {/* Progress Overview */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Progress Overview</h2>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-green-600 h-4 rounded-full" 
              style={{ width: `${stats.total > 0 ? (stats.done / stats.total) * 100 : 0}%` }}
            ></div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            {stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}% completed
          </div>
        </div>
        
        {/* Contributor Leaderboard */}
        <div className="mt-8">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;