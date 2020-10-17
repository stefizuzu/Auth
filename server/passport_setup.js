const passport = require("passport");
const chalk = require("chalk");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GithubStrategy = require("passport-github").Strategy;

passport.use(
  new GoogleStrategy(
    {
      // Google OAuth
      clientID: "",
      clientSecret: "",
      callbackURL: "http://localhost:3001/google/callback",
    },
    // after login this will be triggered
    function (accessToken, refreshToken, profile, done) {
      user = { ...profile };
      return done(null, profile);
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "http://localhost:3001/facebook/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

// Github Strategy
passport.use(
  new GithubStrategy(
    {
      clientID: "",
      clientSecret: "",
      callbackURL: "/github/callback",
    },
    (accessToken, refreshToken, profile, cb) => {
      user = { ...profile };
      return cb(null, profile);
    }
  )
);
