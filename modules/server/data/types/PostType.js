import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'
import UserType from './UserType'
import { User } from '../models'
import { createPaginatedList } from '../connections'

export default new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    title: {
      type: GraphQLString
    },
    text: {
      type: GraphQLString
    },
    author: {
      type: UserType,
      resolve: (post) => User.findById(post.author)
    },
    likes: createPaginatedList(
      'PostUsersLikes',
      'users',
      UserType,
      User,
      (root) => ({ likes: root.id })
    )
  })
})
