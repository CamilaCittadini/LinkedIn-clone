//DELETE individual posts
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const { db } = await connectToDatabase();

  if (method === "DELETE") {
    try {
      await db.collection("posts").deleteOne({ _id: new ObjectId(id) });

      res.status(200).json({ message: "This post has been deleted" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (req.method === "PATCH") {
    const post = req.body;
    if (!id) {
      res.status(403).json({ message: "Missing id param" });
    }

    try {
      await db.collection("posts").updateOne(
        { _id: new ObjectId(id) },
        {
          $set: post,
        }
      );

      res.status(200).json({ message: "updated" });
    } catch (error) {
      res.status(500).json({ message: "error" });
    }
  }
}
