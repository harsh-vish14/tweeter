import Image from "next/image";
import ImageLabel from "../ImageLable";
import classes from "./tweetFeed.module.scss";
const TweetFeed = ({ tweet }) => {
  return (
    <div className={classes.tweet}>
      <div className={classes.tweetHeader}>
        <div className={classes.author}>
          <ImageLabel url={tweet.authorImage} />
        </div>
        <div className={classes.authorDetails}>
          <div className={classes.authorName}>{tweet.authorName}</div>
          <div className={classes.dateAndTime}>
            {`${tweet.date} ${tweet.time}`}
          </div>
        </div>
      </div>
      <div>
        <div className={classes.tweetMessage}>{tweet.tweetMessage}</div>
        <div className={classes.tweetImage}>
          <Image
            src={tweet.tweetImage}
            alt=""
            height={200}
            width={300}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
};

export default TweetFeed;
