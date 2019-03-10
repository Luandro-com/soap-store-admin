import App, {Container} from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import NextSeo from 'next-seo'
import Router from 'next/router'
import NProgress from 'nprogress'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider'
import 'draft-js/dist/Draft.css'
import 'react-quill/dist/quill.snow.css' // QUILL

import getPageContext from '../lib/getPageContext'
import SEO from '../next-seo.config'
import withApolloClient from '../lib/with-apollo-client'

Router.events.on('routeChangeStart', url => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())


class Admin extends App {
  constructor(props) {
    super(props)
    this.pageContext = getPageContext()
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }

  render () {
    const { Component, pageProps, apolloClient } = this.props
    return <Container>
      <NextSeo config={SEO} />
      <ApolloProvider client={apolloClient}>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
            <Component pageContext={this.pageContext} {...pageProps} />
          </MuiThemeProvider>
        </JssProvider>
      </ApolloProvider>
    </Container>
  }
}

export default withApolloClient(Admin)
