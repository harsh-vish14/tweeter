import loading from "../../animation/loading.json";
import LottieAnimation from "../lottie/lottieAnimation";
import classes from "./loading.module.scss";
const Loading = () => {
  return (
    <div className={classes.loading}>
      <LottieAnimation lottie={loading} height={300} width={300} />
      <h3>Loading...</h3>
    </div>
  );
};

export default Loading;
