import { hashPassword } from "../../../lib/auth";
import { connectDB } from "../../../lib/dbConnect";

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
    const client = await connectDB();
    const db = client.db();
    const userPresent = await db.collection("users").findOne({ email });
    if (userPresent) {
      res.status(422).json({ err: "User already exists" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    await db.collection("users").insertOne({
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
    client.close();
    res.status(201).json({ message: "user Registered" });
  }
};

export default handler;
