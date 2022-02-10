const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const { findOne } = require("../models/user");

module.exports.editUser = async function (req, res) {
  user = await User.findById(req.user._id);
  console.log("booom", user);
  User.uploadedAvatar(req, res, function (err) {
    if (err) {
      console.log("multerError");
    }
    console.log("avatar", req.body.avatar);
    console.log("firstName", user.firstName);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    console.log("filavatar namee", req.body);
    if (req.body.file) {
      if (user.avatar) {
        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
      }
      user.avatar = User.avatarPath + "/" + req.file + ".jpg";
    }
    console.log("avatar", user.avatar);
    user.save();
    return res.status(200).json({
      message: "user updated succesfully",
      data: {
        token: jwt.sign(user.toJSON(), "Cloud", { expiresIn: "100000000" }),
      },
    });
  });
};
