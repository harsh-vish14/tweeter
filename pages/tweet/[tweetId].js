import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import CommentInput from "../../components/comment-input/input";
import Loading from "../../components/loading/loading";
import TweetFeed from "../../components/tweetFeed/tweetFeed";
import { getTweetById } from "../../lib/gettingandsetting";
const CommentDetails = (props) => {
  // console.log(router.query.commentId);

  const [tweet, setTweet] = useState(null);
  useEffect(async () => {
    const result = await getTweetById(props.id);
    if (result.status != "error") {
      setTweet(result.data);
      console.log(result);
    }
  }, []);
  if (!tweet) {
    return <Loading />;
  }
  const tweetHeader = {
    authorImage: tweet.authorDetails.authorImage,
    authorName: tweet.authorDetails.authorName,
    dateAndTime: tweet.dateAndTime,
    authorId: tweet.authorId,
  };
  const tweetBody = {
    tweetMessage: tweet.tweetMessage,
    tweetImage: tweet.tweetImage,
  };
  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <TweetFeed
        tweetBody={tweetBody}
        tweetHeader={tweetHeader}
        tweetId={props.id}
        likesdata={tweet.like || 0}
        retweetdata={tweet.retweet || 0}
        isComment="true"
      />
      <CommentInput session={props.session} />
      {tweet.comments.length > 0 ? (
        tweet.comments.map((comment) => {
          console.log(comment);
        })
      ) : (
        <div style={{ height: "200px" }}></div>
      )}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session: session,
      id: context.query.tweetId,
    },
  };
};

export default CommentDetails;
