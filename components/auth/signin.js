import Link from "next/link";
import { FiStar } from "react-icons/fi";
import Indicator from "../indicator/indicator";
import { useRef, useState } from "react";
import { useRouter } from "next/router";
import classes from "./auth.module.scss";

const signUp = async (image, name, password, email) => {
  const response = { name, email, password, image };
  const res = await fetch("/api/auth/sigin", {
    method: "POST",
    body: JSON.stringify(response),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return { status: "error", message: data.err };
  } else {
    return { status: "success", message: data.message };
  }
};
const SignIn = () => {
  const router = useRouter();
  const [showBanner, setShowBanner] = useState(false);
  const [bannerData, setbannerData] = useState({
    status: "",
    message: "Loading.....",
  });
  const email = useRef();
  const name = useRef();
  const password = useRef();
  const image = useRef();

  const SubmitForm = async (e) => {
    e.preventDefault();
    setShowBanner(true);
    setbannerData({
      status: "",
      message: "Loading.....",
    });
    const result = await signUp(
      image.current.value,
      name.current.value,
      password.current.value,
      email.current.value
    );
    setbannerData(result);
    if (result.status === "success") {
      router.push("/auth/login");
    }
  };
  return (
    <section className={classes.auth}>
      <h1>Sign In</h1>
      <form onSubmit={SubmitForm}>
        <div className={classes.control}>
          <label htmlFor="image">Your Profile Image url</label>
          <input type="text" id="image" ref={image} />
          <div style={{ color: "white" }}>
            Not have url use this 👉🏻
            <a href="https://drop-images-to-link.netlify.app/" target="_blank">
              image to url converter
            </a>
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="name">
            Your Name
            <span className="imp">
              <FiStar />
            </span>
          </label>
          <input type="name" id="name" required ref={name} />
        </div>

        <div className={classes.control}>
          <label htmlFor="email">
            Your Email
            <span className="imp">
              <FiStar />
            </span>
          </label>
          <input type="email" id="email" required ref={email} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">
            Your Password
            <span className="imp">
              <FiStar />
            </span>
          </label>
          <input type="password" id="password" required ref={password} />
        </div>
        <div className={classes.actions}>
          <button>Sign In</button>
        </div>
      </form>
      <Link href="/auth/login">Having account</Link>
      {showBanner && (
        <Indicator status={bannerData.status} message={bannerData.message} />
      )}
    </section>
  );
};

export default SignIn;
