import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} from 'graphql'
import PostType from './PostType'

export default new GraphQLObjectType({
  name: 'Posts',
  fields: () => ({
    total: {
      type: GraphQLInt
    },
    limit: {
      type: GraphQLInt
    },
    page: {
      type: GraphQLInt
    },
    pages: {
      type: GraphQLInt
    },
    offset: {
      type: GraphQLInt
    },
    posts: {
      type: new GraphQLList(PostType)
    }
  })
})
