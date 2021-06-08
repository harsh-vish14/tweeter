import { ObjectId } from "mongodb";
import { connectDB, db } from "../../../../lib/dbConnect";

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
    const userDB = await db.collection("users");
    const tweetDB = await db.collection("tweets");

    const user = await userDB.doc(id).get();

    if (!user.exists) {
      res.status(422).json({ err: "User not found" });
      return;
    }
    const bookmarks = [];
    for (let i = 0; i < user.data().bookmarks.length; i++) {
      const snapshot = await tweetDB.doc(user.data().bookmarks[i]).get();
      const current_user = await userDB.doc(snapshot.data().authorId).get();
      bookmarks.push({
        _id: user.data().bookmarks[i],
        ...snapshot.data(),
        userDetails: {
          authorName: current_user.data().authorName,
          authorImage: current_user.data().authorImage,
        },
      });
    }
    // const bookmarks = await userdb
    //   .aggregate([
    //     { $match: { _id: ObjectId(id) } },
    //     { $unwind: "$bookmarks" },
    //     {
    //       $lookup: {
    //         from: "tweets",
    //         foreignField: "_id",
    //         localField: "bookmarks",
    //         as: "tweetsData",
    //       },
    //     },
    //     { $unwind: "$tweetsData" },
    //     {
    //       $project: {
    //         _id: 1,
    //         authorName: 1,
    //         authorImage: 1,
    //         tweetsData: 1,
    //       },
    //     },
    //   ])
    //   .toArray();

    // for (let i = 0; i < bookmarks.length; i++) {
    //   if (user._id != bookmarks[i].tweetsData.authorId) {
    //     const userfound = await userdb.findOne({
    //       _id: ObjectId(bookmarks[i].tweetsData.authorId),
    //     });
    //     // console.log();
    //     bookmarks[i]._id = userfound._id;
    //     bookmarks[i].authorName = userfound.authorName;
    //     bookmarks[i].authorImage = userfound.authorImage;
    //   }
    // }
    res.status(200).json(bookmarks);
  }
};

export default handler;
