const User = require("../model/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = 10;
require("dotenv").config();
require("../config/passport");

// register
const userRegister = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (user) return res.status(202).send("user already exists");

    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash,
        confirm_password: hash,
      });
      await newUser.save();
      res.status(201).send({ success: true, userInfo: newUser });
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// login
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(202).send("email doesn't exist");

    const bcryptPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!bcryptPassword) return res.status(202).send("password doesn't match");

    // jwt
    const payload = {
      id: user._id,
      email: user.email,
    };

    const privateKey = process.env.ENC_KEY;

    var token = jwt.sign(payload, privateKey, { expiresIn: "2d" });

    res.status(200).send({
      message: "user logged in successfully",
      token: "Bearer " + token,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

// profile
const userProfile = (req, res) => {
  return res.status(200).send({
    user: {
      id: req.user._id,
      username: req.user.username,
      email: req.user.email,
    },
  });
};

module.exports = { userRegister, userLogin, userProfile };
