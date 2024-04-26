import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Post from "../../../../models/post";
import { NextApiResponse } from "next";
import { verifyJwt } from "../../../../lib/jwt";

export async function GET() {
  await connectMongoDB();
  const post = await Post.find();
  return NextResponse.json({ post });
}

export async function POST(
  request: {
    headers: { get: (arg0: string) => any };
    json: () =>
      | PromiseLike<{ title: any; content: any; author: any }>
      | { title: any; content: any; author: any };
  },
  response: NextApiResponse
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
    const { title, content, author } = await request.json();

    await connectMongoDB();

    await Post.create({ title, content, author });
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
  nextUrl: { searchParams: { get: (arg0: string) => any } };
}) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Post.findByIdAndDelete(id);
  return NextResponse.json({ message: "Post deleted" }, { status: 200 });
}
