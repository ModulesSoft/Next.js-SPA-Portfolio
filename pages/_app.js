import React from "react";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import "styles/fonts/yekan/yekan-font.css";
import PageChange from "components/PageChange/PageChange";
import { SWRConfig } from "swr";
import { LanguageProvider } from "lib/language";

Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
  document.body.classList.remove("body-page-transition");
});

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
          {/* <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"></script> */}
        </Head>
        <SWRConfig
        // value={{
        //   fetcher: fetchAPI,
        //   onError: (err) => {
        //     console.error(err);
        //   },
        // }}
        >
          <LanguageProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LanguageProvider>
        </SWRConfig>
      </React.Fragment >
    );
  }
}
