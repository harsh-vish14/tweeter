import { ImSpinner5 } from "react-icons/im";
import classes from "./smallLoading.module.scss";
const SmallLoading = () => {
  return (
    <div className={classes.smallLoading}>
      <ImSpinner5 />
    </div>
  );
};

export default SmallLoading;
