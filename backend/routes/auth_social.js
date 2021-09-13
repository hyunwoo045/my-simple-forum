const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const JWTController = require("../models/token");
const endpoint = require("../key/config").endpoint;

/* 
  f: tokenGenerator({ provider, identifier, displayName })
  - provider: 소셜 로그인 기능을 제공한 주체 (google, kakao 등)
  - identifier: provider가 제공한 고유 일련번호
  - displayName: provider가 제공한 유저 네임

  return: 자체 JWT 토큰 생성기로 생성된 { accesstoken, refreshtoken }
*/
const tokenGenerator = async (payload) => {
  const { provider, identifier, displayName } = payload;
  try {
    let id = await User.find(provider, identifier);
    if (!id) {
      User.create(provider, identifier, displayName);
      id = await User.find(provider, identifier);
    }
    const userPayload = { id, provider, identifier, displayName };
    const accessToken = await JWTController.accessGenerate(userPayload);
    const refreshToken = await JWTController.refreshGenerate(userPayload);

    return { accessToken, refreshToken };
  } catch (err) {
    throw err;
  }
};

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${endpoint}login`,
  }),
  async (req, res) => {
    tokenGenerator({
      provider: "google",
      identifier: req.user.id,
      displayName: `G-${req.user.displayName}`,
    }).then((result) => {
      res.cookie("accessToken", result.accessToken);
      res.cookie("refreshToken", result.refreshToken);
      res.redirect(`${endpoint}loginsuccess`);
    });
  }
);
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: `${endpoint}login`,
  }),
  async (req, res) => {
    tokenGenerator({
      provider: "kakao",
      identifier: req.user.id,
      displayName: `Kakao-${req.user.displayName}`,
    }).then((result) => {
      res.cookie("accessToken", result.accessToken);
      res.cookie("refreshToken", result.refreshToken);
      res.redirect(`${endpoint}loginsuccess`);
    });
  }
);

module.exports = router;
