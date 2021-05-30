import NavLink from "./NavLink";
import Image from "next/image";
import classes from "./navbar.module.scss";
import Dropdown from "../../dropdown/dropdown";
import { Fragment } from "react";
const Navbar = () => {
  return (
    <div className={classes.navbar}>
      <div>
        <Image src="/logos/tweeter.svg" alt="Logo" height={70} width={100} />
      </div>
      <div className={classes.link}>
        <NavLink href="/" text="Home" />
        <NavLink href="/bookmarks" text="bookmarks" />
      </div>
      <Dropdown />
    </div>
  );
};

export default Navbar;
