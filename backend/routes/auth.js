const express = require("express");
const router = express.Router();
const url = require("url");

const User = require("../models/user");
const JWTController = require("../models/token");
const endpoint = require("../key/endpoint").endpoint;

router.get("/", async (req, res) => {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const { provider, id, displayName } = queryData;
  const payload = { provider, id, displayName };
  try {
    if (!(await User.find(provider, id))) {
      User.create(provider, id, displayName);
    }
    const accessToken = await JWTController.accessGenerate(payload);
    const refreshToken = await JWTController.accessGenerate(payload);
    res.cookie("accessToken", accessToken);
    res.cookie("refreshToken", refreshToken);
    res.redirect(`${endpoint}loginsuccess`);
  } catch (err) {
    throw err;
  }
});

router.get("/check", async (req, res) => {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const token = queryData.token;
  try {
    const decoded = await JWTController.accessVerify(token);
    const { provider, id, displayName } = decoded;
    const payload = { provider, id, displayName };
    const newAccessToken = await JWTController.accessGenerate(payload);
    const newRefreshToken = await JWTController.refreshGenerate(payload);
    res.send({
      message: "VALID_TOKEN",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      payload,
    });
  } catch (err) {
    res.send({
      message: err,
    });
  }
});

router.get("/check_refresh", async (req, res) => {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const token = queryData.token;
  try {
    const decoded = await JWTController.refreshVerify(token);
    const { provider, id, displayName } = decoded;
    const payload = { provider, id, displayName };
    const newAccessToken = await JWTController.accessGenerate(payload);
    const newRefreshToken = await JWTController.refreshGenerate(payload);
    res.send({
      message: "VALID_REFRESH_TOKEN",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      payload,
    });
  } catch (err) {
    res.send({
      message: err,
    });
  }
});

module.exports = router;

/* OLD VERSION LOGIN CODE */

/*
router.post("/login", async (req, res) => {
  try {
    const payload = {
      id: req.body.id,
      nickname: req.body.nickname
    }
    const accessToken = await JWTController.accessGenerate(payload);
    const refreshToken = await JWTController.refreshGenerate(payload);
    res.send({
      id: payload.id,
      nickname: payload.nickname,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.send(err);
  }
});

router.post("/register", async (req, res) => {
  // const { email, nickname, password } = req.body.inputs;

  const email = req.body.email;
  const nickname = req.body.nickname;
  try {
    // await User.findOneByEmail(email);
    // const hashPassword = await User.createHashPassword(nickname, password);
    // await User.create(email, nickname, hashPassword);
    await User.findOneByUsername(nickname);
    await User.create(email, nickname);
    const payload = await User.getUserInfo(email)
    const accessToken = await JWTController.accessGenerate(payload);
    const refreshToken = await JWTController.refreshGenerate(payload);
    res.send({ ...payload, accessToken, refreshToken });
  } catch (error) {
    res.send(error);
  }
});
*/
