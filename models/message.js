const mongoose = require("mongoose");

const massageSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "chat",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    created: {
      type: Date,
      required: true,
      default: new Date(),
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("massage", massageSchema);
