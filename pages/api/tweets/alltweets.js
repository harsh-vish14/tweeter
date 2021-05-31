import { connectDB } from "../../../lib/dbConnect";

const getUserdata = async (userId) => {
  const client = await connectDB();
  const db = client.db();
  const usersdb = await db.collection("users");
  const data = await usersdb.findOne({ _id: userId });
  return {
    authorName: data.authorName,
    authorImage: data.authorImage,
  };
};

const handler = async (req, res) => {
  if (req.method === "GET") {
    //   {
    //   _id: "asns23djasnd",
    //   authorName: "John",
    //   authorImage:
    //     "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    //   date: "2021-3-10",
    //   time: "10:30",
    //   tweetImage:
    //     "https://images.unsplash.com/photo-1622016199677-992cb96c2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    //   tweetMessage: "This is sample text for some tweets in",
    // },
    const client = await connectDB();
    const db = client.db();
    const tweetsdb = await db.collection("tweets");
    const myCursortweet = tweetsdb.find();
    const tweetsArray = await myCursortweet.toArray();

    const myTweets = await tweetsArray;
    const usersdb = await db.collection("users");
    const tweets = [];
    for (let i = 0; i < myTweets.length; i++) {
      const data = await usersdb.findOne({ _id: myTweets[i].authorId });
      const result = {
        _id: myTweets[i]._id,
        tweetImage: myTweets[i].tweetImage,
        tweetMessage: myTweets[i].tweetMessage,
        dateAndTime: myTweets[i].dateAndTime,
        authorName: data.authorName,
        authorImage: data.authorImage,
      };
      tweets.push(result);
    }
    tweets.reverse();
    // console.log(tweets);
    res.status(200).json(tweets);
  }
};

export default handler;
