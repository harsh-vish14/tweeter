import InputBox from "./input/input";
import classes from "./home.module.scss";
import TweetFeed from "../tweetFeed/tweetFeed";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/client";
const HomePage = ({ tweets, sendTweethandeler }) => {
  // const [tweetsData, setTweetsData] = useState(tweets);
  const [session, loading] = useSession();
  // console.log(tweetsData);
  useEffect(() => {
    console.log(tweets);
  }, [tweets]);
  const submitTweetHandler = async (tweetData) => {
    const date = new Date();
    sendTweethandeler(tweetData, session.user.email, date.toISOString());
  };

  return (
    <div className={classes.home}>
      <InputBox submitTweetHandler={submitTweetHandler} />
      {tweets.map((tweet) => {
        return <TweetFeed key={tweet._id} tweet={tweet} />;
      })}
    </div>
  );
};

export default HomePage;
