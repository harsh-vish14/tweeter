import HomePage from "../components/Home/HomePage";
import { getSession, useSession } from "next-auth/client";
import { useEffect, useState, useRef } from "react";

const saveTweet = async (tweetData, useremail, dateAndTime) => {
  const tweetsData = {
    ...tweetData,
    useremail,
    dateAndTime,
  };
  // console.log(tweetsData);
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

export default function Home({ tweets }) {
  const [session, loading] = useSession();
  const [tweetsData, setTweetsData] = useState(tweets);
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
  const res = await fetch("http://localhost:3000/api/tweets/alltweets");
  const data = await res.json();
  const tweets = data;
  return {
    props: { tweets },
  };
};
