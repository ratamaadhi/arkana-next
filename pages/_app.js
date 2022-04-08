import App from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { GlobalContext } from "../appContext/store";
import { fetchAPI } from "../lib/api";
import { getStrapiMedia } from "../lib/media";
import appReducer from "../appContext/appReducer";
import { useReducer } from "react";

function MyApp({ Component, pageProps }) {
  const { global } = pageProps;

  const [state, dispatch] = useReducer(appReducer);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no"
        ></meta>
        <link rel="icon" href={getStrapiMedia(global.favicon)} />
      </Head>
      <GlobalContext.Provider value={{ ...global, state, dispatch }}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  );
}

MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx);
  // Fetch global site settings from Strapi
  const global = await fetchAPI("/global");
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global } };
};

export default MyApp;
