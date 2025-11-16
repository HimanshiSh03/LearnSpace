const mongoose = require("mongoose");

const ContributorSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  points: { 
    type: Number, 
    default: 0 
  },
  level1Tasks: { 
    type: Number, 
    default: 0 
  },
  level2Tasks: { 
    type: Number, 
    default: 0 
  },
  level3Tasks: { 
    type: Number, 
    default: 0 
  }
}, { timestamps: true });

module.exports = mongoose.model("Contributor", ContributorSchema);