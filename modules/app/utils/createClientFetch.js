import { createFetch, init, accept, parseJSON } from 'http-client'

export default function createClientFetch() {
  return createFetch(
    init('credentials', 'include'),
    accept('application/json'),
    parseJSON()
  )
}
