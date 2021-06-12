import { useSession } from "next-auth/client";
import Head from "next/head";
import { Fragment } from "react";
import Navbar from "./navabar/navbar";

const Layout = (props) => {
  const [session, loading] = useSession();
  return (
    <Fragment>
      <Head>
        <title>Tweeter</title>
        <link rel="icon" type="image/png" href="/logos/tweeter-small.svg" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          name="description"
          content="This is user friendly twitter clone made using next js and react js"
        ></meta>
      </Head>
      {!loading && <Navbar session={session} />}
      <div style={{ marginTop: "78px" }}>
        <main>{props.children}</main>
      </div>
    </Fragment>
  );
};

export default Layout;
