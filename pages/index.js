import HomePage from "../components/Home/HomePage";
import { getSession, useSession } from "next-auth/client";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/loading/loading";
import { tweetsDetails } from "../store/tweetsDetails";
import { getBookmarks, saveTweet } from "../lib/gettingandsetting";

const fetchAllData = async () => {
  const res = await fetch("/api/tweets");
  const data = await res.json();
  const tweets = data;
  return tweets;
};

export default function Home() {
  const getSessiona = getSession();
  const tweetsContext = useContext(tweetsDetails);
  const [session, loading] = useSession();
  const [loadingData, setLoadingData] = useState(true);
  useEffect(async () => {
    console.log(session);
    if (tweetsContext.tweets.length > 0) {
      setLoadingData(false);
    }
    const tweets = await fetchAllData();
    tweetsContext.setTweetsData(tweets);
    setLoadingData(false);
  }, [loading]);

  useEffect(async () => {
    if (session) {
      const bookmarks = await getBookmarks(session.user.email);
      tweetsContext.setBookmarksData(bookmarks.data);
    }
  }, [session]);
  const sendTweethandeler = async (tweetData, useremail, dateAndTime) => {
    const result = await saveTweet(tweetData, useremail, dateAndTime);

    if (result.ok) {
      const tweetdata = await fetchAllData();
      tweetsContext.setTweetsData(tweetdata);
    }

    return result;
  };
  if (loadingData) {
    return <Loading />;
  }
  return (
    <HomePage
      tweets={tweetsContext.tweets}
      sendTweethandeler={sendTweethandeler}
    />
  );
}

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
    props: {},
  };
};
