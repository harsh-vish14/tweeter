import HomePage from "../components/Home/HomePage";
const DUMMY_DATA = [
  {
    _id: "asnsdjasnd",
    authorName: "John",
    authorImage:
      "https://images.unsplash.com/photo-1591258739299-5b65d5cbb235?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    date: "2021-3-10",
    time: "10:30",
    tweetImage:
      "https://firebasestorage.googleapis.com/v0/b/images-to-link-converter.appspot.com/o/images%2FEuxrKtoG01transferir.jpg?alt=media&token=b2c7c56a-0944-4a7c-a30f-f9590c75253c",
    tweetMessage:
      "This is sample text for some tweets in lorem \n kandkasmd jwndajsd \n uandansdnadas das sda sda sd\n jndjasnd",
  },
  {
    _id: "asns23djasnd",
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
    _id: "asnsd42jasnd",
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
    _id: "asnsdj131asnd",
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
    _id: "asnsdjasndasnd",
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
    _id: "asnajsndajsndsdjasnd",
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
    _id: "asnsdjandjasnd",
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
    _id: "asnsdjasjansdjansdnd",
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
