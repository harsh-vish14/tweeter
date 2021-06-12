import { db } from "../../../lib/dbConnect";

const handler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.AUTH_APIKEY
  ) {
    const { Name, Bio, userId } = req.body;
    const userDB = await db.collection("users").doc(userId);
    if (!(await userDB.get()).exists) {
      res.status(404).json({ err: "User not found" });
      return;
    }
    if (Name) {
      await db.collection("users").doc(userId).update({
        authorName: Name,
      });
    }
    if (Bio) {
      await db.collection("users").doc(userId).update({
        authorBio: Bio,
      });
    }
    res.status(200).json({ message: "Updated Profile Successfully" });
  }
};

export default handler;
