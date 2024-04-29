import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextApiResponse } from "next";
import { verifyJwt } from "../../../../lib/jwt";

export async function GET(request: {
  headers: { get: (arg0: string) => any };
}) {
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
    await connectMongoDB();
    const post = await Post.find().sort({ createdTime: -1 });
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: {
  headers: { get: (arg0: string) => any };
  json: () =>
    | PromiseLike<{ title: string; content: any; author: string }>
    | { title: any; content: any; author: any };
}) {
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
    const { title, content, author } = await request.json();

    await connectMongoDB();
    console.log("working 1");
    let response = await Post.create({ title, content, author });
    console.log(response, "working 2");
    return NextResponse.json(
      { message: "Post created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: {
  headers: { get: (arg0: string) => any };
  nextUrl: { searchParams: { get: (arg0: string) => any } };
}) {
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
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB();
    await Post.findByIdAndDelete(id);
    return NextResponse.json(
      { message: "Successfully post deleted " },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
