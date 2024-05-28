const User = require("../models/user");

module.exports.signup = (req, res) => {
  console.log(req.body);
  const newUser = new User({
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then(() => {
      res.status(200).send({ code: 200, message: "Signup successful" });
    })
    .catch((err) => {
      console.error("Error during signup:", err);
      res.status(400).send({ code: 400, message: "Signup failed" });
    });
};

module.exports.signin = (req, res) => {
  console.log(req.body);

  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ code: 404, message: "User not found" });
      } else {
        if (user.password !== req.body.password) {
          return res.status(401).send({ code: 401, message: "Wrong password" });
        } else {
          return res.status(200).send({
            code: 200,
            message: "Signin successful",
            token: "vgvnvhjv",
          });
        }
      }
    })
    .catch((err) => {
      console.error("Error during signin:", err);
      res.status(500).send({ code: 500, message: "Internal server error" });
    });
};
