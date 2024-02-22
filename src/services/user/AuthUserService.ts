import { compare } from "bcryptjs";
import { AuthUserRequest } from "../../model/interface/user/AuthUseRequest";
import { sign } from "jsonwebtoken";
import { prismaClient } from "../../prisma";

class AuthUserService {
  async execute({ email, password }: AuthUserRequest) {
    if (!email || !password) {
      throw new Error("Invalid input");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid password");
    }

    const token = sign(
      {
        email: user.email,
        password: user.password,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id,
        expiresIn: "1d",
      },
    );
    return {
      id: user.id,
      email: user.email,
      token: token,
    };
  }
}

export { AuthUserService };
