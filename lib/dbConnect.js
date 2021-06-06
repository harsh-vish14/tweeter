const firebaseConfig = {
  apiKey: "AIzaSyDWM-rfxQqNTe-7im12kC489o7wqSjJAzo",
  authDomain: "tweeter-hv.firebaseapp.com",
  projectId: "tweeter-hv",
  storageBucket: "tweeter-hv.appspot.com",
  messagingSenderId: "948695041462",
  appId: "1:948695041462:web:96a49d39ad1baa2fce2d17",
};

import { MongoClient } from "mongodb";

export const connectDB = async () => {
  const client = await MongoClient.connect(process.env.DB, {
    useUnifiedTopology: true,
  });
  return client;
};
