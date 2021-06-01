import { FiMessageSquare, FiBookmark, FiHeart } from "react-icons/fi";
import { MdAutorenew } from "react-icons/md";
import Link from "next/link";
import classes from "./tweetFeed.module.scss";
import { useSession } from "next-auth/client";
const sendTweetOperation = async (userEmail, tweetId, operation) => {
  const body = {
    userEmail: userEmail,
    tweetId: tweetId,
    operation,
  };

  const res = await fetch("/api/tweets/tweetsoprations", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: `${process.env.APIKEY}`,
    },
  });
  const data = await res.json();
  console.log(data);
};
const TweetFooter = ({ url, tweetId, retweetAdd, likeAdd }) => {
  // const [message,setMessage]= useState
  const [session, loading] = useSession();
  const retweetClicked = () => {
    sendTweetOperation(session.user.email, tweetId, "retweet");
    retweetAdd();
  };
  const likeClicked = () => {
    sendTweetOperation(session.user.email, tweetId, "like");
    likeAdd();
  };
  return (
    <div className={classes.tweetFooter}>
      <Link href={url}>
        <a>
          <div
            className={`${classes.footerbtn} ${classes.message}`}
            title="Comment"
          >
            <FiMessageSquare />
            <span className={classes.tweetFooterLabel}> Comment</span>
          </div>
        </a>
      </Link>
      <div
        className={`${classes.footerbtn} ${classes.retweet}`}
        title="Retweet"
        onClick={() => {
          retweetClicked();
        }}
      >
        <MdAutorenew />
        <span className={classes.tweetFooterLabel}> Retweet</span>
      </div>
      <div
        className={`${classes.footerbtn} ${classes.like}`}
        title="Like"
        onClick={() => {
          likeClicked();
        }}
      >
        <FiHeart />
        <span className={classes.tweetFooterLabel}> Like</span>
      </div>
      <div
        className={`${classes.footerbtn} ${classes.Bookmark}`}
        title="Bookmark"
        onClick={() => {
          sendTweetOperation(session.user.email, tweetId, "bookmark");
        }}
      >
        <FiBookmark />
        <span className={classes.tweetFooterLabel}> Bookmark</span>
      </div>
    </div>
  );
};

export default TweetFooter;
