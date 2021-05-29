import ImageLabel from "../../ImageLable";
import { BsCardImage } from "react-icons/all";
import classes from "./input.module.scss";
const InputBox = () => {
  return (
    <div className={classes.inputBox}>
      <div className={classes.title}>Tweet Something</div>
      <div className={classes.input}>
        <ImageLabel url="/logos/tweeter-small.svg" />
        <div>
          <textarea rows="5" maxLength="100" placeholder="What’s happening?" />
        </div>
        <div>
          <div>
            <BsCardImage />
          </div>
          <div>Tweet</div>
        </div>
      </div>
    </div>
  );
};

export default InputBox;
