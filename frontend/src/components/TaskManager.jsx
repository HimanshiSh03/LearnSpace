import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    assignedUser: 'Unassigned'
  });
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');
  
  // Fetch all tasks
  useEffect(() => {
    fetchTasks();
  }, []);
  
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };
  
  // Handle input changes for new task
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    
    if (!newTask.title.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTask,
          status: 'todo'
        }),
      });
      
      if (!response.ok) throw new Error('Failed to add task');
      
      const task = await response.json();
      setTasks(prev => [...prev, task]);
      setNewTask({
        title: '',
        description: '',
        priority: 'Medium',
        assignedUser: 'Unassigned'
      });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  // Update task status
  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) throw new Error('Failed to update task');
      
      const updatedTask = await response.json();
      setTasks(prev => 
        prev.map(task => task._id === taskId ? updatedTask : task)
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  
  // Delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete task');
      
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  
  // Start editing a task
  const startEditing = (task) => {
    setEditingTask({...task});
  };
  
  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
  };
  
  // Save edited task
  const saveEditing = async () => {
    if (!editingTask.title.trim()) return;
    
    try {
      const response = await fetch(`${API_URL}/api/tasks/${editingTask._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingTask),
      });
      
      if (!response.ok) throw new Error('Failed to update task');
      
      const updatedTask = await response.json();
      setTasks(prev => 
        prev.map(task => task._id === editingTask._id ? updatedTask : task)
      );
      setEditingTask(null);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };
  
  // Handle editing input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingTask(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Filter tasks based on status
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });
  
  // Get task count by status
  const getTaskCount = (status) => {
    return tasks.filter(task => task.status === status).length;
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">Task Manager</h1>
            <p className="text-gray-600 mt-2">Organize your work and boost productivity</p>
          </div>
          <a 
            href="/" 
            className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center"
          >
            ← Back to Home
          </a>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Total Tasks</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">{tasks.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">To Do</h3>
            <p className="text-3xl font-bold text-red-500 mt-2">{getTaskCount('todo')}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">In Progress</h3>
            <p className="text-3xl font-bold text-yellow-500 mt-2">{getTaskCount('inprogress')}</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Completed</h3>
            <p className="text-3xl font-bold text-green-500 mt-2">{getTaskCount('done')}</p>
          </div>
        </div>
        
        {/* Add Task Form */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Task Title *</label>
              <input
                type="text"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="What needs to be done?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Add details..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                rows="3"
              ></textarea>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                <input
                  type="text"
                  name="assignedUser"
                  value={newTask.assignedUser}
                  onChange={handleInputChange}
                  placeholder="Assign to..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
        
        {/* Task Filters */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              All Tasks
            </button>
            <button
              onClick={() => setFilter('todo')}
              className={`px-4 py-2 rounded-lg ${filter === 'todo' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              To Do
            </button>
            <button
              onClick={() => setFilter('inprogress')}
              className={`px-4 py-2 rounded-lg ${filter === 'inprogress' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              In Progress
            </button>
            <button
              onClick={() => setFilter('done')}
              className={`px-4 py-2 rounded-lg ${filter === 'done' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Completed
            </button>
          </div>
          
          {/* Task List */}
          <div className="space-y-4">
            {filteredTasks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No tasks found. Add a new task to get started!</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  {editingTask && editingTask._id === task._id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="title"
                        value={editingTask.title}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-medium"
                      />
                      <textarea
                        name="description"
                        value={editingTask.description}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows="2"
                      ></textarea>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                          <select
                            name="priority"
                            value={editingTask.priority}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          >
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
                          <input
                            type="text"
                            name="assignedUser"
                            value={editingTask.assignedUser}
                            onChange={handleEditChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          onClick={cancelEditing}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={saveEditing}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-gray-800">{task.title}</h3>
                          {task.description && (
                            <p className="text-gray-600 mt-1">{task.description}</p>
                          )}
                          <div className="flex flex-wrap gap-2 mt-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${task.priority === 'High' ? 'bg-red-100 text-red-800' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                              {task.priority} Priority
                            </span>
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                              Assigned: {task.assignedUser}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => startEditing(task)}
                            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-full"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      {/* Task Actions */}
                      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                        {task.status !== 'todo' && (
                          <button
                            onClick={() => updateTaskStatus(task._id, 'todo')}
                            className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full hover:bg-red-200"
                          >
                            Mark To Do
                          </button>
                        )}
                        {task.status !== 'inprogress' && (
                          <button
                            onClick={() => updateTaskStatus(task._id, 'inprogress')}
                            className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200"
                          >
                            In Progress
                          </button>
                        )}
                        {task.status !== 'done' && (
                          <button
                            onClick={() => updateTaskStatus(task._id, 'done')}
                            className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full hover:bg-green-200"
                          >
                            Mark Complete
                          </button>
                        )}
                        <span className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full">
                          {task.status === 'todo' ? 'To Do' : task.status === 'inprogress' ? 'In Progress' : 'Completed'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;