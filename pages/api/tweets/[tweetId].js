import { db } from "../../../lib/dbConnect";

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
    let CommentDetails = [];
    for (let i = 0; i < tweet.comments.length; i++) {
      const user = (
        await db.collection("users").doc(tweet.comments[i].userId).get()
      ).data();
      CommentDetails.push({
        userDetails: {
          authorName: user.authorName,
          authorImage: user.authorImage,
        },
        authorId: tweet.comments[i].userId,
        message: tweet.comments[i].message,
        dateAndTime: tweet.comments[i].dateAndTime,
      });
    }
    CommentDetails = CommentDetails.sort(function (a, b) {
      return a.dateAndTime < b.dateAndTime
        ? -1
        : a.dateAndTime > b.dateAndTime
        ? 1
        : 0;
    });
    CommentDetails.reverse();
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
