const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    totalMarks: {
      type: Number,
      default: null,
    },
    assignment: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "assignmentModel",
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("users", userSchema);
module.exports = User;
