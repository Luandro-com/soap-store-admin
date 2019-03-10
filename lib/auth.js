import Cookies from 'js-cookie'
import Router from 'next/router'

const key = 'saboaria_token'

export const logout = async (apolloClient) => {
  Cookies.remove(key)
  await apolloClient.cache.reset()
  Router.push('/')
}

export const setToken = (token) => {
  Cookies.set(key, token, { expires: 30, path: '' })
  return Router.push('/')
}

export const checkToken = () => {
  const key = Cookies.get(key)
  if (Object.keys(key).length === 0 && key.constructor === Object) {
    return null
  }
  return key.saboaria_token
}
