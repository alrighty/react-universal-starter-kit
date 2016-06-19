import express from 'express'
import passport from 'server/passport'
import ensureLoggedIn from 'server/utils/ensureLoggedIn';

const router = express.Router() // eslint-disable-line new-cap

router.get('/logout', (req, res) => {
  req.logout()
  res.send({
    message: 'OK'
  })
})

router.get('/me', ensureLoggedIn, (req, res) => {
  res.send(req.user.toJSON())
})

// GitHub Auth
router.get('/github',
  passport.authenticate('github', {
    scope: ['user:email']
  })
)
router.get('/github/callback',
  passport.authenticate('github', {
    successRedirect: '/home',
    failureRedirect: '/error'
  })
)
router.get('/github/unlink', ensureLoggedIn, (req, res) => {
  const { user } = req
  user.set('github', undefined)
  user.save(() => res.redirect('/api/auth/me'))
})

export default router
