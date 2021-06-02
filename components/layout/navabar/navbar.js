import NavLink from "./NavLink";
import Image from "next/image";
import { useSession } from "next-auth/client";
import classes from "./navbar.module.scss";
import Dropdown from "../../dropdown/dropdown";
// import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [session, loading] = useSession();
  // const [userImage, setImage] = useState("/logos/tweeter.svg");
  // if (!loading && session) {
  //   setImage(session.user.image);
  // }
  return (
    <div className={classes.navbar}>
      <div>
        <Link href="/">
          <a>
            <Image
              src="/logos/tweeter.svg"
              alt="Logo"
              height={70}
              width={100}
            />
          </a>
        </Link>
      </div>
      <div className={classes.link}>
        {session && !loading ? (
          <>
            <NavLink href="/" text="Home" />
            <NavLink href="/bookmarks" text="bookmarks" />
          </>
        ) : (
          <div>
            <NavLink href="/auth/login" text="Login/SignIn" />
          </div>
        )}
      </div>
      {session && <Dropdown />}
    </div>
  );
};

export default Navbar;
