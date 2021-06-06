import Indicator from "../indicator/indicator";
import { FiStar } from "react-icons/fi";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import classes from "./auth.module.scss";
const Login = () => {
  const router = useRouter();
  const email = useRef();
  const password = useRef();
  const [showIndicator, setShowIndicator] = useState(false);
  const [bannerData, setbannerData] = useState({
    status: "",
    message: "Loading....",
  });

  const handelSubmit = async (e) => {
    e.preventDefault();
    const currentEmail = email.current.value;
    const currentPassword = password.current.value;
    console.log(typeof currentPassword);
    setShowIndicator(true);
    setbannerData({
      status: "",
      message: "Loading....",
    });
    const result = await signIn("credentials", {
      redirect: false,
      email: currentEmail,
      password: currentPassword,
    });
    if (!result.error) {
      router.push("/", undefined, { shallow: true });
      setbannerData({
        status: "success",
        message: "logged in successfully!",
      });
      return;
    }
    setbannerData({
      status: "error",
      message: result.error,
    });
  };
  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={handelSubmit}>
        <div className={classes.control}>
          <label htmlFor="email">
            Your Email{" "}
            <span className="imp">
              <FiStar />
            </span>
          </label>
          <input ref={email} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">
            Your Password
            <span className="imp">
              <FiStar />
            </span>
          </label>
          <input ref={password} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
      <Link href="/auth/sigin">Create new account</Link>
      {showIndicator && (
        <Indicator status={bannerData.status} message={bannerData.message} />
      )}
    </section>
  );
};

export default Login;
