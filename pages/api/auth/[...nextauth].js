import NextAuth from "next-auth";
import Provider from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";
import { db } from "../../../lib/dbConnect";

export default NextAuth({
  session: {
    jws: true,
  },
  providers: [
    Provider.Credentials({
      async authorize(credentials) {
        const user = await db
          .collection("users")
          .where("email", "in", [credentials.email])
          .get();
        const userData = [];
        user.forEach((user) => {
          userData.push(user.data());
        });
        if (user.empty) {
          throw new Error("User not found");
        }

        const isCorrent = await verifyPassword(
          credentials.password,
          userData[0].password
        );
        if (!isCorrent) {
          throw new Error("Invalid Password");
        }
        return {
          email: userData[0].email,
          image: userData[0].authorImage,
          name: userData[0]._id,
        };
      },
    }),
  ],
  callbacks: {
    async session(session, user) {
      const userdb = await db
        .collection("users")
        .where("email", "in", [session.user.email])
        .get();
      const userData = [];
      userdb.forEach((user) => {
        userData.push(user.data());
      });
      return {
        user: {
          username: userData[0].authorName,
          name: userdb.docs[0].id,
          email: userData[0].email,
          image: {
            userImage: userData[0].authorImage || "",
            userHeader: userData[0].header || "",
          },
        },
      };
    },
  },
});
