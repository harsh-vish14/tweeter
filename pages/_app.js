import Layout from "../components/layout/Layout";
import { Fragment } from "react";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default MyApp;
