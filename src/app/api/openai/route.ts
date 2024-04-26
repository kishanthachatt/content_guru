import { NextResponse } from "next/server";
import OpenAI from "openai";
import { verifyJwt } from "../../../../lib/jwt";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

export async function POST(req: Request, res: NextResponse) {
  try {
    const accessToken = req.headers.get("authorization");
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
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    console.log(response, "Guru response");

    return NextResponse.json(
      { message: response.choices[0]?.message.content },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Guru failed to reply" },
      { status: 500 }
    );
  }
}
