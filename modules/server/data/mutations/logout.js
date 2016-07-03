import { UserType } from '../types'
import checkLoggedIn from 'server/utils/checkLoggedIn'

export default {
  type: UserType,
  resolve: (root, args, { req }) => {
    checkLoggedIn(req)

    const { user } = req

    req.logout()

    return user
  }
}
