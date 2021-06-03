import { connectDB } from "../../../lib/dbConnect";
import { ObjectId } from "mongodb";

const userProfile = async (req, res) => {
  if (req.method === "GET") {
    const { profileId } = req.query;
    console.log(profileId);
    const client = await connectDB();
    const db = client.db();
    const userdb = await db.collection("users");
    const user = await userdb.findOne({ _id: ObjectId(profileId) });
    if (!user) {
      client.close();
      res.status(422).json({ err: "User not found" });
      return;
    }
    const profileDetails = await userdb
      .aggregate([
        { $unwind: "$authorTweets" },
        {
          $lookup: {
            from: "tweets",
            localField: "authorTweets",
            foreignField: "_id",
            as: "userTweets",
          },
        },
        { $unwind: "$userTweets" },
        {
          $group: {
            _id: "$_id",
            authorName: { $first: "$authorName" },
            userTweets: { $push: "$userTweets" },
          },
        },
      ])
      .toArray();
    console.log(profileDetails);
    res.status(200).json(profileDetails);
  }
};

export default userProfile;
