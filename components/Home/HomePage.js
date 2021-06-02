import InputBox from "./input/input";
import classes from "./home.module.scss";
import TweetFeed from "../tweetFeed/tweetFeed";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
import SmallLoading from "../small-loading/smallLoading";
const HomePage = ({ tweets, sendTweethandeler }) => {
  const [showSmallLoader, setShowSmallLoader] = useState(false);
  const [session, loading] = useSession();

  useEffect(() => {
    console.log(tweets);
  }, [tweets]);
  const submitTweetHandler = async (tweetData) => {
    setShowSmallLoader(true);
    const date = new Date();
    await sendTweethandeler(tweetData, session.user.email, date.toISOString());
    console.log("tweets Getted successfully");
    setShowSmallLoader(false);
  };

  return (
    <div className={classes.home}>
      <InputBox submitTweetHandler={submitTweetHandler} />
      <div style={{ display: showSmallLoader ? "" : "none" }}>
        <SmallLoading />
      </div>
      {tweets.map((tweet) => {
        return <TweetFeed key={tweet._id} tweet={tweet} />;
      })}
    </div>
  );
};

export default HomePage;
