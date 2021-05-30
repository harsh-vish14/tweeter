import { hashPassword } from "../../../lib/auth";
import { connectDB } from "../../../lib/dbConnect";

const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    const { name, email, password, image } = req.body;
    var userImage;
    if (image) {
      userImage = image;
    } else {
      userImage =
        "https://lh3.googleusercontent.com/proxy/FCdpjMVHLVL8r1WsK1IQM_SgRWzL4TonmtygG-0CWdmwJ3DOf4rktZKAeK-Fr_qFA7JT4waNpKz48KT4bC_67tf-jo0lMQ1laJk369Qnurcbfw";
    }
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
    }
    const hashedPassword = await hashPassword(password);
    await db.collection("users").insertOne({
      email,
      password: hashedPassword,
      authorName: name,
      authorImage: userImage,
    });
    res.status(201).json({ message: "user Registered" });
  }
};

export default handler;
