import HomePage from "../components/Home/HomePage";
const DUMMY_DATA = [
  {
    authorName: "John",
    authorImage:
      "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    date: "2021-3-10",
    time: "10:30",
    tweetImage:
      "https://images.unsplash.com/photo-1622016199677-992cb96c2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    tweetMessage: "This is sample text for some tweets in",
  },
  {
    authorName: "John",
    authorImage:
      "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    date: "2021-3-10",
    time: "10:30",
    tweetImage:
      "https://images.unsplash.com/photo-1622016199677-992cb96c2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    tweetMessage: "This is sample text for some tweets in",
  },
  {
    authorName: "John",
    authorImage:
      "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    date: "2021-3-10",
    time: "10:30",
    tweetImage:
      "https://images.unsplash.com/photo-1622016199677-992cb96c2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    tweetMessage: "This is sample text for some tweets in",
  },
  {
    authorName: "John",
    authorImage:
      "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    date: "2021-3-10",
    time: "10:30",
    tweetImage:
      "https://images.unsplash.com/photo-1622016199677-992cb96c2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    tweetMessage: "This is sample text for some tweets in",
  },
  {
    authorName: "John",
    authorImage:
      "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    date: "2021-3-10",
    time: "10:30",
    tweetImage:
      "https://images.unsplash.com/photo-1622016199677-992cb96c2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    tweetMessage: "This is sample text for some tweets in",
  },
  {
    authorName: "John",
    authorImage:
      "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    date: "2021-3-10",
    time: "10:30",
    tweetImage:
      "https://images.unsplash.com/photo-1622016199677-992cb96c2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    tweetMessage: "This is sample text for some tweets in",
  },
  {
    authorName: "John",
    authorImage:
      "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    date: "2021-3-10",
    time: "10:30",
    tweetImage:
      "https://images.unsplash.com/photo-1622016199677-992cb96c2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    tweetMessage: "This is sample text for some tweets in",
  },
  {
    authorName: "John",
    authorImage:
      "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    date: "2021-3-10",
    time: "10:30",
    tweetImage:
      "https://images.unsplash.com/photo-1622016199677-992cb96c2b1a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80",
    tweetMessage: "This is sample text for some tweets in",
  },
];

export default function Home() {
  return <HomePage tweets={DUMMY_DATA} />;
}
