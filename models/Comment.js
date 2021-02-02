const mongoose = require("mongoose");
const { Schema } = mongoose;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  auther: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const CommentModel = mongoose.model("Comment", commentSchema);
module.exports = CommentModel;
