const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../models/User");

const asyncVerify = promisify(jwt.verify);

const auth = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    next(new Error("UN_AUTHENTICATED From Auth1"));
  }

  try {
    const { id } = await asyncVerify(authorization, "SECURE");
    const user = await User.findById(id).exec();
    req.user = user;

    next();
  } catch (e) {
    next(new Error("UN_AUTHENTICATED From Auth 2"));
  }
};

module.exports = auth;
