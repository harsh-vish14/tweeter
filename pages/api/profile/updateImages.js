import { db } from "../../../lib/dbConnect";

const handler = async (req, res) => {
  if (
    req.method === "POST" &&
    req.headers.authorization === process.env.SERVER_AUTHKEY
  ) {
    const { imageLink, operation, userId } = req.body;
    const userDB = await db.collection("users").doc(userId);
    if (!(await userDB.get()).exists) {
      res.status(404).send({ err: "Invalid user" });
      return;
    }
    switch (operation) {
      case "Header":
        userDB.update({
          authorHeader: imageLink,
        });
        break;
      case "Profile":
        userDB.update({
          authorImage: imageLink,
        });
        break;
      default:
        res.status(422).send({ err: "invalid operation" });
        break;
    }
  }
};

export default handler;
