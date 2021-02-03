const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const asyncSign = promisify(jwt.sign);

// get all users
const getAllUsers = () => User.find({}).populate("follwers").exec();

// take user info from body to create new user
const create = (user) => User.create(user);

// login
const login = async ({ username, password }) => {
  // search for user by username
  const user = await User.find({ username: username }).exec();

  // check if user is Authenticated
  if (!user) {
    throw Error("UN_AUTHENTICATED1");
  }

  // check if password is correct or not
  const validPassword = await user.validatePassword(password);
  if (!validPassword) {
    throw Error("UN_AUTHENTICATED2");
  }

  const token = await asyncSign(
    {
      username: user.username,
      email: user.email,
      id: user.id,
    },
    "SECURE",
    { expiresIn: "1d" }
  );

  console.log(token);

  return { ...user.toJSON(), token };
};

// find user by id and update user with findByIdAndUpdate function
const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true }).exec();
};

// find user by name
const findUserByName = (name) => User.findOne({ username: name });

// find All user By Name
const findUsersByName = (name) => User.find({ username: name });

// find user by id
const findUserById = (id) => User.findById(id).exec();

// find all Followers
const findMyFollowers = (followers) =>
  User.find({ following: followers }).populate("User").exec();

// delete user account
const deleteUserByID = (id) => User.findByIdAndDelete(id);

module.exports = {
  getAllUsers,
  create,
  login,
  updateUser,
  findUserByName,
  findUserById,
  findUsersByName,
  findMyFollowers,
  deleteUserByID,
};
