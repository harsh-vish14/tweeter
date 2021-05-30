import classes from "./tweetFeed.module.scss";
import Image from "next/image";
const TweetBody = ({ tweetBody }) => {
  return (
    <div>
      <div className={classes.tweetMessage}>{tweetBody.tweetMessage}</div>
      {tweetBody.tweetImage && (
        <div className={classes.tweetImage}>
          <Image
            src={tweetBody.tweetImage}
            alt=""
            height={200}
            width={300}
            layout="responsive"
          />
        </div>
      )}
    </div>
  );
};

export default TweetBody;
