import { useRouter } from "next/router";
import Link from "next/link";
import classes from "./navlink.module.scss";
const NavLink = ({ href, text }) => {
  const router = useRouter();

  var currentStyle = router.pathname == href ? classes.active : null;
  if (router.pathname == "/profile") {
    currentStyle = classes.profileActive;
  }
  const style = `${classes.navlinks} ${currentStyle}`;
  return (
    <Link href={href}>
      <a className={style}>{text}</a>
    </Link>
  );
};

export default NavLink;
