import Link from "next/link";
import ImageLabel from "../ImageLable";
import classes from "./comment.module.scss";
import { FiSend } from "react-icons/fi";
import { useRef } from "react";
const CommentInput = ({ session, submitCommentHandler, tweetId }) => {
  const commentInput = useRef();

  const profileLink = `/profile/${session.user.name}`;
  const handlerClicked = () => {
    const value = commentInput.current.value;
    if (value) {
      const date = new Date();
      submitCommentHandler({
        message: value,
        userId: session.user.name,
        tweetId,
        dateAndTime: date.toISOString(),
      });
      commentInput.current.value = "";
    }
  };
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="comment Something..."
          ref={commentInput}
        />
        <div className={classes.sendComment} onClick={handlerClicked}>
          <FiSend />
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
