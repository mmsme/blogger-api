const Article = require("../models/Article");
const fs = require("fs");

const getAllAricles = () => Article.find({}).populate("auther").exec();

// create new Article
const creatArticle = (article) => Article.create(article);

// find specific Article
const findArticleByID = (id) => {
  return Article.findById(id)
    .populate("auther")
    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "auther",
        model: "User",
      },
    })
    .exec();
};

// find specific Article by Author{
const findArticleByAuthor = (auther) =>
  Article.find({ auther: auther }).populate("auther").exec();

// find specific Article by Title
const findArticleByTitle = async (key) =>{
   // get all data
    const articles = await getAllAricles();
    // filter by search
    const res = articles.filter((article) => {
      return article.title.includes(key.toLowerCase());
    });

    return res;
}

// find specific article by tag
const findArticleByTag = (tag) =>
  Article.find({ tages: tag }).populate("auther").exec();

// update Article
const updateImage = (id, imgPath) => {
  deleteImageByArticleID(id);
  return Article.findByIdAndUpdate(id, imgPath, { new: true });
};

const updateArticle = (id, content) => {
  return Article.findByIdAndUpdate(id, content, { new: true })
    .populate("auther")
    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "auther",
        model: "User",
      },
    });
};

const deleteArticle = async (id) => {
  return Article.findByIdAndDelete(id).exec();
};

async function deleteImageByArticleID(id) {
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
}

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
