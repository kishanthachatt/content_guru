import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";

export async function GET() {
  await connectMongoDB();
  const post = await Post.find();
  return NextResponse.json({ post });
}

export async function POST(request: {
  json: () =>
    | PromiseLike<{ title: string; content: string; author: string }>
    | { title: string; content: string; author: string };
}) {
  const { title, content, author } = await request.json();
  await connectMongoDB();
  await Post.create({ title, content, author });
  return NextResponse.json({ message: "Post Created" }, { status: 201 });
}

export async function DELETE(request: {
  nextUrl: { searchParams: { get: (arg0: string) => any } };
}) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}
