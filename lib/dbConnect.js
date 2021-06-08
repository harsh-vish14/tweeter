import firebase from "firebase/app";

import "firebase/storage";
import "firebase/firestore";
// import "firebase/database";

const config = {
  apiKey: "AIzaSyDWM-rfxQqNTe-7im12kC489o7wqSjJAzo",
  authDomain: "tweeter-hv.firebaseapp.com",
  projectId: "tweeter-hv",
  storageBucket: "tweeter-hv.appspot.com",
  messagingSenderId: "948695041462",
  appId: "1:948695041462:web:96a49d39ad1baa2fce2d17",
};
var firebaseApp;
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(config);
} else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}

// const firebaseApp = firebase.initializeApp(config);

const db = firebase.firestore();
const storage = firebase.storage();
export { db, storage };

// import { MongoClient } from "mongodb";

// export const connectDB = async () => {
//   const client = await MongoClient.connect(process.env.DB, {
//     useUnifiedTopology: true,
//   });
//   return client;
// };
