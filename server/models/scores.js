import mongoose from "mongoose";

const scoreSchema = mongoose.Schema({
  score: {
    type: Number,
  },
  timeTaken: {
    hour: { type: Number },
    minutes: { type: Number },
  },
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fileupload",
  },
  start_time: {
    type: Date,
    // required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "essayExam",
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "student",
  },
});

var Score = mongoose.model("score", scoreSchema);

export default Score;
