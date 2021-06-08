import { db } from "../../../lib/dbConnect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const tweetsData = [];
    const tweets = [];
    await db
      .collection("tweets")
      .get()
      .then((snapshot) => {
        snapshot.forEach((tweet) => {
          tweets.push({ _id: tweet.id, ...tweet.data() });
        });
      });
    for (var i = 0; i < tweets.length; i++) {
      // console.log(tweets[i]);
      await db
        .collection("users")
        .doc(tweets[i].authorId)
        .get()
        .then((userSnapshot) => {
          tweetsData.push({
            ...tweets[i],
            authorDetails: {
              authorName: userSnapshot.data().authorName,
              authorImage: userSnapshot.data().authorImage,
            },
          });
        });
    }
    tweetsData.reverse();
    res.status(200).json(tweetsData);
  }
};

export default handler;
