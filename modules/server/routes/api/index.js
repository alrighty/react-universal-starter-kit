import express from 'express'
import passport from 'server/passport'
import auth from './auth'

const router = express.Router() // eslint-disable-line new-cap

// Initialize passport
router.use(passport.initialize())
router.use(passport.session())

router.use('/auth', auth)

export default router
