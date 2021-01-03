import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  indexNo: {
    type: String,
    required: true,
    unique: true,
    maxLength: 6,
    minLength: 3,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "batch",
  },
  scores: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "score",
    },
  ],
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscription",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Student = mongoose.model("student", studentSchema);

export default Student;
