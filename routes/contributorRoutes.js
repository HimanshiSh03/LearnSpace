const express = require("express");
const Contributor = require("../models/Contributor");
const Task = require("../models/Task");

const router = express.Router();

// Get leaderboard data
router.get("/leaderboard", async (req, res) => {
  try {
    const contributors = await Contributor.find().sort({ points: -1 });
    res.json(contributors);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ message: "Failed to fetch leaderboard", error: error.message });
  }
});

// Update contributor points when a task is completed
router.post("/updatePoints", async (req, res) => {
  try {
    const { contributorName, taskLevel, taskId } = req.body;

    // Validate task level
    if (![1, 2, 3].includes(taskLevel)) {
      return res.status(400).json({ message: "Invalid task level" });
    }

    // Point values for each level
    const pointsMap = { 1: 2, 2: 5, 3: 11 };
    const pointsToAdd = pointsMap[taskLevel];

    // Find or create contributor
    let contributor = await Contributor.findOne({ username: contributorName });
    
    if (!contributor) {
      contributor = new Contributor({ 
        username: contributorName,
        points: 0,
        level1Tasks: 0,
        level2Tasks: 0,
        level3Tasks: 0
      });
    }

    // Update points and task counts
    contributor.points += pointsToAdd;
    
    switch (taskLevel) {
      case 1:
        contributor.level1Tasks += 1;
        break;
      case 2:
        contributor.level2Tasks += 1;
        break;
      case 3:
        contributor.level3Tasks += 1;
        break;
    }

    await contributor.save();
    
    // Update task with contributor info
    await Task.findByIdAndUpdate(taskId, { 
      contributor: contributorName,
      taskLevel: taskLevel
    });

    res.json({ 
      message: "Points updated successfully", 
      contributor: contributor 
    });
  } catch (error) {
    console.error("Error updating points:", error);
    res.status(500).json({ message: "Failed to update points", error: error.message });
  }
});

module.exports = router;