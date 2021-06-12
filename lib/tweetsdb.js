export const saveTweet = async (tweetData, useremail, dateAndTime) => {
  const tweetsData = {
    ...tweetData,
    useremail,
    dateAndTime,
  };
  const res = await fetch("/api/tweets/saveTweet", {
    method: "POST",
    body: JSON.stringify(tweetsData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return { status: "error", data: data };
  }
  return { status: "success", data: data };
};
