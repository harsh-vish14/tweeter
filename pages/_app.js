import Layout from "../components/layout/Layout";
import { Provider } from "next-auth/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";
import { TweetsDetailsContextProvider } from "../store/tweetsDetails";
import Router from "next/router";
import NProgress from "nprogress";
import "../components/np.scss";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

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
