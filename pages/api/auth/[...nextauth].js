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
        };
      },
    }),
  ],
  // callbacks: {
  //   async session(session, user) {
  //     // console.log("session: ");
  //     // console.log(session);
  //     console.log("user");
  //     console.log(user);
  //     return {
  //       user: {
  //         name: "jandjasndajsnd",
  //         email: "kakdasd@gmail.ascjasnd",
  //         image: "jandjassndajssndasdjd",
  //       },
  //     };
  //   },
  // },
});