import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import NavLink from "../layout/navabar/NavLink";
import { FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import classes from "./dropdown.module.scss";
import ImageLabel from "../ImageLable";
const Dropdown = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdown = useRef(null);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showDropdown) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showDropdown]);
  return (
    <div>
      <div
        onClick={() => setShowDropdown((b) => !b)}
        className={classes.button}
      >
        <ImageLabel url="/logos/tweeter-small.svg" />
        {/* <Image
          src="/logos/tweeter-small.svg"
          alt="Logo"
          height={50}
          width={50}
        /> */}

        <FaCaretDown className={classes.icon} />
      </div>
      {showDropdown && (
        <div ref={dropdown} className={classes.dropdown}>
          <NavLink href="/profile" text="Profile" />
          <div className={classes.dropdownLinks}>
            <NavLink href="/" text="Home" />
            <NavLink href="/explore" text="explore" />
            <NavLink href="/bookmarks" text="bookmarks" />
          </div>
          <div className={classes.logout}>
            Logout <FaSignOutAlt style={{ marginLeft: "10px" }} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
