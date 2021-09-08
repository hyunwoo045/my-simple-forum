const express = require("express");
const router = express.Router();

const passport = require("passport");

// router.get("/google", (req, res) => {
//   res.redirect(
//     passport.authenticate("google", { scope: ["email", "profile"] })
//   );
// });
router.get("/test", (req, res, next) => {
  res.redirect(
    passport.authenticate("google", { scope: ["email", "profile"] })(
      req,
      res,
      next
    )
  );
});
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://www.naver.com",
    failureRedirect: "http://www.google.com",
  })
);
module.exports = router;
