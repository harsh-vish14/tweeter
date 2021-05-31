import { connectDB } from "../../../lib/dbConnect";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { Message, Image, useremail, dateAndTime } = req.body;
    if (!Message || !useremail) {
      res.status(422).json({ err: "Invalid Response" });
      return;
    }
    const client = await connectDB();
    const db = client.db();
    const userdb = await db.collection("users");
    const user = await userdb.findOne({ email: useremail });
    if (!user) {
      res.status(422).json({ err: "User not found" });
    }

    const tweetDetails = await db.collection("tweets").insertOne({
      tweetMessage: Message,
      tweetImage: Image,
      authorId: user._id,
      dateAndTime,
      comments: [],
    });
    const tweetId = tweetDetails.insertedId;
    const updatedComments = [...user.authorTweets, tweetId];
    userdb.updateOne(
      { _id: user._id },
      { $set: { authorTweets: updatedComments } }
    );
    res.status(200).json({ message: "asjdnasjdn" });
  }
};

export default handler;
