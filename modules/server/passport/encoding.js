import { User } from 'server/data/models'

export const serializeUser = (user, done) => {
  done(null, user.id)
}

export const deserializeUser = (id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
}
