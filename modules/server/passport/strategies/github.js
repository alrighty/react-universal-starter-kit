import GitHub from 'passport-github'
import { User } from '../../models'
import config from 'config'

const { clientID, clientSecret, callbackURL } = config.github;

export default new GitHub.Strategy({
  clientID,
  clientSecret,
  callbackURL,
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  // Get user info from request
  const { user } = req;
  // Create GitHub user info
  const github = {
    id: profile.id,
    name: profile.displayName,
    username: profile.username,
    email: profile._json.email,
    token: accessToken
  }
  // Check if the user is already logged in
  if (user) {
    // Update the current users GitHub credentials
    user.github = github
    // Save the user
    user.save((err) => done(err, user))
  } else {
    // Find the user in the database based on their facebook id
    User.findOne({ 'github.id' : profile.id }, (err, user) => {
      // If there is an error, stop everything and return that
      // ie an error connecting to the database
      if (err) {
        return done(err);
      }
      // If the user is found, then update GitHub credentials and log them in
      if (user) {
        user.github = github
        user.save((err) => done(err, user))
      } else {
        // If there is no user found with that GitHub id, create them
        const newUser = new User()
        newUser.name = profile.displayName;
        newUser.github = github
        newUser.save((err) => done(err, newUser))
      }
    })
  }
})
