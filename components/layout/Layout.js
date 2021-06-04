import { useSession } from "next-auth/client";
import { Fragment } from "react";
import Navbar from "./navabar/navbar";

const Layout = (props) => {
  const [session, loading] = useSession();
  return (
    <Fragment>
      {!loading && <Navbar session={session} />}
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
