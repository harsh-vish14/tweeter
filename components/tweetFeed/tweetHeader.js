import ImageLabel from "../ImageLable";
import classes from "./tweetFeed.module.scss";
const TweetHeader = ({ tweetHeader }) => {
  return (
    <div className={classes.tweetHeader}>
      <div className={classes.author}>
        <ImageLabel url={tweetHeader.authorImage} />
      </div>
      <div className={classes.authorDetails}>
        <div className={classes.authorName}>{tweetHeader.authorName}</div>
        <div className={classes.dateAndTime}>
          {`${tweetHeader.date} ${tweetHeader.time}`}
        </div>
      </div>
    </div>
  );
};

export default TweetHeader;
