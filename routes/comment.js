const express = require("express");
const router = express.Router();
const Comment = require("../controllers/comment");
const auth = require("../middlewares/auth");
const Article = require("../controllers/article");
const ArticleModel = require("../models/Article");

router.post("/add/:article", auth, async (req, res, next) => {
  const articleId = req.params.article;
  const auther = req.user.id;
  const content = req.body.content;
  try {
    // save Comment In  DataBase
    console.log({
      content: content,
      auther: auther,
    });
    const commnet = await Comment.createComment({
      content: content,
      auther: auther,
    });

    // link comment with article
    const article = await Article.findArticleByID(articleId);
    article.comments.push(commnet._id);

    // update article
    const update = await Article.updateArticle(articleId, article).exec();

    res.json(update);
  } catch (error) {
    next(error);
  }
});

// update Comment
router.patch("/update/:commentId", auth, async (req, res, next) => {
  try {
    const update = await Comment.updateComment(req.params.commentId, req.body);
    res.json(update);
  } catch (error) {
    next(error);
  }
});

// Delete Comment
router.delete("/delete/:commentId", auth, async (req, res, next) => {
  try {
    // check the access of user if is auther or not
    const comment = await Comment.findCommentByID(req.params.commentId);

    if (comment.auther == req.user.id) {
      // delete comment
      await Comment.deleteComment(comment._id);
      // remove ref from article
      const article = await ArticleModel.findOne({
        comments: comment._id,
      })
        .populate("Comment")
        .exec();

      const index = article.comments.indexOf(comment._id);
      article.comments.splice(index, 1);

      // update article
      const update = await Article.updateArticle(article._id, article);
      res.json(update);
      return;
    }

    res.send("Invalid Access");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
