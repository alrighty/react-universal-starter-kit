import { createFetch, base, accept, parseJSON, onResponse } from 'http-client'
import { cookieJar } from 'http-client-cookie-jar'
import { Cookie, CookieJar } from 'tough-cookie'
import config from 'config'

const { host, port } = config.server

const pushCookiesInJar = (jar, url, cookies) => {
  Object.keys(cookies).forEach((name) => {
    const cookie = new Cookie({
      key: name,
      value: cookies[name]
    })
    jar.setCookieSync(cookie, url)
  })
}

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

export default function createServerFetch({ cookies = {} }) {
  const url = `http://${host}:${port}`
  const jar = new CookieJar()

  pushCookiesInJar(jar, url, cookies)

  return createFetch(
    base(url),
    accept('application/json'),
    cookieJar(jar),
    parseJSON(),
    catchError()
  )
}
