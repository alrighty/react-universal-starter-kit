import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'
import AuthType from './AuthType'
import { allPosts } from '../queries'

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
    ownPosts: allPosts
  })
})
