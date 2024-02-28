import { prismaClient } from "../../prisma";
import { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

interface ResetPasswordServiceRequest {
  token: string;
  newPassword: string;
}

class ResetPasswordService {
  async execute({ newPassword, token }: ResetPasswordServiceRequest) {
    if (!newPassword || !token) {
      throw new Error("Invalid password or token");
    }

    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
        email: string;
      };

      console.log(decodedToken);

      const user = await prismaClient.user.findFirst({
        where: {
          email: decodedToken.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const passwordHash = await hash(newPassword, 8);

      const restoredPassword = await prismaClient.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: passwordHash,
        },
      });
      return restoredPassword;
    } catch (error) {
      throw new Error(`Failed to reset password: ${error.message}`);
    }
  }
}

export { ResetPasswordService };
