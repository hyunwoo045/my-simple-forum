const whitelist = ["http://3.36.53.67", "http://127.0.0.1:8080"];
const corsOption = {
  origin: function (origin, callback) {
    var isWhiteListed = whitelist.indexOf(origin) !== 1;
    callback(null, isWhiteListed);
  },
  credentials: true,
};

var createError = require("http-errors");
var cors = require("cors")(corsOption);
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const passport = require("passport");

const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID =
  "647766314048-9odi2ct7sk8u9ab0a3vbsfrr0qmget9s.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "jDDiurwy2D6b-1afqPW5hcvR";

var commentRouter = require("./routes/comment");
var contentRouter = require("./routes/content");
var authRouter = require("./routes/auth");
var authSocialRouter = require("./routes/auth_social");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/comment", commentRouter);
app.use("/api/content", contentRouter);
app.use("/api/auth", authRouter);
app.use("/api/auth_social", authSocialRouter);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  done(null, id);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth_social/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, requestToken, profile, done) => {
      // console.log("Profile: ", profile);
      // console.log("Access Token: ", accessToken);

      const email = profile.email;

      // console.log("Refresh Token: ", refreshToken);
      return done(null, profile, {
        message: "OK!",
        accessToken,
        profile,
      });
    }
  )
);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
