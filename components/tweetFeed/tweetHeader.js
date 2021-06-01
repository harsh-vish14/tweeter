import ImageLabel from "../ImageLable";
import classes from "./tweetFeed.module.scss";
const getMonth = (number) => {
  const months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  return months[number];
};
const timeFormatter = (isoTime) => {
  const date = new Date(isoTime);
  const localDate = date.to;
  const localTime = date.toLocaleTimeString();

  return `${date.getDay()} ${getMonth(
    date.getMonth()
  )} ${date.getFullYear()} at ${date.getUTCHours()}:${date.getUTCMinutes()}`;
};
const TweetHeader = ({ tweetHeader }) => {
  return (
    <div className={classes.tweetHeader}>
      <div className={classes.author}>
        <ImageLabel url={tweetHeader.authorImage} />
      </div>
      <div className={classes.authorDetails}>
        <div className={classes.authorName}>{tweetHeader.authorName}</div>
        <div className={classes.dateAndTime}>
          {timeFormatter(tweetHeader.dateAndTime)}
        </div>
      </div>
    </div>
  );
};

export default TweetHeader;