import mongoose from "mongoose";

const uploadSchema = new mongoose.Schema({
  imageBase64: {
    type: String,
    required: true,
  },
});

var FileUpload = mongoose.model("fileupload", uploadSchema);

export default FileUpload;
