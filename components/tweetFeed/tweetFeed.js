import classes from "./tweetFeed.module.scss";
import Link from "next/link";
import TweetHeader from "./tweetHeader";
import TweetBody from "./tweetBody";
import TweetFooter from "./tweetFooter";
const TweetFeed = ({ tweet }) => {
  const tweetHeader = {
    authorImage: tweet.authorImage,
    authorName: tweet.authorName,
    date: tweet.date,
    time: tweet.time,
  };
  const tweetBody = {
    tweetMessage: tweet.tweetMessage,
    tweetImage: tweet.tweetImage,
  };
  const tweetLink = `/comment/${tweet._id}`;
  return (
    <div className={classes.tweet}>
      <TweetHeader tweetHeader={tweetHeader} />
      <Link href={tweetLink}>
        <a>
          <TweetBody tweetBody={tweetBody} />
        </a>
      </Link>
      <TweetFooter url={tweetLink} />
    </div>
  );
};

export default TweetFeed;
