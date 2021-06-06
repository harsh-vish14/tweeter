import { connectDB } from "../../../lib/dbConnect";
import { ObjectId } from "mongodb";

const userProfile = async (req, res) => {
  if (req.method === "GET") {
    const { profileId } = req.query;
    console.log(profileId);
    const client = await connectDB();
    const db = client.db();
    const userdb = await db.collection("users");
    const tweetdb = await db.collection("tweets");
    const user = await userdb.findOne(
      { _id: ObjectId(profileId) },
      {
        projection: {
          _id: 1,
          authorName: 1,
          authorImage: 1,
          authorHeader: 1,
          authorTweets: 1,
        },
      }
    );
    if (!user) {
      client.close();
      res.status(422).json({ err: "User not found" });
      return;
    }

    const profileDetails = await tweetdb
      .aggregate([
        {
          $lookup: {
            from: "users",
            localField: "authorId",
            foreignField: "_id",
            as: "authorDetails",
          },
        },
        { $unwind: "$authorDetails" },
        {
          $project: {
            _id: 1,
            tweetMessage: 1,
            tweetImage: 1,
            authorId: 1,
            dateAndTime: 1,
            comments: 1,
            like: 1,
            retweet: 1,
            "authorDetails.authorName": 1,
            "authorDetails.authorImage": 1,
          },
        },
      ])
      .toArray();

    const stringUserAuthorTweets = user.authorTweets.map((tweetId) =>
      tweetId.toString()
    );
    delete user.authorTweets;
    // console.log(stringUserAuthorTweets);
    const tweetFilter = profileDetails
      .filter((id) => {
        return stringUserAuthorTweets.includes(id._id.toString());
      })
      .reverse();

    const finalResult = {
      ...user,
      tweetFilter,
    };

    // console.log(filteredResult);
    // console.log(user.authorTweets.includes(tweet._id));
    res.status(200).json(finalResult);
  }
};

export default userProfile;
