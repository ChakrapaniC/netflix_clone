const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const UserModel = require('.././model/UserModel');
const { generateToken } = require('./userAuth');


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL:  "https://netflix-watch-web.vercel.app/api/v1/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile)
      let user = await UserModel.findOne({accountId: profile.id });
      if (!user) {
        user = new UserModel({
          accountId : profile.id,
          username: profile.username
        });
        await user.save();
      }
      
      console.log("github userid is" , user._id)
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
module.exports = passport;