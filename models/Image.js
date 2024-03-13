// models/image.js

const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  data: {
    type: Buffer,
    required: true,
  },
});

module.exports = mongoose.model("Image", imageSchema);
