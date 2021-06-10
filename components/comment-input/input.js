import Link from "next/link";
import ImageLabel from "../ImageLable";
import classes from "./comment.module.scss";
const CommentInput = ({ session }) => {
  console.log(session);
  const profileLink = `/profile/${session.user.name}`;
  return (
    <div className={classes.userDetails}>
      <div className={classes.user}>
        <Link href={profileLink}>
          <a>
            <div>
              <ImageLabel url={session.user.image.userImage} />
            </div>
          </a>
        </Link>
        <div style={{ marginLeft: "20px", fontWeight: "900" }}>
          {session.user.username}
        </div>
      </div>
      <input type="text" placeholder="comment Something..." />
    </div>
  );
};

export default CommentInput;
