import mongoose from "mongoose";

const essayExamSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "fileupload",
  },
  answer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "fileupload",
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "batch",
  },
  subscription: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "subscription",
  },

  start_time: {
    type: Date,
    default: new Date(),
    required: true,
  },
  type: {
    //true if it is exam else question
    type: Boolean,
    default: false,
    required: true,
  },
  end_time: {
    type: Date,
    required: true,
  },
  interval: [{ hour: { type: Number }, minutes: { type: Number } }],
  scores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "score",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var EssayExam = mongoose.model("essayExam", essayExamSchema);

export default EssayExam;
