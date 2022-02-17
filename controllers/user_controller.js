const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const { findOne, findById } = require("../models/user");

module.exports.editUser = async function (req, res) {
  user = await User.findById(req.user._id);
  //   console.log("user found", user);
  User.uploadedAvatar(req, res, function (err) {
    if (err) {
      console.log("multerError");
    }
    //  console.log("avatar", req.file);
    // console.log("firstName", user.firstName);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    // console.log("req.body", req.body);
    // console.log("file namee req.file", req.file.filename);
    if (req.file) {
      if (user.avatar) {
        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
      }
      // user.avatar = User.avatarPath + "/" + req.file + ".jpg";
      user.avatar = User.avatarPath + "/" + req.file.filename;
    }
    // console.log("avatar", user.avatar);
    user.save();
  });

  return res.status(200).json({
    message: "user updated succesfully",
    data: {
      success: true,
      token: jwt.sign(user.toJSON(), "Cloud", { expiresIn: "100000000" }),
      user,
    },
  });
};

module.exports.getCurentUser = async function (req, res) {
  let user = await User.findById(req.params.id);
  if (!user) {
    return res.status(200).json({
      message: "no such user found",
      success: false,
    });
  }
  return res.status(200).json({
    message: "user found successfully",
    data: user,
    success: true,
  });
};
