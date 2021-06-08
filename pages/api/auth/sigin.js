import { hashPassword } from "../../../lib/auth";
import { db } from "../../../lib/dbConnect";
// import { connectDB } from "../../../lib/dbConnect";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { name, email, password, image } = req.body;
    console.log(req.body);
    var userImage = image || "/default.png";

    if (!email || !password || !email.includes("@") || !name) {
      res.status(422).json({ err: "Invalid Response" });
      return;
    }

    if (password.trim().length < 7) {
      res.status(422).json({ err: "Small password" });
      return;
    }

    const user = await db
      .collection("users")
      .where("email", "in", [email])
      .get();

    if (!user.empty) {
      res.status(422).json({ err: "User already exists" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    db.collection("users").add({
      email,
      password: hashedPassword,
      authorName: name,
      authorImage: userImage,
      authorHeader: "",
      authorBio: "",
      followers: [],
      following: [],
      authorTweets: [],
      bookmarks: [],
    });
    res.status(201).json({ message: "Added user successfully" });
  }
};

export default handler;
