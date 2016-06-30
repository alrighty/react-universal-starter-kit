import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql'

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
    }
  })
})
