import React, { useState, useEffect, useMemo } from "react";

const API_URL = import.meta.env.VITE_APP_API_URL || "http://localhost:3000";

/* ----------------------------- COMPONENT ----------------------------- */

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    assignedUser: "Unassigned"
  });

  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("all");
  
  // Sorting and Filtering State
  const [sortBy, setSortBy] = useState("date"); // "priority", "date", "status"
  const [sortOrder, setSortOrder] = useState("desc"); // "asc", "desc"
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "todo", "inprogress", "done"

  /* ----------------------------- FETCH ----------------------------- */

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/api/tasks`);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  /* ----------------------------- CREATE ----------------------------- */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) return;

    try {
      const response = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newTask,
          status: "todo"
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const task = await response.json();

      setTasks((prev) => [...prev, task]);

      setNewTask({
        title: "",
        description: "",
        priority: "Medium",
        assignedUser: "Unassigned"
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  /* ----------------------------- UPDATE ----------------------------- */

  const updateTaskStatus = async (taskId, status) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const saveEditing = async () => {
    if (!editingTask.title.trim()) return;

    try {
      const response = await fetch(
        `${API_URL}/api/tasks/${editingTask._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editingTask)
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((prev) =>
        prev.map((task) =>
          task._id === editingTask._id ? updatedTask : task
        )
      );

      setEditingTask(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  /* ----------------------------- DELETE ----------------------------- */

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  /* ----------------------------- EDIT MODE ----------------------------- */

  const startEditing = (task) => {
    setEditingTask({ ...task });
  };

  const cancelEditing = () => {
    setEditingTask(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditingTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* ----------------------------- DERIVED DATA ----------------------------- */

  const sortedAndFilteredTasks = useMemo(() => {
    // First filter by status
    let result = statusFilter === "all" 
      ? tasks 
      : tasks.filter((task) => task.status === statusFilter);

    // Then sort by selected criteria
    result = [...result].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "priority") {
        const priorityOrder = { High: 3, Medium: 2, Low: 1 };
        comparison = priorityOrder[b.priority] - priorityOrder[a.priority];
      } else if (sortBy === "date") {
        comparison = new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortBy === "status") {
        const statusOrder = { todo: 1, inprogress: 2, done: 3 };
        comparison = statusOrder[a.status] - statusOrder[b.status];
      }

      return sortOrder === "asc" ? -comparison : comparison;
    });

    return result;
  }, [tasks, statusFilter, sortBy, sortOrder]);

  const getTaskCount = (status) => {
    return tasks.filter((task) => task.status === status).length;
  };

  /* ----------------------------- UI ----------------------------- */

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Task Manager
            </h1>
            <p className="text-gray-600 mt-2">
              Organize your work and boost productivity
            </p>
          </div>

          <a
            href="/"
            className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center"
          >
            ← Back to Home
          </a>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Tasks" value={tasks.length} color="text-indigo-600" />
          <StatCard title="To Do" value={getTaskCount("todo")} color="text-red-500" />
          <StatCard title="In Progress" value={getTaskCount("inprogress")} color="text-yellow-500" />
          <StatCard title="Completed" value={getTaskCount("done")} color="text-green-500" />
        </div>

        {/* FILTER & SORT CONTROLS */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            
            {/* Status Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-semibold text-gray-700 mr-2 flex items-center">Filter:</span>
              {[
                { label: "All", value: "all" },
                { label: "To Do", value: "todo" },
                { label: "In Progress", value: "inprogress" },
                { label: "Done", value: "done" }
              ].map((filterOption) => (
                <button
                  key={filterOption.value}
                  onClick={() => setStatusFilter(filterOption.value)}
                  className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                    statusFilter === filterOption.value
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {filterOption.label}
                  {statusFilter === filterOption.value && (
                    <span className="ml-2 text-xs">({sortedAndFilteredTasks.length})</span>
                  )}
                </button>
              ))}
            </div>

            {/* Sort Controls */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm font-semibold text-gray-700">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="date">Date Created</option>
                <option value="priority">Priority</option>
                <option value="status">Status</option>
              </select>
              
              <button
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition duration-200 flex items-center gap-1"
                title={sortOrder === "asc" ? "Ascending" : "Descending"}
              >
                {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
              </button>
            </div>
          </div>
        </div>

        {/* ADD TASK FORM */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Add New Task</h2>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  placeholder="Enter task title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={newTask.description}
                onChange={handleInputChange}
                placeholder="Enter task description (optional)"
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assigned To
              </label>
              <input
                type="text"
                name="assignedUser"
                value={newTask.assignedUser}
                onChange={handleInputChange}
                placeholder="Enter assignee name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full md:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
            >
              + Add Task
            </button>
          </form>
        </div>

        {/* TASK LIST */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Tasks ({sortedAndFilteredTasks.length})
          </h2>

          {sortedAndFilteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No tasks found</p>
              <p className="text-gray-400 text-sm mt-2">
                {statusFilter !== "all" 
                  ? "Try changing the filter or add a new task"
                  : "Add a new task to get started"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedAndFilteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition duration-200"
                >
                  {editingTask?._id === task._id ? (
                    // EDIT MODE
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="title"
                        value={editingTask.title}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <textarea
                        name="description"
                        value={editingTask.description}
                        onChange={handleEditChange}
                        rows="2"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <select
                        name="priority"
                        value={editingTask.priority}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                      <select
                        name="status"
                        value={editingTask.status}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="todo">To Do</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                      <div className="flex gap-2">
                        <button
                          onClick={saveEditing}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-2 rounded transition duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // VIEW MODE
                    <>
                      <div className="mb-3">
                        <h3 className="font-bold text-lg text-gray-800 mb-2">
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="text-gray-600 text-sm mb-2">
                            {task.description}
                          </p>
                        )}
                        
                        {/* Status Badge */}
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              task.status === "done"
                                ? "bg-green-100 text-green-700"
                                : task.status === "inprogress"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {task.status === "todo"
                              ? "To Do"
                              : task.status === "inprogress"
                              ? "In Progress"
                              : "Done"}
                          </span>

                          {/* Priority Badge */}
                          <span
                            className={`px-2 py-1 rounded text-xs font-semibold ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-700"
                                : task.priority === "Medium"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-green-100 text-green-700"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        <p className="text-gray-500 text-xs">
                          Assigned: <span className="font-medium">{task.assignedUser}</span>
                        </p>
                        {task.createdAt && (
                          <p className="text-gray-400 text-xs mt-1">
                            Created: {new Date(task.createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-3 border-t border-gray-200">
                        <button
                          onClick={() => startEditing(task)}
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition duration-200 text-sm font-medium"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task._id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition duration-200 text-sm font-medium"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => {
  return (
    <div className="bg-white rounded-xl shadow p-6 text-center">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
};

export default TaskManager;
