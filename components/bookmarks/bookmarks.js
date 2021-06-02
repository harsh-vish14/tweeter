import TweetFeed from "../tweetFeed/tweetFeed";
import classes from "./bookmark.module.scss";
const BookmarkPage = ({ tweets }) => {
  return (
    <div className={classes.bookmark}>
      {tweets.map((tweet) => {
        return <TweetFeed key={tweet._id} tweet={tweet} />;
      })}
    </div>
  );
};

export default BookmarkPage;
