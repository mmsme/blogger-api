const express = require("express");
const router = express.Router();
const user = require("../routes/user");
const article = require("../routes/article");
const comment = require("../routes/comment");

router.use("/user", user);
router.use("/article", article);
router.use("/comment", comment);

module.exports = router;
