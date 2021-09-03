const express = require("express");
const router = express.Router();
const url = require("url");

const User = require("../models/user");
const JWTController = require("../models/token");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (await User.findOneByEmail(email)) {
      const userPayload = await User.verify(email, password);
      const accessToken = await JWTController.accessGenerate(userPayload);
      const refreshToken = await JWTController.refreshGenerate(userPayload);
      res.send({
        payload: userPayload,
        accessToken,
        refreshToken,
      });
    } else {
      res.send("NOT_FOUND_EMAIL");
    }
  } catch (err) {
    res.send(err);
  }
});

router.post("/register", async (req, res) => {
  const { email, nickname, password } = req.body.inputs;
  try {
    if (!(await User.findOneByEmail(email))) {
      if (!(await User.findOneByUsername(nickname))) {
        await User.create(email, nickname, password);
        res.send("OK");
      } else {
        res.send("DUP_NICKNAME");
      }
    } else {
      res.send("DUP_EMAIL");
    }
    res.send("OK");
  } catch (error) {
    res.send(error);
  }
});

router.get("/check", async (req, res) => {
  const _url = req.url;
  const queryData = url.parse(_url, true).query;
  const token = queryData.token;

  try {
    const decoded = await JWTController.accessVerify(token);
    const { user_id, email, nickname, age, introduction } = decoded;

    const newAccessToken = await JWTController.accessGenerate({
      user_id,
      email,
      nickname,
      age,
      introduction,
    });
    const newRefreshToken = await JWTController.refreshGenerate({
      user_id,
      email,
      nickname,
      age,
      introduction,
    });

    res.send({
      message: "VALID_TOKEN",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      decoded,
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
    const { user_id, email, nickname, age, introduction } = decoded;

    const newAccessToken = await JWTController.accessGenerate({
      user_id,
      email,
      nickname,
      age,
      introduction,
    });
    const newRefreshToken = await JWTController.refreshGenerate({
      user_id,
      email,
      nickname,
      age,
      introduction,
    });

    res.send({
      message: "VALID_REFRESH_TOKEN",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      decoded,
    });
  } catch (err) {
    res.send({
      message: err,
    });
  }
});
module.exports = router;
