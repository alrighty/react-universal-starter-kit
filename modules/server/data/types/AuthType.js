import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from 'graphql'

export default new GraphQLObjectType({
  name: 'Auth',
  fields: () => ({
    id: {
      type: GraphQLInt
    },
    name: {
      type: GraphQLString
    },
    username: {
      type: GraphQLString
    },
    email: {
      type: GraphQLString
    }
  })
})
