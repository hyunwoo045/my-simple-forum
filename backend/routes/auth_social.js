const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const endpoint = require("../key/endpoint").endpoint;

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/google/callback", (req, res) => {
  passport.authenticate("google", async (err, user, info) => {
    if (err) throw err;
    const email = info.profile.email;
    try {
      const payload = await User.getUserInfo(email);
      const { id, nickname } = payload;
      res.cookie("id", id);
      res.cookie("nickname", nickname)
      res.redirect(
        // `${endpoint}loginsuccess?id=${id}&nickname=${nickname}`
        `${endpoint}loginsuccess`
      );
    } catch (err) {
      res.redirect(`${endpoint}signin?email=${info.profile.email}`);
    }
  })(req, res);
});

module.exports = router;
