import mongoose, { Schema } from "mongoose";
import User from "./user";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: Schema.Types.Mixed, required: true },
    author: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: User,
    },
  },
  {
    timestamps: { updatedAt: "updatedTime", createdAt: "createdTime" },
  }
);

const Post = mongoose.models.post || mongoose.model("post", postSchema);

export default Post;
