import invariant from 'invariant'

/*
 * Check the request if the user is authenticated.
 * Return an error message if not, otherwise keep going
 */
export default function ensureLoggedIn(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    res.status(401).send({
      message: 'You\'re not logged in'
    })
  } else {
    next()
  }
}

export function checkLoggedIn(req) {
  return invariant(
    !req.isAuthenticated || !req.isAuthenticated(),
    'You\'re not logged in'
  )
}
