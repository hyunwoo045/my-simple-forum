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
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const GoogleStrategy = require("passport-google-oauth2").Strategy;
const KakaoStrategy = require("passport-kakao").Strategy;

const googleClientConfig = require("./key/config").google;
const GOOGLE_CLIENT_ID = googleClientConfig.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = googleClientConfig.GOOGLE_CLIENT_SECRET;
const GOOGLE_CALLBACK_URL = googleClientConfig.GOOGLE_CALLBACK_URL;
const kakaoClientConfig = require("./key/config").kakao;
const KAKAO_CLIENT_ID = kakaoClientConfig.KAKAO_CLIENT_ID;
const KAKAO_CALLBACK_URL = kakaoClientConfig.KAKAO_CALLBACK_URL;

var commentRouter = require("./routes/comment");
var contentRouter = require("./routes/content");
var authRouter = require("./routes/auth");
var authSocialRouter = require("./routes/auth_social");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const dbConfig = require("./key/config").database;
const sessionStore = new MySQLStore(dbConfig);
const sessionConfig = require("./key/config").session;
app.use(session({ ...sessionConfig, store: sessionStore }));

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
  done(null, {
    id: user.id,
    provider: user.provider,
    displayName: user.displayName,
  });
});
passport.deserializeUser((user, done) => {
  console.log("DESERIALIZED: ", user);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (request, accessToken, requestToken, profile, done) => {
      console.log("GOOGLE LOGIN!");
      return done(null, profile);
    }
  )
);
passport.use(
  new KakaoStrategy(
    {
      clientID: KAKAO_CLIENT_ID,
      callbackURL: KAKAO_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
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
