import { getSession, useSession } from "next-auth/client";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import BookmarkPage from "../components/bookmarks/bookmarks";
import Loading from "../components/loading/loading";
import { getBookmarks } from "../lib/gettingandsetting";
import { tweetsDetails } from "../store/tweetsDetails";

const BookMark = () => {
  const tweetsContext = useContext(tweetsDetails);
  const [loadingData, setLoadingData] = useState(true);
  const [session, loading] = useSession();
  // const [bookmarks, setBookmarks] = useState([]);
  useEffect(async () => {
    if (session) {
      if (tweetsContext.bookmarksm) {
        setLoadingData(false);
      }
      const tweetsData = await getBookmarks(session.user.email);
      tweetsContext.setBookmarksData(tweetsData.data);
      setLoadingData(false);
    }
  }, [loading]);

  if (loadingData) {
    return <Loading />;
  }
  if (tweetsContext.bookmarks.length == 0) {
    return (
      <div style={{ width: "50vw", margin: "auto", textAlign: "center" }}>
        <Image src="/empty.svg" height={200} width={200} layout="responsive" />
        <h4>NO BOOKMARKS</h4>
      </div>
    );
  }
  return <BookmarkPage tweets={tweetsContext.bookmarks} />;
};

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default BookMark;
