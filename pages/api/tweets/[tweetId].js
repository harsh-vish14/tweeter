import { ObjectId } from "mongodb";
import { connectDB, db } from "../../../lib/dbConnect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { tweetId } = req.query;
    const tweetDB = await db.collection("tweets");
    if (!(await tweetDB.doc(tweetId).get()).exists) {
      res.status(404).json({ err: "Tweet not found" });
      return;
    }
    const tweet = (await tweetDB.doc(tweetId).get()).data();
    const user = (
      await db.collection("users").doc(tweet.authorId).get()
    ).data();
    const CommentDetails = [];
    for (let i = 0; i < tweet.comments.length; i++) {
      console.log(tweet.comments[i]);
    }
    const result = {
      ...tweet,
      comments: CommentDetails,
      authorDetails: {
        authorName: user.authorName,
        authorImage: user.authorImage,
      },
    };
    res.status(200).json(result);
  }
};

export default handler;
