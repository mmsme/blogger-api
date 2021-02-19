const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 6,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 30,
    },
    fname: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    lname: {
      type: String,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      minlength: 11,
    },
    dob: {
      type: Date,
    },
    address: {
      type: String,
      minlength: 3,
    },
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        optional: true,
      },
    ],
  },
  {
    toJSON: {
      transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
      },
    },
  }
);

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 8);
  next();
});

// check password of user
userSchema.methods.validatePassword = function validatePassword(password) {  
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre(["updateOne", "findOneAndUpdate"], function (next) {
  if (!this._update.password) {
    next();
  }
  this._update.password = bcrypt.hashSync(this._update.password, 8);
  next();
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
