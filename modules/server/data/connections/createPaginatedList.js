import {
  GraphQLObjectType,
  GraphQLList,
  GraphQLInt
} from 'graphql'

const paginationArgs = {
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
}

function createPaginationType(typeName, fieldName, Type) {
  return new GraphQLObjectType({
    name: typeName,
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
      [fieldName]: {
        type: new GraphQLList(Type)
      }
    })
  })
}


export default function createPaginatedList(
  typeName,
  fieldName,
  Type,
  Model,
  rawQuery = {},
  transformResult = result => result
) {
  const paginationType = createPaginationType(typeName, fieldName, Type)

  return {
    type: paginationType,
    args: paginationArgs,
    resolve: async (root, args, context) => {
      let query = rawQuery

      if (typeof rawQuery === 'function') {
        query = rawQuery(root, args, context)
      }

      const options = {
        lean: true,
        page: args.page,
        limit: args.limit
      }

      if (args.offset) {
        options.offset = args.offset
      }

      const result = await Model.paginate(query, options)

      return {
        [fieldName]: transformResult(result.docs),
        page: result.page,
        pages: result.pages,
        total: result.total,
        limit: result.limit,
        offset: result.offset
      }
    }
  }
}
