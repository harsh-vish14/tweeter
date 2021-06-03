import { ObjectId } from "mongodb";
import { connectDB } from "../../../../lib/dbConnect";

const filterCursor = async (cursor) => {
  const newtweetsArray = await cursor.toArray();
  const newmyTweets = await newtweetsArray;
  return newmyTweets;
};

const handler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.APIKEY
  ) {
    const userEmail = req.body.email;
    const client = await connectDB();
    const db = client.db();
    const userdb = await db.collection("users");
    const tweetsdb = await db.collection("tweets");
    const user = await userdb.findOne({ email: userEmail });

    if (!user) {
      res.status(422).json({ err: "User not found" });
      return;
    }
    const tweetsArray = [];
    const tweets = await tweetsdb
      .find({
        _id: { $in: user.bookmarks },
      })
      .toArray();

    for (let i = 0; i < tweets.length; i++) {
      const users = await userdb.findOne({
        _id: ObjectId(tweets[i].authorId),
      });
      tweetsArray.push({
        ...tweets[i],
        authorDetails: [
          {
            _id: users._id,
            authorName: users.authorName,
            authorImage: users.authorImage,
          },
        ],
      });
    }
    res.status(200).json(tweetsArray);
  }
};

export default handler;
