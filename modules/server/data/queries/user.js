import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import { UserType } from '../types'
import { User } from '../models'

export default {
  name: 'User',
  type: UserType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, { id }) => User.findById(id)
}
