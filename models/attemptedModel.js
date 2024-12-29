const mongoose = require("mongoose");

const attemptedSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    assignmentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "assignmentModel",
      required: true,
    },
    docsLink: {
      type: String,
      required: true,
    },
    quick_note: {
      type: String,
      required: true,
    },
    feedback: {
      type: String,
      default: null,
    },
    givenMarks: {
      type: Number,
      default: null,
    },
    status: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
const Attempted = mongoose.model("attemptedModel", attemptedSchema);
module.exports = Attempted;
