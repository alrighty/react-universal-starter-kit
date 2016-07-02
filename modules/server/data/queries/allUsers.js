import { UserType } from '../types'
import { User } from '../models'
import { createPaginatedList } from '../connections'

export default createPaginatedList(
  'Users',
  'users',
  UserType,
  User
)
