import { MongoClient } from "mongodb";

export const connectDB = async () => {
  const client = await MongoClient.connect(
    "mongodb+srv://new-user123:new-user123@cluster0.ozhsq.mongodb.net/tweeter-clone?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
  );
  return client;
};
