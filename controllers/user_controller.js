const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const { findOne } = require("../models/user");

module.exports.editUser = async function (req, res) {
  user = await User.findById(req.user._id);
  console.log("user found", user);
  User.uploadedAvatar(req, res, function (err) {
    if (err) {
      console.log("multerError");
    }
    console.log("avatar", req.body.avatar);
    console.log("firstName", user.firstName);
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    console.log("req.body", req.body);
    console.log("file namee req.file", req.file.filename);
    if (req.file) {
      if (user.avatar) {
        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
      }
      // user.avatar = User.avatarPath + "/" + req.file + ".jpg";
      user.avatar = User.avatarPath + "/" + req.file.filename;
    }
    console.log("avatar", user.avatar);
    user.save();
  });
 
  return res.status(200).json({
    message: "user updated succesfully",
    data: {
      token: jwt.sign(user.toJSON(), "Cloud", { expiresIn: "100000000" }),
      user,
    },
  });
};

// try {
//   console.log(req.params.id);
//   let user = await User.findById(req.params.id);
//   User.uploadedAvatar(req, res, function (err) {
//     if (err) {
//       console.log("******Multer Error", err);
//     }
//     console.log(user);
//     user.name = req.body.name;
//     user.skills = req.body.skills;
//     user.year=req.body.year;
//     // user.email = req.body.email;
//     console.log(req.file);
//     if (req.file) {
//       if (user.avatar) {
//         if (fs.existsSync(path.join(__dirname, "../../../", user.avatar))) {
//           fs.unlinkSync(path.join(__dirname, "../../../", user.avatar));
//         }
//       }

//       //this is saving path of the uploaded file into the user avatr
//       user.avatar = User.avatarpath + "/" + req.file.filename;
//     }
//     user.save();
//     return res.json(200, {
//       message: "user updated successfuly",
//       success: true,
//       data: {
//         token: jwt.sign(user.toJSON(), "biet"),
//         user: {
//           name: user.name,
//           _id: user._id,
//           // email: user.email,
//           avatar: user.avatar,
//           skills: user.skills,
//           year:user.year,
//         },
//       },
//     });
//   });
// } catch (err) {
//   console.log(err);
//   return res.json(500, {
//     message: "internal server error",
//   });
// }
