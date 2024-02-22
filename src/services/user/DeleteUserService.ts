import { prismaClient } from "../../prisma";

interface DeleteUserInterface {
  user_id: string;
}

class DeleteUserService {
  async execute({ user_id }: DeleteUserInterface) {
    const deletedUser = await prismaClient.user.delete({
      where: {
        id: user_id,
      },
      select: {
        id: true,
      },
    });
    return deletedUser;
  }
}

export { DeleteUserService };
