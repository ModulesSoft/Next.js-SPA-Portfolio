import React from "react";
import App from "next/app";
import Head from "next/head";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import "styles/fonts/yekan/yekan-font.css";
import { LanguageContext,languages } from "lib/language";

export default class MyApp extends App {
  constructor(props) {
    super(props)


    this.toggleLanguage = () => {
      this.setState(state => ({
        language:
          state.language === languages[0]
            ? languages[1]
            : languages[0],
      }));
    }

    this.state = {
      language: languages[0],
      toggleLanguage: this.toggleLanguage,
    }
  }

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
          <LanguageContext.Provider value={this.state}>
            <Component {...pageProps}/>
          </LanguageContext.Provider>
        </Layout>
      </React.Fragment>
    );
  }
}
