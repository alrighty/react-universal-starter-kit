import { createFetch, init, accept, parseJSON, onResponse } from 'http-client'

const catchError = () => onResponse(response => {
  if (response.ok) {
    return response
  }
  const { jsonData = {} } = response
  throw new Error(
    jsonData.message ||
    response.statusText
  )
})

export default function createClientFetch() {
  return createFetch(
    init('credentials', 'include'),
    accept('application/json'),
    parseJSON(),
    catchError()
  )
}
