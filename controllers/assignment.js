const Assignment = require("../models/assignmentModel");
const Attempted = require("../models/attemptedModel");
const User = require("../models/userModel");

const createAssignment = async (req, res) => {
  try {
    const result = await Assignment.create({
      ...req.body,
      owner: req.userInfo._id,
    });
    await User.findByIdAndUpdate(result.owner, {
      $push: {
        assignment: result._id,
      },
    });
    return res.status(201).send({ success: true, data: result });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ success: false, message: error.message });
  }
};
const getAssignment = async (req, res) => {
  try {
    const result = await Assignment.find({
      dateline: { $gte: new Date() },
    })
      .populate("owner", "name email uid photo")
      .exec();

    const expireAssinmentIds = await Assignment.find({
      dateline: { $lt: new Date() },
    }).select("_id");
    const onlyID = expireAssinmentIds.map((ids) => ids._id);

    if (onlyID.length > 0) {
      await Attempted.deleteMany({ assignmentID: { $in: onlyID } });
    }
    await Assignment.deleteMany({
      dateline: { $lt: new Date() },
    });

    return res.status(201).send({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .send({ success: false, message: "Assignment not found" });
  }
};
const updateAssignment = async (req, res) => {
  try {
    await Assignment.findByIdAndUpdate(req.params.id, req.body);
    return res
      .status(201)
      .send({ success: true, message: "Assignment updated" });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};
const getMyAttempt = async (req, res) => {
  try {
    const result = await Attempted.find({
      user_id: req.userInfo._id,
    })
      .populate("user_id")
      .populate("assignmentID");
    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

const getPendingAssignment = async (req, res) => {
  try {
    const result = await Attempted.find({
      status: false,
    })
      .populate("user_id")
      .populate("assignmentID");

    return res.status(200).send({ success: true, data: result });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};
const getAssignmentById = async (req, res) => {
  try {
    const result = await Assignment.findById(req.params.id).populate(
      "owner",
      "name email uid createdAt photo"
    );
    return res.status(201).send({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .send({ success: false, message: "Assignment not found" });
  }
};
const getMyAssignmentById = async (req, res) => {
  try {
    const result = await Assignment.findOne({
      owner: req.userInfo._id,
      _id: req.params.id,
    });

    return res.status(201).send({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .send({ success: false, message: "Assignment not found" });
  }
};
const deleteAssignment = async (req, res) => {
  try {
    await Assignment.findOneAndDelete({
      _id: req.params.id,
      owner: req.userInfo._id,
    });

    return res
      .status(201)
      .send({ success: true, message: "Delete Assignment By Id" });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error.message });
  }
};
const submitAttempt = async (req, res) => {
  const data = { ...req.body, user_id: req.userInfo._id };
  const find = await Attempted.findOne({
    assignmentID: data.assignmentID,
    user_id: req.userInfo._id,
  });

  if (find)
    return res
      .status(400)
      .send({ success: false, message: "You already submited" });
  try {
    await Attempted.create(data);
    return res.status(201).send({ success: true, message: "Attempt submited" });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};

const submitMarks = async (req, res) => {
  const data = await Attempted.findById(req.params.id).populate(
    "assignmentID",
    "marks"
  );

  if (data.assignmentID.marks < parseInt(req.body.givenMarks))
    return res.status(400).send({ success: false, message: "Mark is so high" });
  if (data.status || data.givenMarks !== null)
    return res.status(400).send({
      success: false,
      message: "Mark distribution already completed",
    });
  try {
    data.givenMarks = req.body.givenMarks;
    data.feedback = req.body.feedback;
    data.status = true;
    data.save();
    return res.status(201).send({ success: true, message: "Marks submited" });
  } catch (error) {
    return res.status(400).send({ success: false, message: error.message });
  }
};
const searchAssignment = async (req, res) => {
  try {
    const searchData = await Assignment.find({
      title: new RegExp(req.params.query, "i"),
    }).populate("owner", "name email uid photo");
    return res.status(200).send({ success: true, data: searchData });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ success: false, message: error.message });
  }
};
const searchAssignmentDeffi = async (req, res) => {
  try {
    const searchData = await Assignment.find({
      difficulty: req.params.query,
    }).populate("owner", "name email uid photo");
    return res.status(200).send({ success: true, data: searchData });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({ success: false, message: error.message });
  }
};
module.exports = {
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
};
