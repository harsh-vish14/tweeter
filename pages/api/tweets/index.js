import { connectDB } from "../../../lib/dbConnect";

const handler = async (req, res) => {
  if (req.method === "GET") {
    var client;
    try {
      client = await connectDB();
    } catch (error) {
      res.status(422).json({ err: "Connect failed!" });
      console.log(error);
      return;
    }

    var db;
    try {
      db = client.db();
    } catch (error) {
      res.status(422).json({ err: "connection failed" });
      console.log(error);
      return;
    }
    const tweetsdb = await db.collection("tweets");
    const tweets = await tweetsdb
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
    if (tweets) {
      tweets.reverse();
    }
    client.close();
    res.status(200).json(tweets);
  }
};

export default handler;
