import { useEffect, useState } from "react";
import { getProfile } from "../../lib/gettingandsetting";
import ProfileHeader from "./profileHeader";
import { useRouter } from "next/router";
import Loading from "../loading/loading";
import TweetFeed from "../tweetFeed/tweetFeed";
import classes from "./profileHeader.module.scss";
const Profile = ({ id, session }) => {
  const [userTweet, setUserTweet] = useState();
  const router = useRouter();
  useEffect(async () => {
    const userData = await getProfile(id);
    setUserTweet(userData.data);
    if (userData.status === "error") {
      router.replace("/notFound", undefined, { shallow: true });
    }
  }, [session]);
  if (!userTweet) {
    return <Loading />;
  }
  return (
    <div style={{ overflow: "hidden" }}>
      <ProfileHeader user={userTweet} session={session} />
      <div className={classes.tweets}>
        {userTweet.tweetFilter &&
          userTweet.tweetFilter.map((tweet) => {
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
    </div>
  );
};

export default Profile;
