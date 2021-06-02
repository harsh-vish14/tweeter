import classes from "./tweetFeed.module.scss";
import Link from "next/link";
import TweetHeader from "./tweetHeader";
import TweetBody from "./tweetBody";
import TweetFooter from "./tweetFooter";
import { useState } from "react";
const TweetFeed = ({ tweet }) => {
  const [like, setLike] = useState(tweet.like || 0);
  const [retweet, setRetweet] = useState(tweet.retweet || 0);
  const tweetHeader = {
    authorImage: tweet.authorDetails[0].authorImage,
    authorName: tweet.authorDetails[0].authorName,
    dateAndTime: tweet.dateAndTime,
    authorId: tweet.authorDetails[0]._id,
  };
  const tweetBody = {
    tweetMessage: tweet.tweetMessage,
    tweetImage: tweet.tweetImage,
  };
  const tweetLink = `/comment/${tweet._id}`;
  const likeAdd = () => {
    console.log("like-clicked");
    setLike((preve) => preve + 1);
  };
  const retweetAdd = () => {
    console.log("retweet-clicked");
    setRetweet((preve) => preve + 1);
  };
  return (
    <div className={classes.tweet}>
      <TweetHeader tweetHeader={tweetHeader} />
      <Link href={tweetLink}>
        <a>
          <TweetBody tweetBody={tweetBody} />
        </a>
      </Link>
      <div
        className={classes.tweetDetails}
      >{`${like} Like ${retweet} Retweet`}</div>
      <TweetFooter
        url={tweetLink}
        tweetId={tweet._id}
        likeAdd={likeAdd}
        retweetAdd={retweetAdd}
      />
    </div>
  );
};

export default TweetFeed;
