import { prismaClient } from "../../prisma";

interface GetTotalSubscriptionPriceByIdInterface {
  user_id: string;
}

class GetTotalSubscriptionPriceByIdService {
  async execute({ user_id }: GetTotalSubscriptionPriceByIdInterface) {
    if (!user_id) {
      throw new Error("User id is required");
    }
    try {
      const totalSubscriptionPrice = await prismaClient.subscription.aggregate({
        where: {
          userId: user_id,
        },
        _sum: {
          price: true,
        },
      });

      return totalSubscriptionPrice._sum || 0; // Retorna 0 se não houver preço total
    } catch (error) {
      throw new Error(`Could not get total subscription price: ${error}`);
    }
  }
}

export { GetTotalSubscriptionPriceByIdService };
