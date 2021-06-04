import TweetFeed from "../tweetFeed/tweetFeed";
import classes from "./bookmark.module.scss";
const BookmarkPage = ({ tweets }) => {
  return (
    <div className={classes.bookmark}>
      {tweets &&
        tweets.map((tweet) => {
          const tweetHeader = {
            authorImage: tweet.authorImage,
            authorName: tweet.authorName,
            dateAndTime: tweet.tweetsData.dateAndTime,
            authorId: tweet._id,
          };
          const tweetBody = {
            tweetMessage: tweet.tweetsData.tweetMessage,
            tweetImage: tweet.tweetsData.tweetImage,
          };

          return (
            <TweetFeed
              key={tweet.tweetsData._id}
              tweetBody={tweetBody}
              tweetHeader={tweetHeader}
              tweetId={tweet.tweetsData._id}
              likesdata={tweet.tweetsData.like || 0}
              retweetdata={tweet.tweetsData.retweet || 0}
            />
          );
        })}
    </div>
  );
};

export default BookmarkPage;
