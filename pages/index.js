import HomePage from "../components/Home/HomePage";
import { getSession, useSession } from "next-auth/client";
import { useContext, useEffect, useState } from "react";
import Loading from "../components/loading/loading";
import { tweetsDetails } from "../store/tweetsDetails";

const saveTweet = async (tweetData, useremail, dateAndTime) => {
  const tweetsData = {
    ...tweetData,
    useremail,
    dateAndTime,
  };
  const res = await fetch("/api/tweets/tweetssave", {
    method: "POST",
    body: JSON.stringify(tweetsData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return { ok: false };
  }
  return { ok: true };
};

const fetchAllData = async () => {
  const res = await fetch("/api/tweets");
  const data = await res.json();
  const tweets = data;
  return tweets;
};

export default function Home() {
  const tweetsContext = useContext(tweetsDetails);
  const [session, loading] = useSession();
  const [loadingData, setLoadingData] = useState(true);
  useEffect(async () => {
    if (tweetsContext.tweets.length > 0) {
      setLoadingData(false);
    }
    const tweets = await fetchAllData();
    tweetsContext.setTweetsData(tweets);
    setLoadingData(false);
  }, [loading]);

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
