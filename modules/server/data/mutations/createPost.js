import {
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { PostType } from '../types'
import { Post } from '../models'
import checkLoggedIn from 'server/utils/checkLoggedIn'

export default {
  name: 'CreatePost',
  type: PostType,
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString)
    },
    text: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve: async (root, { title, text }, { req }) => {
    checkLoggedIn(req)

    const post = new Post({
      author: req.user.id,
      title,
      text
    })

    await post.save()

    return post.toObject()
  }
}
