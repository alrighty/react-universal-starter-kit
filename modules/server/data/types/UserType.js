import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'
import AuthType from './AuthType'
import { PostType } from '../types'
import { Post } from '../models'
import { createPaginatedList } from '../connections'

export default new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLID
    },
    name: {
      type: GraphQLString
    },
    github: {
      type: AuthType
    },
    ownPosts: createPaginatedList(
      'UserOwnPosts',
      'posts',
      PostType,
      Post,
      (root) => ({ author: root.id })
    ),
    likedPosts: createPaginatedList(
      'UserLikedPosts',
      'posts',
      PostType,
      Post,
      (root) => ({ _id: { $in: root.likes } })
    )
  })
})
