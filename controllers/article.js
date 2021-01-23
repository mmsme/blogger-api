const Article = require("../models/Article");
const fs = require("fs");

const getAllAricles = () => Article.find({}).populate("auther").exec();

// create new Article
const creatArticle = (article) => Article.create(article);

// find specific Article
const findArticleByID = (id) => Article.findById(id);
// find specific Article by Author{
const findArticleByAuthor = (auther) =>
  Article.find({ auther: auther }).populate("auther").exec();

// find specific Article by Title
const findArticleByTitle = (title) => Article.find({ title: title });

// find specific article by tag
const findArticleByTag = (tag) => Article.find({ tages: tag });

// update Article
const updateImage = (id, imgPath) =>
  Article.findByIdAndUpdate(id, imgPath, { new: true });

const updateArticle = (id, content) =>
  Article.findByIdAndUpdate(id, content, { new: true });

const deleteArticle = async (id) => {
  const { image } = await Article.findById(id).exec();

  const imgPath = image.split("/");
  const [, , , folder, imageName] = imgPath;
  const path = folder + "/" + imageName;

  try {
    fs.unlinkSync(path);
    //file removed
  } catch (err) {
    console.error(err);
  }

  return Article.findByIdAndDelete(id);
};

module.exports = {
  creatArticle,
  getAllAricles,
  findArticleByAuthor,
  findArticleByTitle,
  findArticleByTag,
  updateImage,
  updateArticle,
  findArticleByID,
  deleteArticle,
};
