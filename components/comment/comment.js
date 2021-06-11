import TweetFeed from "../tweetFeed/tweetFeed";

const Comments = ({ commentData }) => {
  //   console.log(commentData.userDetails);
  const tweetHeader = {
    authorImage: commentData.userDetails.authorImage,
    authorName: commentData.userDetails.authorName,
    dateAndTime: commentData.dateAndTime,
    authorId: commentData.authorId,
  };
  const tweetBody = {
    tweetMessage: commentData.message,
    tweetImage: "",
  };
  return (
    <div>
      <TweetFeed
        tweetBody={tweetBody}
        tweetHeader={tweetHeader}
        tweetId={""}
        likesdata={0}
        retweetdata={0}
        isComment="true"
        isCommentBox="true"
      />
    </div>
  );
};

export default Comments;
