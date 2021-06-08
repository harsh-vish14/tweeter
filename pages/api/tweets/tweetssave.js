import { connectDB, db } from "../../../lib/dbConnect";
import firebase from "firebase";
const handler = async (req, res) => {
  if (req.method === "POST") {
    const { Message, Image, userId, dateAndTime } = req.body;
    if (!Message || !userId) {
      res.status(422).json({ err: "Invalid Response" });
      return;
    }

    const user = await db.collection("users").doc(userId).get();
    if (!user.exists) {
      res.status(422).json({ err: "User not found" });
    }
    // console.log(Message, Image, userId, dateAndTime);
    const date = new Date();
    const tweet = await db.collection("tweets").add({
      tweetMessage: Message,
      tweetImage: Image,
      authorId: user.id,
      dateAndTime: date.toISOString(),
      comments: [],
    });
    await db
      .collection("users")
      .doc(userId)
      .update({
        authorTweet: firebase.firestore.FieldValue.arrayUnion(tweet.id),
      });

    res.status(200).json({ message: "Added Tweet successfully" });
  }
};

export default handler;
