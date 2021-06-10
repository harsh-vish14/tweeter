import Link from "next/link";
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
  if (months == "") {
    return "";
  }
  return months[number];
};
const timeFormatter = (isoTime) => {
  const date = new Date(isoTime);

  return `${date.getDay()} ${getMonth(
    date.getMonth()
  )} ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
};
const TweetHeader = ({ tweetHeader }) => {
  const profileUrl = `/profile/${tweetHeader.authorId}`;
  return (
    <div className={classes.tweetHeader}>
      <div className={classes.author}>
        <Link href={profileUrl}>
          <a>
            <ImageLabel url={tweetHeader.authorImage} />
          </a>
        </Link>
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
