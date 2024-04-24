import { signJwtAccessToken } from "../../../../lib/jwt";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

interface RequestBody {
  username: string;
  password: string;
}
export async function POST(request: Request) {
  const body: RequestBody = await request.json();
  console.log(body);

  try {
    await connectMongoDB();
    const { username, password } = body;

    const user = await User.findOne({ username });
    console.log("working", user);

    if (user) {
      const passwordsMatch = password === user.password;

      if (passwordsMatch) {
        const { password: _, ...userWithoutPassword } = user.toObject();
        const accessToken = signJwtAccessToken(userWithoutPassword);

        const result = {
          ...userWithoutPassword,
          accessToken,
        };

        return new Response(JSON.stringify(result));
      }
    }

    return new Response(JSON.stringify(null));
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify(null));
  }
}
