const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/userModel');
const dotenv = require('dotenv');
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:5000/api/v1/auth/google/callback',
},
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists in our db
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      // If not, create a new user in our db
      const newUser = await new User({
        googleId: profile.id,
        username: profile.displayName,
        thumbnail: profile._json.picture,
      }).save();
      done(null, newUser);
    } catch (err) {
      console.error(err);
      done(err, null);
    }
  }
));

module.exports = passport;