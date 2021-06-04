import { ObjectId } from "mongodb";
import { connectDB } from "../../../lib/dbConnect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { tweetId } = req.query;
    const client = await connectDB();
    const db = client.db();
    const tweetdb = db.collection("tweets");

    const tweet = await tweetdb.findOne({ _id: ObjectId(tweetId) });

    const userDetails = await db
      .collection("users")
      .findOne(
        { _id: ObjectId(tweet.authorId) },
        { projection: { authorImage: 1, authorName: 1 } }
      );
    const result = {
      tweetDetails: tweet,
      userDetails: userDetails,
    };
    res.status(200).json(result);
  }
};

export default handler;
