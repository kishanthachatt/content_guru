//app\api\products\[id]\route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";

export async function PUT(
  request: {
    json: () =>
      | PromiseLike<{ title: string; content: string; author: string }>
      | { title: string; content: string; author: string };
  },
  { params }: any
) {
  const { id } = params;
  const { title, content, author } = await request.json();

  await connectMongoDB();
  await Post.findByIdAndUpdate(id, { title, content, author });
  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}

export async function GET(request: any, { params }: any) {
  const { id } = params;
  await connectMongoDB();
  const posts = await Post.findOne({ _id: id });
  return NextResponse.json({ posts }, { status: 200 });
}
