import React from "react";
import App from "next/app";
import Head from "next/head";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import "styles/fonts/yekan/yekan-font.css";

export default class MyApp extends App {
  
  render() {
    const { Component, pageProps } = this.props;

    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <React.Fragment>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
          />
          <title>Azarshiga</title>
          {/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> */}
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </React.Fragment>
    );
  }
}
