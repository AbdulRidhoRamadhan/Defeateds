import UserModel from "@/db/models/UserModel";
import errorHandler from "@/helpers/errorHandler";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);

    await UserModel.register(data);

    return Response.json({ message: "Register success" });
  } catch (error) {
    return errorHandler(error);
  }
}
