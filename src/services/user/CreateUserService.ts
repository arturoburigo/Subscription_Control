import { CreateUserRequest } from "../../model/interface/user/CreateUserRequest";
import { hash } from "bcryptjs";
import { prismaClient } from "../../prisma";

class CreateUserService {
  async execute({ name, email, password }: CreateUserRequest) {
    if (!name || !email || !password) {
      throw new Error("Invalid input");
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return user;
  }
}

export { CreateUserService };
