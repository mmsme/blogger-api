const express = require("express");
const router = express.Router();
const Article = require("../controllers/article");
const auth = require("../middlewares/auth");
const imageFile = require("../middlewares/img");
const User = require("../controllers/user");

router.post("/", auth, imageFile, async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  // body {title, body{img, content}, tages} || req.user {}

  try {
    const article = await Article.creatArticle({
      title: req.body.title,
      content: req.body.content,
      image: url + "/images/" + req.file.filename,
      auther: req.user.id,
      tages: req.body.tages,
    });
    res.json(article);
  } catch (e) {
    next(e);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const articles = await Article.getAllAricles();
    res.json(articles);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", auth, async (req, res, next) => {
  try {
    const article = await Article.findArticleByID(req.params.id);
    res.json(article);
  } catch (e) {
    next(e);
  }
});

router.get("/title/:title", auth, async (req, res, next) => {
  try {
    const articles = await Article.findArticleByTitle(req.params.title);
    res.json(articles);
  } catch (e) {
    next(e);
  }
});

router.get("/author/:author", auth, async (req, res, next) => {
  try {
    const author = await User.findUserByName(req.params.author);
    console.log(author.id);
    if (!author) {
      res.send(author);
    }

    const articles = await Article.findArticleByAuthor(author.id);
    res.json(articles);
  } catch (e) {
    next(e);
  }
});

router.get("/tag/:tag", auth, async (req, res, next) => {
  try {
    const articles = await Article.findArticleByTag(req.params.tag);
    res.json(articles);
  } catch (e) {
    next(e);
  }
});

router.patch("/update/img/:id", auth, imageFile, async (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  try {
    const article = await Article.findArticleByID(req.params.id);

    // check author
    if (article.auther != req.user.id) {
      res.send("Access Deniad");
      return;
    }
    const updated = await Article.updateImage(req.params.id, {
      image: url + "/images/" + req.file.filename,
    });

    res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.patch("/update/content/:id", auth, async (req, res, next) => {
  try {
    const article = await Article.findArticleByID(req.params.id);
    console.log(article);
    // check author
    if (article.auther != req.user.id) {
      res.send("Access Deniad");
      return;
    }

    console.log(req.body);

    const updated = await Article.updateArticle(req.params.id, req.body);
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", auth, async (req, res, next) => {
  try {
    const article = await Article.findArticleByID(req.params.id);

    // check author
    if (article.auther != req.user.id) {
      res.send("Access Deniad");
      return;
    }

    const response = await Article.deleteArticle(req.params.id);
    res.json(response);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
