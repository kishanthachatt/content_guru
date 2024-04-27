//app\api\products\[id]\route.js
import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Post from "../../../../../models/post";
import { verifyJwt } from "../../../../../lib/jwt";

export async function PUT(
  request: {
    headers: { get: (arg0: string) => any };
    json: () =>
      | PromiseLike<{ title: string; content: string; author: string }>
      | { title: string; content: string; author: string };
  },
  { params }: any
) {
  try {
    const accessToken = request.headers.get("authorization");
    if (!accessToken || !verifyJwt(accessToken)) {
      return new Response(
        JSON.stringify({
          error: "unauthorized",
        }),
        {
          status: 401,
        }
      );
    }
    const { id } = params;
    const { title, content, author } = await request.json();

    await connectMongoDB();
    await Post.findByIdAndUpdate(id, { title, content, author });
    return NextResponse.json({ message: "Content updated" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET(request: any, { params }: any) {
  try {
    const accessToken = request.headers.get("authorization");
    if (!accessToken || !verifyJwt(accessToken)) {
      return new Response(
        JSON.stringify({
          error: "unauthorized",
        }),
        {
          status: 401,
        }
      );
    }
    const { id } = params;
    await connectMongoDB();
    const post = await Post.findOne({ _id: id });
    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
