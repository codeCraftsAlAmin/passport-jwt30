const express = require("express");
const router = express.Router();
const {
  userRegister,
  userLogin,
  userProfile,
} = require("../controller/controller");
const { runValidation } = require("../validation/runValidation");
const { schemas } = require("../validation/validation");

const passport = require("passport");

// register:post
router.post("/register", runValidation(schemas.register), userRegister);

// register:post
router.post("/login", runValidation(schemas.login), userLogin);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userProfile
);

module.exports = router;
