import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'
import AuthType from './AuthType'

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
    }
  })
})
