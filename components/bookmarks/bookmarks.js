import TweetFeed from "../tweetFeed/tweetFeed";
import classes from "./bookmark.module.scss";
const BookmarkPage = ({ tweets }) => {
  return (
    <div className={classes.bookmark}>
      {tweets &&
        tweets.map((tweet) => {
          const tweetHeader = {
            authorImage: tweet.userDetails.authorImage,
            authorName: tweet.userDetails.authorName,
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

export default BookmarkPage;
