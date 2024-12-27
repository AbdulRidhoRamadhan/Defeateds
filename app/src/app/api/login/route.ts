import UserModel from "@/db/models/UserModel";
import { comparePassword } from "@/helpers/bcrypt";
import errorHandler from "@/helpers/errorHandler";
import { signToken } from "@/helpers/jwt";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);

    const user = await UserModel.findByEmail(body.email);
    if (!user) {
      throw { message: "Invalid email/password", status: 401 };
    }

    const valid = comparePassword(body.password, user.password);
    if (!valid) {
      throw { message: "Invalid email/password", status: 401 };
    }

    const accessToken = signToken({
      _id: user._id.toString(),
      email: user.email,
    });

    cookies().set("Authorization", `Bearer ${accessToken}`);
    return Response.json({ message: "Login success", accessToken });
  } catch (error) {
    return errorHandler(error);
  }
}
