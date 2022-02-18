const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const path = require("path");
const multer = require("multer");
//string is converted into path using path module
const AVATAR_PATH = path.join("/upload/users/avatar");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    avatar: {
      type: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    dob: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "instructor", "student"],
      default: "student",
    },
  },
  {
    timestamps: true,
  }
);
UserSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});
UserSchema.methods.matchPassword = async function (enteredPassword) {
  console.log("this password", this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

//multer part

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("File fetched", file);
    cb(null, path.join(__dirname, "..", AVATAR_PATH));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".jpg";
    console.log("file/file", file);
    cb(null, "avatar" + "-" + uniqueSuffix);
  },
});

UserSchema.statics.uploadedAvatar = multer({ storage: storage }).single(
  "avatar"
);
UserSchema.statics.avatarPath = AVATAR_PATH;

const User = mongoose.model("User", UserSchema);
module.exports = User;
