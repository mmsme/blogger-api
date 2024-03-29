const Comment = require("../models/Comment");

// create new Comment
const createComment = (comment) => {
  const res = Comment.create(comment);
  return res;
};
// update Comment
const updateComment = (id, comment) =>
  Comment.findByIdAndUpdate(id, comment, { new: true });

// delete Comment
const deleteComment = (id) => Comment.findByIdAndDelete(id);

// find Commnet By Id
const findCommentByID = (id) => Comment.findById(id);

module.exports = {
  createComment,
  updateComment,
  deleteComment,
  findCommentByID,
};
