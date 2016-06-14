import { createFetch, base, accept, parseJSON } from 'http-client'
import { cookieJar } from 'http-client-cookie-jar'
import { Cookie, CookieJar } from 'tough-cookie'

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || '8080';

const pushCookiesInJar = (jar, url, cookies) => {
  Object.keys(cookies).forEach((name) => {
    const cookie = new Cookie({
      key: name,
      value: cookies[name]
    })
    jar.setCookieSync(cookie, url)
  })
}

export default function createServerFetch({ cookies = {} }) {
  const url = `http://${host}:${port}`
  const jar = new CookieJar()

  pushCookiesInJar(jar, url, cookies)

  return createFetch(
    base(url),
    accept('application/json'),
    cookieJar(jar),
    parseJSON()
  )
}
