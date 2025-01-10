const express = require("express");
const {
  createAssignment,
  getAssignment,
  updateAssignment,
  getMyAttempt,
  getPendingAssignment,
  getAssignmentById,
  deleteAssignment,
  submitAttempt,
  submitMarks,
  getMyAssignmentById,
  searchAssignment,
  searchAssignmentDeffi,
  topUser,
} = require("../controllers/assignment");
const { authUser } = require("../middlewares/authUser");
const route = express.Router();

route.post("/create", authUser, createAssignment); // Create assignment
route.get("/get", getAssignment); // Get all assignment
route.get("/top-user", topUser); // Get all assignment
route.get("/get/:id", getAssignmentById); // Get one assignment by :id
route.get("/get/my/:id", authUser, getMyAssignmentById); // Get one assignment by :id
route.get("/get/status/pending", getPendingAssignment); // Get all pending assignment
route.get("/my-attempt", authUser, getMyAttempt); // Get all my attempt
route.post("/submit-attempt", authUser, submitAttempt); // Get all my attempt
route.post("/submit-marks/:id", authUser, submitMarks); // Get all my attempt
route.post("/update/:id", authUser, updateAssignment); // Update my created assignment
route.get("/delete/:id", authUser, deleteAssignment); // Delete my created assignment by :id
route.get("/search/:query", authUser, searchAssignment); // Delete my created assignment by :id
route.get("/search/difficulty/:query", authUser, searchAssignmentDeffi); // Delete my created assignment by :id
module.exports = route;
