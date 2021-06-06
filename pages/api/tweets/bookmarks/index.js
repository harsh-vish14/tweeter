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
    const id = req.body.id;
    const client = await connectDB();
    const db = client.db();
    const userdb = await db.collection("users");
    // const tweetsdb = await db.collection("tweet1s");
    const user = await userdb.findOne({ _id: ObjectId(id) });
    console.log(user);
    if (!user) {
      res.status(422).json({ err: "User not found" });
      return;
    }
    const bookmarks = await userdb
      .aggregate([
        { $match: { _id: ObjectId(id) } },
        { $unwind: "$bookmarks" },
        {
          $lookup: {
            from: "tweets",
            foreignField: "_id",
            localField: "bookmarks",
            as: "tweetsData",
          },
        },
        { $unwind: "$tweetsData" },
        {
          $project: {
            _id: 1,
            authorName: 1,
            authorImage: 1,
            tweetsData: 1,
          },
        },
      ])
      .toArray();

    for (let i = 0; i < bookmarks.length; i++) {
      if (user._id != bookmarks[i].tweetsData.authorId) {
        const userfound = await userdb.findOne({
          _id: ObjectId(bookmarks[i].tweetsData.authorId),
        });
        // console.log();
        bookmarks[i]._id = userfound._id;
        bookmarks[i].authorName = userfound.authorName;
        bookmarks[i].authorImage = userfound.authorImage;
      }
    }
    res.status(200).json(bookmarks);
  }
};

export default handler;
