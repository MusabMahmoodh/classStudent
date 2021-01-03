import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  subscriptions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscription",
    },
  ],
});

var Teacher = mongoose.model("teacher", teacherSchema);

export default Teacher;
