import { prismaClient } from "../../prisma";

interface DeleteUserInterface {
  user_id: string;
}

class DeleteUserService {
  async execute({ user_id }: DeleteUserInterface) {
    if (!user_id) {
      throw new Error("User id is required");
    }

    // Excluir todas as assinaturas associadas ao usuário
    await prismaClient.subscription.deleteMany({
      where: {
        userId: user_id,
      },
    });

    // Excluir o próprio usuário
    const deletedUser = await prismaClient.user.delete({
      where: {
        id: user_id,
      },
      select: {
        name: true,
        email: true,
        subscriptions: true,
      },
    });

    return deletedUser;
  }
}

export { DeleteUserService };
