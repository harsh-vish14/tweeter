import Layout from "../components/layout/Layout";
import { Fragment } from "react";
import { Provider } from "next-auth/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import { TweetsDetailsContextProvider } from "../store/tweetsDetails";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <TweetsDetailsContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TweetsDetailsContextProvider>
    </Provider>
  );
}

export default MyApp;
