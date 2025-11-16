// models/Task.js
const mongoose = require("mongoose"); // Changed from import to require

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ["todo", "inprogress", "done"],
    default: "todo",
  },
  description: { type: String, default: "" },
  assignedUser: { type: String, default: "Unassigned" },
  priority: { 
    type: String, 
    enum: ["Low", "Medium", "High"], 
    default: "Medium" 
  },
  // Contributor tracking fields
  contributor: { type: String, default: "" },
  taskLevel: { 
    type: Number, 
    enum: [1, 2, 3], 
    default: 1 
  },
}, { timestamps: true }); // Added timestamps for created/updated dates (optional but good practice)

module.exports = mongoose.model("Task", TaskSchema); // Changed from export default to module.exports