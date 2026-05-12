const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/user.js");
const { saveRedirect } = require("../middleware.js");
const userController = require("../controllers/user.js");

// ---------------- SIGNUP ROUTES ----------------
router.route("/signup")
    .get(userController.renderSignUpform)
    .post(userController.SignUp);

// ---------------- LOGIN ROUTES ----------------
router.route("/login")
    .get(userController.login)
    .post(
        saveRedirect,
        passport.authenticate("local", {
            failureRedirect: "/login",
            failureFlash: true,
        }),
        userController.LoggedIn
    );

// ---------------- LOGOUT ROUTE ----------------
router.get("/logout", userController.logOut);

module.exports = router;