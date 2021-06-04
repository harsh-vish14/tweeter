import Layout from "../components/layout/Layout";
import { Fragment } from "react";
import { Provider } from "next-auth/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import { TweetsDetailsContextProvider } from "../store/tweetsDetails";

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      session={pageProps.session}
      options={
        {
          // clientMaxAge: 1200, // Re-fetch session if cache is older than 60 seconds
          // keepAlive: 5 * 60, // Send keepAlive message every 5 minutes
        }
      }
    >
      <TweetsDetailsContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </TweetsDetailsContextProvider>
    </Provider>
  );
}

export default MyApp;
