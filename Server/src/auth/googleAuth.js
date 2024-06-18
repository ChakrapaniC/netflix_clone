const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const UserModel = require('.././model/UserModel');
const { generateToken } = require('./userAuth');



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://netflix-watch-web.vercel.app/api/v1/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await UserModel.findOne({ accountId: profile.id });
      if (!user) {
        user = new UserModel({
          accountId: profile.id,
          email: profile.emails[0].value,
          username: profile.displayName
        });
        await user.save();
      }
      
      console.log("google userid is" , user._id)
      const userId = user._id
      const payload = { user: userId };
      const token =  generateToken(payload);

      if(token) {
        user.token = token;
      }
      return done(null,user);
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