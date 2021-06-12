import { db } from "../../../lib/dbConnect";
import firebase from "firebase";
const handler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.auth_APIKEY
  ) {
    const { currentUserId, followersUserId } = req.body;
    const userDB = await db.collection("users");
    if (
      !(await userDB.doc(currentUserId).get()).exists ||
      !(await userDB.doc(followersUserId).get()).exists
    ) {
      res.status(404).json({ err: "User not found" });
      return;
    }
    userDB.doc(currentUserId).update({
      following: firebase.firestore.FieldValue.arrayUnion(followersUserId),
    });
    userDB.doc(followersUserId).update({
      followers: firebase.firestore.FieldValue.arrayUnion(currentUserId),
    });
    res.status(200).json({ message: "followed user successfully" });
  }
};

export default handler;
