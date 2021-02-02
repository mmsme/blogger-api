const mongoose = require("mongoose");
const { Schema } = mongoose;

articleSchema = new Schema({
  title: {
    type: String,
    maxlength: 100,
    minlength: 3,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  auther: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tages: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});

const ArticleModel = mongoose.model("Article", articleSchema);

module.exports = ArticleModel;
