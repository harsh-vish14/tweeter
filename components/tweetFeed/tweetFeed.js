import classes from "./tweetFeed.module.scss";
import Link from "next/link";
import TweetHeader from "./tweetHeader";
import TweetBody from "./tweetBody";
import TweetFooter from "./tweetFooter";
import { useState } from "react";
const TweetFeed = ({
  tweetBody,
  tweetHeader,
  tweetId,
  likesdata,
  retweetdata,
  isComment,
  isCommentBox = false,
}) => {
  const [like, setLike] = useState(likesdata);
  const [retweet, setRetweet] = useState(retweetdata);

  // const tweetHeader = {
  //   authorImage: tweet.authorDetails[0].authorImage,
  //   authorName: tweet.authorDetails[0].authorName,
  //   dateAndTime: tweet.dateAndTime,
  //   authorId: tweet.authorDetails[0]._id,
  // };
  // const tweetBody = {
  //   tweetMessage: tweet.tweetMessage,
  //   tweetImage: tweet.tweetImage,
  // };
  const tweetLink = `/tweet/${tweetId}`;
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
      {isComment ? (
        <TweetBody tweetBody={tweetBody} />
      ) : (
        <Link href={tweetLink}>
          <a>
            <TweetBody tweetBody={tweetBody} />
          </a>
        </Link>
      )}
      {!isCommentBox && (
        <>
          <div
            className={classes.tweetDetails}
          >{`${like} Like ${retweet} Retweet`}</div>
          <TweetFooter
            url={tweetLink}
            tweetId={tweetId}
            likeAdd={likeAdd}
            retweetAdd={retweetAdd}
          />
        </>
      )}
    </div>
  );
};

export default TweetFeed;
