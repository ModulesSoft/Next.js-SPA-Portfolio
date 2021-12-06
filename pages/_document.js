import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <body className="text-blueGray-700 antialiased">
          <div id="page-transition"></div>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}