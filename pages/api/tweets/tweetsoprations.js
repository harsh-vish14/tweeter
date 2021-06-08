import { connectDB, db } from "../../../lib/dbConnect";
import { ObjectId } from "mongodb";
import firebase from "firebase";
const handler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.APIKEY
  ) {
    const { userId, tweetId, operation } = req.body;
    console.log(userId, tweetId, operation);
    if (
      !operation ||
      !operation == "retweet" ||
      !operation == "like" ||
      !operation == "bookmark"
    ) {
      res.status(422).json({ err: "Invalid tweet operation" });
      return;
    }
    const userDB = await db.collection("users");
    const tweetDB = await db.collection("tweets");

    const user = await userDB.doc(userId).get();
    if (!user.exists) {
      res.status(422).json({ err: "User not found" });
      return;
    }

    const tweet = await tweetDB.doc(tweetId).get();
    if (!tweet.exists) {
      res.status(422).json({ err: "tweet not found" });
      return;
    }
    switch (operation) {
      case "retweet":
        await tweetDB.doc(tweetId).update({
          retweet: firebase.firestore.FieldValue.increment(1),
        });
        await userDB.doc(userId).update({
          authorTweet: firebase.firestore.FieldValue.arrayUnion(tweetId),
        });
        break;

      case "like":
        await tweetDB.doc(tweetId).update({
          like: firebase.firestore.FieldValue.increment(1),
        });
        break;

      case "bookmark":
        await userDB.doc(userId).update({
          bookmarks: firebase.firestore.FieldValue.arrayUnion(tweetId),
        });
        break;
    }

    res.status(201).json({ message: "success updated" });
  }
};

export default handler;
