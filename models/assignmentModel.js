const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    marks: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    dateline: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
// After deleteOne, delete related attempt
assignmentSchema.post("findOneAndDelete", async function (doc) {
  // console.log(doc);
  const Attempted = mongoose.model("attemptedModel");
  if (doc) {
    await Attempted.deleteMany({ assignmentID: doc._id });
  }
});

const Assignment = mongoose.model("assignmentModel", assignmentSchema);
module.exports = Assignment;
