import { ApolloClient, InMemoryCache } from 'apollo-boost'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import { setContext } from 'apollo-link-context'
import fetch from 'isomorphic-unfetch'
import { checkToken } from './auth'
import { resolvers, defaults } from './graphql/resolvers'
import typeDefs from './graphql/typeDefs'

let apolloClient = null
const DEV = (process.env.NODE_ENV !== 'production')

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

const uri = DEV ? 'http://localhost:4000' : process.env.API_HOST || 'http://localhost:4000'
const httpLink = createUploadLink({
  uri,
  // opts: {
  //   mode: 'no-cors',
  // },
  // credentials: DEV ? 'same-origin' : 'include',
})

const authLink = setContext((_, { headers }) => {
  let token
  // get the authentication token from local storage if it exists
  const docToken = document.getElementById('session').textContent
  if (docToken.length > 0) {
    token = JSON.parse(document.getElementById('session').textContent).periodicos_token
  }
  if (process.browser) {
    token = checkToken()
  }
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
})

function create (initialState) {
  const cache = new InMemoryCache().restore(initialState || {})
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([
      authLink.concat(httpLink)
    ]),
    cache,
    resolvers,
    typeDefs,
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors', graphQLErrors)
      console.log('networkError', networkError)
    }
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
