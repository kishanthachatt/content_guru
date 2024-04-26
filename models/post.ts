import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Types.ObjectId,
      require: true,
      ref: "user",
    },
  },
  {
    timestamps: { updatedAt: "updatedTime", createdAt: "createdTime" },
  }
);

const Post = mongoose.models.post || mongoose.model("post", postSchema);

export default Post;
