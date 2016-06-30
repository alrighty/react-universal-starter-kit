import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from 'server/data/schema'
import config from 'config'

const router = express.Router() // eslint-disable-line new-cap

router.use(graphqlHTTP(req => ({
  graphiql: config.graphql.ide,
  context: { req },
  pretty: true,
  schema
})))

export default router
