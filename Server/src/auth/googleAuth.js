const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('.././model/UserModel');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/api/v1/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await UserModel.findOne({ googleId: profile.id });
      console.log(profile)
      if (!user) {
        user = new UserModel({
          googleId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName
        });
        await user.save();
      }

      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
));

// passport.serializeUser((user, done) => {
//     done(null, user._id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         const user = await UserModel.findById(id);
//         done(null, user);
//     } catch (err) {
//         done(err, null);
//     }
// });

module.exports = passport;