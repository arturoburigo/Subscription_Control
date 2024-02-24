import { prismaClient } from "../../prisma";

class DeleteSubscriptionService {
  async execute(subscription_id: string, user_id: string) {
    if (!subscription_id) {
      throw new Error("Subscription id is required");
    }

    try {
      const deletedSubscription = await prismaClient.subscription.findFirst({
        where: {
          id: subscription_id,
        },
      });

      if (!deletedSubscription) {
        throw new Error("Subscription not found");
      }

      if (deletedSubscription.userId !== user_id) {
        throw new Error("You are not allowed to delete this subscription");
      }

      const subscription = await prismaClient.subscription.delete({
        where: {
          id: subscription_id,
        },
      });
      return subscription;
    } catch (err) {
      throw new Error(`Failed to delete subscription: ${err.message}`);
    }
  }
}

export { DeleteSubscriptionService };
