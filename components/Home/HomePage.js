import InputBox from "./input/input";
import classes from "./home.module.scss";
import TweetFeed from "../tweetFeed/tweetFeed";
import { useState } from "react";
import { useSession } from "next-auth/client";
import SmallLoading from "../small-loading/smallLoading";
const HomePage = ({ tweets, sendTweethandeler }) => {
  const [showSmallLoader, setShowSmallLoader] = useState(false);
  const [session, loading] = useSession();
  const submitTweetHandler = async (tweetData) => {
    setShowSmallLoader(true);
    const date = new Date();
    await sendTweethandeler(tweetData, session.user.name, date.toISOString());
    setShowSmallLoader(false);
  };

  return (
    <div className={classes.home}>
      <InputBox submitTweetHandler={submitTweetHandler} />
      <div style={{ display: showSmallLoader ? "" : "none" }}>
        <SmallLoading />
      </div>
      {tweets &&
        tweets.map((tweet) => {
          const tweetHeader = {
            authorImage: tweet.authorDetails.authorImage,
            authorName: tweet.authorDetails.authorName,
            dateAndTime: tweet.dateAndTime,
            authorId: tweet.authorId,
          };
          const tweetBody = {
            tweetMessage: tweet.tweetMessage,
            tweetImage: tweet.tweetImage,
          };
          return (
            <TweetFeed
              key={tweet._id}
              tweetBody={tweetBody}
              tweetHeader={tweetHeader}
              tweetId={tweet._id}
              likesdata={tweet.like || 0}
              retweetdata={tweet.retweet || 0}
            />
          );
        })}
    </div>
  );
};

export default HomePage;
