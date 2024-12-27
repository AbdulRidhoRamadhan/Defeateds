import { hashPassword } from "@/helpers/bcrypt";
import database from "../config/mongodb";
import { z } from "zod";
import { User } from "@/types";

const userSchema = z.object({
  username: z.string().min(3, {
    message: "Username is required and must be at least 3 characters long",
  }),
  email: z
    .string()
    .email({ message: "Email is required and must be in a valid format" }),
  password: z.string().min(5, {
    message: "Password is required and must be at least 5 characters long",
  }),
});

class UserModel {
  static collection() {
    return database.collection<User>("users");
  }

  static async register(newUser: User) {
    userSchema.parse(newUser);

    const existUser = await this.collection().findOne({
      $or: [{ email: newUser.email }, { username: newUser.username }],
    });

    if (existUser) {
      if (existUser.email === newUser.email) {
        throw {
          message: "Email already exists",
          status: 400,
        };
      }
      if (existUser.username === newUser.username) {
        throw {
          message: "Username already exists",
          status: 400,
        };
      }
    }
    newUser.password = hashPassword(newUser.password);

    const user = await this.collection().insertOne(newUser);
    return user;
  }

  static async findByEmail(email: string) {
    return await this.collection().findOne({ email });
  }
}

export default UserModel;
