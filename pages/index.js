import HomePage from "../components/Home/HomePage";
import { getSession, useSession } from "next-auth/client";
import { useEffect, useState, useRef } from "react";

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
  const res = await fetch("/api/tweets/alltweets");
  const data = await res.json();
  const tweets = data;
  return tweets;
};
export default function Home() {
  const [session, loading] = useSession();
  const [tweetsData, setTweetsData] = useState([]);
  console.log(session);

  useEffect(async () => {
    const tweets = await fetchAllData();
    setTweetsData(tweets);
  }, []);
  const sendTweethandeler = async (tweetData, useremail, dateAndTime) => {
    const result = await saveTweet(tweetData, useremail, dateAndTime);

    if (result.ok) {
      const tweetdata = await fetchAllData();
      setTweetsData(tweetdata);
    }

    return result;
  };

  return <HomePage tweets={tweetsData} sendTweethandeler={sendTweethandeler} />;
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
