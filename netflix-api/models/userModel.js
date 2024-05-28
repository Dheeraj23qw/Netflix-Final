const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  likedMovies: Array,
  tokens: [{ type: String, required: true }],
});

UserSchema.methods.generateAuthToken = async function () {
  try {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat(token);
    await user.save();
    return token;
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoose.model("Users", UserSchema);
