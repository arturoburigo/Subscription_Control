import { prismaClient } from "../../prisma";

interface GetUserByIdInterface {
  user_id: string;
}

class FindUserByIdService {
  async execute({ user_id }: GetUserByIdInterface) {
    if (!user_id) {
      throw new Error("Invalid input");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    });
    return user;
  }
}

export { FindUserByIdService };
