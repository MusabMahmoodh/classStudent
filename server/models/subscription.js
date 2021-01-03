import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "batch",
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "teacher",
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
  ],
});

var Subscription = mongoose.model("subscription", subscriptionSchema);

export default Subscription;
