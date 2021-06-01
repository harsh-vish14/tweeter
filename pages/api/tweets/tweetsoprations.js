import { ObjectId } from "mongodb";
import { connectDB } from "../../../lib/dbConnect";
const handler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.APIKEY
  ) {
    const { userEmail, tweetId, operation } = req.body;
    if (
      !operation ||
      !operation == "retweet" ||
      !operation == "like" ||
      !operation == "bookmark"
    ) {
      res.status(422).json({ err: "Invalid tweet operation" });
    }
    const client = await connectDB();
    const db = client.db();
    const userdb = await db.collection("users");
    const user = await userdb.findOne({ email: userEmail });

    if (!user) {
      res.status(422).json({ err: "User not found" });
      return;
    }
    const tweetdb = await db.collection("tweets");
    const tweet = await tweetdb.findOne({
      _id: ObjectId(tweetId),
    });
    if (!tweet) {
      res.status(422).json({ err: "tweet not found" });
      return;
    }
    switch (operation) {
      case "retweet":
        userdb.updateOne(
          { _id: user._id },
          { $push: { authorTweets: ObjectId(tweetId) } }
        );
        tweetdb.updateOne({ _id: tweet._id }, { $inc: { retweet: 1 } });
        break;
      case "like":
        tweetdb.updateOne({ _id: tweet._id }, { $inc: { like: 1 } });
        break;
      case "bookmark":
        userdb.updateOne(
          { _id: user._id },
          { $addToSet: { bookmarks: ObjectId(tweetId) } }
        );
        break;
    }
    res.status(201).json({ message: "success updated" });
  }
};

export default handler;
