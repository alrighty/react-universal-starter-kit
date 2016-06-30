import invariant from 'invariant'

/*
 * Check the request if the user is authenticated.
 * Throw an error message if not, otherwise keep going
 */
export default function checkLoggedIn(req) {
  return invariant(
    req.isAuthenticated && req.isAuthenticated(),
    'You\'re not logged in'
  )
}
