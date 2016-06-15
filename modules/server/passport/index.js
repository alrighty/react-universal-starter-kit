import passport from 'passport'
import { github } from './strategies'
import { serializeUser, deserializeUser } from './encoding'

// Create new instance of Passport
const pass = new passport.Passport();

// User encoding
pass.serializeUser(serializeUser)
pass.deserializeUser(deserializeUser)

pass.use(github)

export default pass;
