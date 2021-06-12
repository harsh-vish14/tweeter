import { db } from "../../../lib/dbConnect";
import firebase from "firebase";
const handler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.auth_APIKEY
  ) {
    const { message, userId, tweetId, dateAndTime } = req.body;
    const tweetDb = db.collection("tweets").doc(tweetId);
    if (!(await tweetDb.get()).exists) {
      res.status(404).json({ err: "Tweet not found" });
      return;
    }
    if (!(await db.collection("users").doc(userId).get()).exists) {
      res.status(404).json({ err: "User not found" });
      return;
    }
    tweetDb.update({
      comments: firebase.firestore.FieldValue.arrayUnion({
        message,
        userId,
        dateAndTime,
      }),
    });
    res.status(200).json({ message: "Added comment" });
  }
};

export default handler;
