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
    console.log(info);
    try {
      const payload = await User.getUserInfo(info.profile.email);
      res.redirect(
        `${endpoint}loginsuccess?id=1&nickname=user01&token=${info.accessToken}`
      );
    } catch (err) {
      res.redirect(`${endpoint}signin?email=${info.profile.email}`);
    }
  })(req, res);
});
module.exports = router;
