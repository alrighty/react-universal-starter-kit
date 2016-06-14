import { normalize } from 'normalizr';
import { stringify } from 'query-string';

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = Symbol('Call API');

function fetchWithQuery(fetch, method, endpoint, data) {
  return fetch(endpoint + '?' + stringify(data), {
    type: method
  })
}

function fetchWithBody(fetch, method, endpoint, data) {
  return fetch(endpoint, {
    type: method,
    body: JSON.stringify(data)
  })
}

const requestEnum = {
  GET: (fetch, endpoint, data) => fetchWithQuery(fetch, 'GET', endpoint, data),
  PUT: (fetch, endpoint, data) => fetchWithBody(fetch, 'PUT', endpoint, data),
  POST: (fetch, endpoint, data) => fetchWithBody(fetch, 'POST', endpoint, data),
  DELETE: (fetch, endpoint, data) => fetchWithQuery(fetch, 'DELETE', endpoint, data)
};

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
// Or pass API response to formatter if schema is not specified.
function callApi(fetch, method, endpoint, data, schema, formatter) {
  // Get request by method
  const request = requestEnum[method]
  // Make request
  return request(fetch, endpoint, data)
    .then(response => {
      if (schema) {
        return normalize(response.jsonData, schema)
      } else {
        return formatter(response.jsonData)
      }
    })
}

export default options => store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { fetch } = options;

  if (!fetch) {
    throw new Error('Custom fetch method is not specified.');
  }

  let { method, endpoint } = callAPI;
  const { schema, formatter, types, data } = callAPI;


  if (!method) {
    method = 'GET';
  }
  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof method !== 'string') {
    throw new Error('Specify a string method type.');
  }
  if (!Object.keys(requestEnum).includes(method)) {
    throw new Error('Expected method type to be one of ' + Object.keys(requestEnum) + ' types.');
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema && !formatter) {
    throw new Error('Specify one of the exported Schemas or response formatter function');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(fetch, method, endpoint, data, schema, formatter).then(
    response => next(actionWith({
      payload: response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  );
};
