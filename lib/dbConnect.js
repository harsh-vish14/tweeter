import firebase from "firebase/app";

import "firebase/storage";
import "firebase/firestore";

const config = {
  apiKey: process.env.DB_APIKEY,
  authDomain: process.env.DB_AUTHDOMAIN,
  projectId: process.env.DB_PROJECTID,
  storageBucket: process.env.DB_STROAGE_BUCKET,
  messagingSenderId: process.env.DB_MESSAGINGSENDER_ID,
  appId: process.env.DB_APPID,
};
var firebaseApp;
if (!firebase.apps.length) {
  firebaseApp = firebase.initializeApp(config);
} else {
  firebaseApp = firebase.app(); // if already initialized, use that one
}

const db = firebase.firestore();
const storage = firebase.storage();
export { db, storage };
