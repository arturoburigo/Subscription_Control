import { prismaClient } from "../../prisma";

interface GetSubscriptionByUserServiceRequest {
  user_id: string;
}

class GetSubscriptionByUserService {
  async execute({ user_id }: GetSubscriptionByUserServiceRequest) {
    if (!user_id) {
      throw new Error("User id is required");
    }

    try {
      const subscriptions = await prismaClient.subscription.findMany({
        where: {
          userId: user_id,
        },
      });
      return subscriptions;
    } catch (error) {
      throw new Error(`Failed to get subscriptions: ${error.message}`);
    }
  }
}

export { GetSubscriptionByUserService };
