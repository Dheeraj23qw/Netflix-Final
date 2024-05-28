

const User = require("../models/userModel");

module.exports.addMovies = async (req, res) => {
  try {
    const { email, data } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const { likedMovies } = user; // Corrected accessing likedMovies
      const movieAlreadyLiked = likedMovies.find(({ id }) => id === data.id); // Corrected comparison
      if (!movieAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data], // Corrected updating likedMovies
          },
          { new: true }
        );
        return res.json({ msg: "Movie added successfully" });
      } else {
        return res.json({ msg: "Movie already added to liked list" });
      }
    } else {
      await User.create({ email, likedMovies: [data] }); // Creating a new user separately
      return res.json({ msg: "Movie added successfully" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ msg: "Error adding movies" }); // Corrected error response
  }
};
