const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github").Strategy;
const mongoose = require("mongoose");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLECLIENTID,
      clientSecret: process.env.GOOGLECLIENTSECRET,
      callbackURL: `/auth/google/callback`, // This is the route the user takes after OAuth from Google
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // We already have a record with the given profile id
        //console.log('We already have a user with this id'); //Test
        return done(null, existingUser);
      } // We don't have a user record with this id, make a new record
      //console.log(school);
      const user = await new User({
        first: profile.name.givenName,
        last: profile.name.familyName,
        googleId: profile.id,
        email: profile.emails[0].value
      }).save();

      done(null, user);
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUBCLIENTID,
      clientSecret: process.env.GITHUBCLIENTSECRET,
      callbackURL: "/auth/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ githubId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const names = profile.displayName.split(" ");
      const first = names[0];
      const last = names[names.length - 1];
      const user = await new User({
        githubId: profile.id,
        first,
        last,
        email: profile.emails[0].value
      }).save();
      done(null, user);
    }
  )
);
