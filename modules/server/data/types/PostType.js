import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'
import UserType from './UserType'
import { User } from '../models'

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
    }
  })
})
