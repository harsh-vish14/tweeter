import ImageLabel from "../../ImageLable";
import { BsCardImage } from "react-icons/bs";
import classes from "./input.module.scss";
const InputBox = () => {
  return (
    <div className={classes.inputBox}>
      <div className={classes.title}>Tweet Something</div>
      <div className={classes.input}>
        <ImageLabel url="/logos/tweeter-small.svg" />
        <div style={{ width: "90%" }}>
          <textarea rows="3" maxLength="100" placeholder="What’s happening?" />
          <div className={classes.inputFooter}>
            <div className={classes.footericon}>
              <BsCardImage />
            </div>
            <div className={classes.tweetsBtn}>Tweet</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
