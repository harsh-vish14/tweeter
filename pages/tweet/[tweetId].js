import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import CommentInput from "../../components/comment-input/input";
import Loading from "../../components/loading/loading";
import TweetFeed from "../../components/tweetFeed/tweetFeed";
import { getTweetById, setCommentData } from "../../lib/gettingandsetting";
import classes from "../../components/comment-input/comment.module.scss";
import Comments from "../../components/comment/comment";
import Head from "next/head";
const CommentDetails = (props) => {
  const [tweet, setTweet] = useState(null);
  const [tweetComments, setTweetComments] = useState([]);
  useEffect(async () => {
    const result = await getTweetById(props.id);
    if (result.status != "error") {
      setTweet(result.data);

      setTweetComments(result.data.comments);
    }
  }, [props.id]);
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
  const submitCommentHandler = async (commentData) => {
    const date = new Date();
    setTweetComments((preve) => {
      return [
        {
          userDetails: {
            authorName: props.session.user.username,
            authorImage: props.session.user.image.userImage,
          },
          authorId: props.session.user.name,
          message: commentData.message,
          dateAndTime: date.toISOString(),
        },
        ...preve,
      ];
    });
    const result = await setCommentData(commentData);
  };
  return (
    <>
      <Head>
        <title>
          {tweetHeader.authorName} tweeted: {tweetBody.tweetMessage}{" "}
        </title>
      </Head>
      <div className={classes.tweetsId}>
        <TweetFeed
          tweetBody={tweetBody}
          tweetHeader={tweetHeader}
          tweetId={props.id}
          likesdata={tweet.like || 0}
          retweetdata={tweet.retweet || 0}
          isComment="true"
        />
        <CommentInput
          session={props.session}
          tweetId={props.id}
          submitCommentHandler={submitCommentHandler}
        />

        {tweetComments.length != 0 ? (
          tweetComments.map((comment) => {
            return <Comments commentData={comment} />;
          })
        ) : (
          <div style={{ height: "200px" }}></div>
        )}
      </div>
    </>
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
