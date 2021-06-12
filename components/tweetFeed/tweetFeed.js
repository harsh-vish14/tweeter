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
  const tweetLink = `/tweet/${tweetId}`;
  const likeAdd = () => {
    setLike((preve) => preve + 1);
  };
  const retweetAdd = () => {
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
