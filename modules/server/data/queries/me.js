import { UserType } from '../types'
import checkLoggedIn from 'server/utils/checkLoggedIn'

export default {
  name: 'Me',
  type: UserType,
  resolve: (root, { id }, { req }) => {
    checkLoggedIn(req)
    return req.user.toObject()
  }
}
