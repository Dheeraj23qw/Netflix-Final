const express = require("express");


const {
  handleregister,
  handlelogin,
} = require("../controllers/userController.js");

const { auth } = require("../middlewares/auth.js");



const router = express.Router();


router.post("/register", handleregister);
router.post("/login", handlelogin);


module.exports = router;
