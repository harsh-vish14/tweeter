// import { connectDB } from "./dbConnect";

export const saveTweet = async (tweetData, useremail, dateAndTime) => {
  const tweetsData = {
    ...tweetData,
    useremail,
    dateAndTime,
  };
  // console.log(tweetsData);
  const res = await fetch("/api/tweets/saveTweet", {
    method: "POST",
    body: JSON.stringify(tweetsData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    console.log("error");
    console.log(data);
    return;
  }
  console.log("saved");
  console.log(data);
};
