import { db } from "../../../lib/dbConnect";
/*
THIS IS PUBLIC API
this is give user details
 */
const userProfile = async (req, res) => {
  if (req.method === "GET") {
    const { profileId } = req.query;

    const userDB = await db.collection("users");
    const tweetDB = await db.collection("tweets");

    const user = await userDB.doc(profileId).get();
    if (!user.exists) {
      res.status(404).json({ err: "User not found" });
      return;
    }
    const userTweets = [];
    if (user.data().authorTweet) {
      for (let i = 0; i < user.data().authorTweet.length; i++) {
        const snapshot = await tweetDB.doc(user.data().authorTweet[i]).get();
        const current_user = await userDB.doc(snapshot.data().authorId).get();
        userTweets.push({
          _id: user.data().authorTweet[i],
          ...snapshot.data(),
          userDetails: {
            authorName: current_user.data().authorName,
            authorImage: current_user.data().authorImage,
          },
        });
      }
    }
    const finalProfileData = {
      _id: user.id,
      authorBio: user.data().authorBio,
      authorName: user.data().authorName,
      authorImage: user.data().authorImage,
      authorHeader: user.data().authorHeader,
      followers: user.data().followers,
      following: user.data().following,
      tweets: userTweets,
    };
    res.status(200).json(finalProfileData);
  }
};

export default userProfile;
