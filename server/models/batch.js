import mongoose from "mongoose";

const batchSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    maxLength: 4,
    minLength: 2,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var Batch = mongoose.model("batch", batchSchema);

export default Batch;
