import { FiMessageSquare, FiBookmark, FiHeart } from "react-icons/fi";
import { MdAutorenew } from "react-icons/md";
import Link from "next/link";
import classes from "./tweetFeed.module.scss";

const TweetFooter = ({ url }) => {
  // const [message,setMessage]= useState
  return (
    <div className={classes.tweetFooter}>
      <Link href={url}>
        <a>
          <div className={`${classes.footerbtn} ${classes.message}`}>
            <FiMessageSquare /> Comment
          </div>
        </a>
      </Link>
      <div className={`${classes.footerbtn} ${classes.retweet}`}>
        <MdAutorenew /> Retweet
      </div>
      <div className={`${classes.footerbtn} ${classes.like}`}>
        <FiHeart /> Like
      </div>
      <div className={`${classes.footerbtn} ${classes.Bookmark}`}>
        <FiBookmark /> Bookmark
      </div>
    </div>
  );
};

export default TweetFooter;
