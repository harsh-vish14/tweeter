import Link from "next/link";
import { useRef } from "react";
import classes from "./auth.module.scss";
const Login = () => {
  const email = useRef();
  const password = useRef();
  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={email} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input ref={password} type="password" id="password" required />
        </div>
        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
      <Link href="/auth/sigin">Create new account</Link>
    </section>
  );
};

export default Login;
