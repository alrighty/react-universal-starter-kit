import { normalize } from 'normalizr'

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API')

export default options => {
  const { fetch, endpoint = '/api/graphql' } = options

  if (!fetch) {
    throw new Error('Custom fetch method is not specified.')
  }

  function callGraphQLApi(query, variables, parseResponse) {
    return fetch(endpoint, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        query,
        variables
      })
    }).then(({ ok, jsonData }) => {
      if (!ok) {
        return Promise.reject(jsonData)
      }
      if (jsonData.errors) {
        return Promise.reject(jsonData.errors)
      }
      return parseResponse(jsonData.data)
    })
  }

  return store => next => action => { // eslint-disable-line no-unused-vars
    const callAPI = action[CALL_API]
    if (typeof callAPI === 'undefined') {
      return next(action)
    }

    const { types, query, variables, schema, formatter = (data) => data } = callAPI

    if (typeof query !== 'string') {
      throw new Error('Specify a string graphql query.')
    }
    if (typeof endpoint !== 'string') {
      throw new Error('Specify a string endpoint URL.')
    }
    if (!schema && !formatter) {
      throw new Error('Specify one of the exported Schemas or response formatter function')
    }
    if (!types.every(type => typeof type === 'string')) {
      throw new Error('Expected action types to be strings.')
    }

    function parseResponse(data) {
      if (!schema) {
        return formatter(data)
      }
      return normalize(data, schema)
    }

    function actionWith(data) {
      const finalAction = Object.assign({}, action, data)
      delete finalAction[CALL_API]
      return finalAction
    }

    const [requestType, successType, failureType] = types
    next(actionWith({ type: requestType }))

    return callGraphQLApi(query, variables, parseResponse).then(
      response => next(actionWith({
        payload: response,
        type: successType
      })),
      error => next(actionWith({
        type: failureType,
        error: error || 'Something bad happened'
      }))
    )
  }
}
