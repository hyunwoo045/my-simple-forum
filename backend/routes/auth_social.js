const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const endpoint = require("../key/endpoint").endpoint;

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/kakao", passport.authenticate("kakao"));

// router.get("/google/callback", (req, res) => {
//   passport.authenticate("google", async (err, user, info) => {
//     if (err) throw err;
//     console.log(user);
//     const email = info.profile.email;
//     try {
//       const payload = await User.getUserInfo(email);
//       const { id, nickname } = payload;
//       res.cookie("id", id);
//       res.cookie("nickname", nickname);
//       res.redirect(
//         // `${endpoint}loginsuccess?id=${id}&nickname=${nickname}`
//         `${endpoint}loginsuccess`
//       );
//     } catch (err) {
//       res.redirect(`${endpoint}signin?email=${info.profile.email}`);
//     }
//   })(req, res);
// });

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${endpoint}login`,
  }),
  async (req, res) => {
    res.redirect(
      `/api/auth?provider=google&identifier=${req.user.id}&displayName=${req.user.displayName}`
    );
  }
);

router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: `${endpoint}login`,
  }),
  async (req, res) => {
    res.redirect(
      `/api/auth?provider=kakao&identifier=${req.user.id}&displayName=${req.user.displayName}`
    );
  }
);

module.exports = router;
