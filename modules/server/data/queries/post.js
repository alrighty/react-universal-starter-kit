import {
  GraphQLNonNull,
  GraphQLID
} from 'graphql'
import { PostType } from '../types'
import { Post } from '../models'

export default {
  name: 'Post',
  type: PostType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  resolve: (root, { id }) => Post.findById(id)
}
