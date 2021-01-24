const express = require("express");
const router = express.Router();
const user = require("../routes/user");
const article = require("../routes/article");

router.use("/user", user);
router.use("/article", article);

module.exports = router;
