import express from 'express'
import passport from 'server/passport'
import auth from './auth'
import graphql from './graphql'

const router = express.Router() // eslint-disable-line new-cap

// Initialize passport
router.use(passport.initialize())
router.use(passport.session())

router.use('/auth', auth)
router.use('/graphql', graphql)

export default router
