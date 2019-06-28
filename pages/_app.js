import React from 'react'
import App, { Container } from 'next/app'
import { CookiesProvider } from 'react-cookie';

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <CookiesProvider>
        <Container>
          <Component {...pageProps} />
        </Container>
      </CookiesProvider>
    )
  }
}

export default MyApp
