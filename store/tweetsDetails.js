import { useState, useEffect, createContext } from "react";
export const tweetsDetails = createContext({
  currentTweets: [],
  bookmarks: [],
});

export function TweetsDetailsContextProvider(props) {
  const [currentTweets, setCurrentTweets] = useState([]);
  const [Bookmarks, setBookmarks] = useState([]);
  const currentTweetsHandler = (data) => {
    setCurrentTweets(data);
  };
  const currentBookmarksHandler = (data) => {
    setBookmarks(data);
  };

  const context = {
    tweets: currentTweets,
    bookmarks: Bookmarks,
    setTweetsData: currentTweetsHandler,
    setBookmarksData: currentBookmarksHandler,
  };

  return (
    <tweetsDetails.Provider value={context}>
      {props.children}
    </tweetsDetails.Provider>
  );
}
