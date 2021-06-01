import { connectDB } from "../../../lib/dbConnect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const client = await connectDB();
    const db = client.db();
    const tweetsdb = await db.collection("tweets");
    const tweets = tweetsdb.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "authorDetails",
        },
      },
    ]);
    const tweetsArray = await tweets.toArray();
    const myTweets = await tweetsArray;
    myTweets.map((tweet) => {
      delete tweet.authorDetails[0]["authorTweets"];
      delete tweet.authorDetails[0]["password"];
      delete tweet.authorDetails[0]["email"];
      // delete tweet.authorDetails[0]["email"];
      return tweet;
    });
    myTweets.reverse();
    // console.log(newTweets);
    res.status(200).json(myTweets);
  }
};

export default handler;
