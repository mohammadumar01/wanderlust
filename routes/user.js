const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user.js");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.Signup));


router.route("/login")
.get(userController.renderLogin)
.post( saveRedirectUrl ,passport.authenticate('local',{failureRedirect: '/login',
    failureFlash: true}),userController.Login);


router.get("/logout",userController.Logout);

module.exports = router;