const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const endpoint = require("../key/endpoint").endpoint;
const JWTController = require("../models/token");

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/kakao", passport.authenticate("kakao"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${endpoint}login`,
  }),
  async (req, res) => {
    const provider = "google";
    const identifier = req.user.id;
    const displayName = `G-${req.user.displayName}`;
    try {
      let id = await User.find(provider, identifier);
      if (!id) {
        User.create(provider, identifier, displayName);
        id = await User.find(provider, identifier);
      }
      const payload = { id, provider, identifier, displayName };
      const accessToken = await JWTController.accessGenerate(payload);
      const refreshToken = await JWTController.accessGenerate(payload);
      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);
      res.redirect(`${endpoint}loginsuccess`);
    } catch (err) {
      throw err;
    }
  }
);
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: `${endpoint}login`,
  }),
  async (req, res) => {
    const provider = "kakao";
    const identifier = req.user.id;
    const displayName = `Kakao-${req.user.displayName}`;
    try {
      let id = await User.find(provider, identifier);
      if (!id) {
        User.create(provider, identifier, displayName);
        id = await User.find(provider, identifier);
      }
      const payload = { id, provider, identifier, displayName };
      const accessToken = await JWTController.accessGenerate(payload);
      const refreshToken = await JWTController.accessGenerate(payload);
      res.cookie("accessToken", accessToken);
      res.cookie("refreshToken", refreshToken);
      res.redirect(`${endpoint}loginsuccess`);
    } catch (err) {
      throw err;
    }
  }
);

module.exports = router;
