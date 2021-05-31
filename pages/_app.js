import Layout from "../components/layout/Layout";
import { Fragment } from "react";
import { Provider } from "next-auth/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      session={pageProps.session}
      // options={{
      //   clientMaxAge: 5, // Re-fetch session if cache is older than 60 seconds
      // }}
    >
      <Fragment>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Fragment>
    </Provider>
  );
}

export default MyApp;
