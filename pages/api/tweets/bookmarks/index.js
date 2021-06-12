import { db } from "../../../../lib/dbConnect";

const handler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization == process.env.SERVER_AUTHKEY
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
    res.status(200).json(bookmarks);
  }
};

export default handler;
