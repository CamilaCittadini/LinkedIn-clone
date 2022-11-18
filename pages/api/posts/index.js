import { Timestamp } from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

export default async function handler(req, res) {
  const { method, body } = req;
  const { db } = await connectToDatabase();

  //the GET method will retrieve an array of posts, and will be ordered in a descending manner (from newer to older posts)
  if (method === "GET") {
    try {
      const posts = await db
        .collection("posts")
        .find()
        .sort({ timestamp: -1 }.toArray());
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  //on the posts collection, we will insert the post. The Timestamp will allow us to see the posts in order
  if (method === "POST") {
    try {
      const posts = await db
        .collection("posts")
        .insertOne({ ...body, timestamp: new Timestamp() });
      res.status(201).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
