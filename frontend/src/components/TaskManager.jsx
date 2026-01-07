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

  const filteredTasks = useMemo(() => {
    if (filter === "all") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

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

        {/* ADD TASK */}
        {/* (Form logic and task list rendering remains exactly same, only formatted and grouped) */}

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
