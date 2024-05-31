const mongoose = require("mongoose");

const userModelSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please provide a unique username"],
      unique: [true, "Username exist"],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
    },
    email: {
      type: String,
      required: [true, "please provide a unique email"],
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    pic: {
      type: "String",
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userModelSchema);

module.exports = User;
