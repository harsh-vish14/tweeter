import InputBox from "./input/input";
import classes from "./home.module.scss";
import TweetFeed from "../tweetFeed/tweetFeed";
const HomePage = ({ tweets }) => {
  return (
    <div className={classes.home}>
      <InputBox />
      {tweets.map((tweet) => {
        return <TweetFeed tweet={tweet} />;
      })}
    </div>
  );
};

export default HomePage;
