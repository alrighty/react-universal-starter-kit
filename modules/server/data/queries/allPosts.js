import {
  GraphQLInt
} from 'graphql'
import { PostsType } from '../types'
import { Post } from '../models'

export default {
  name: 'AllPosts',
  type: PostsType,
  args: {
    page: {
      type: GraphQLInt,
      defaultValue: 1
    },
    limit: {
      type: GraphQLInt,
      defaultValue: 10
    },
    offset: {
      type: GraphQLInt
    }
  },
  resolve: async (root, args) => {
    const query = {}

    if (root) {
      query.author = root.id
    }

    const options = {
      lean: true,
      page: args.page,
      limit: args.limit
    }

    if (args.offset) {
      options.offset = args.offset
    }

    const result = await Post.paginate(query, options)

    return {
      posts: result.docs,
      page: result.page,
      pages: result.pages,
      total: result.total,
      limit: result.limit,
      offset: result.offset
    }
  }
}
