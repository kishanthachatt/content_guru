import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

export async function POST(req: Request, res: NextResponse) {
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
  console.log(response);

  const responseText = response.choices[0]?.message.content;
  //   res.status(200).json({ response: responseText });

  const theResponse = "Testing success";
  return NextResponse.json({ output: responseText }, { status: 200 });
}
