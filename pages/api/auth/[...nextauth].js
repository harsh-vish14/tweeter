import NextAuth from "next-auth";
import Provider from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { connectDB } from "../../../lib/dbConnect";

export default NextAuth({
  session: {
    jws: true,
  },
  providers: [
    Provider.Credentials({
      async authorize(credentials) {
        const client = await connectDB();
        const db = client.db();
        const userCollection = await db.collection("users");
        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error("User not found");
        }
        const isCorrent = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isCorrent) {
          client.close();
          throw new Error("Invalid Password");
        }
        client.close();
        return {
          email: user.email,
          image: user.authorImage,
          name: user._id,
        };
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      const client = await connectDB();
      const db = client.db();
      const userdb = await db
        .collection("users")
        .findOne({ email: session.user.email });
      return {
        user: {
          username: userdb.authorName,
          name: userdb._id,
          email: userdb.email,
          image: {
            userImage: userdb.authorImage || "",
            userHeader: userdb.header || "",
          },
        },
      };
    },
  },
});
