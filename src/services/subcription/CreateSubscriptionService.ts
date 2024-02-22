import { CreateSubscriptionRequest } from "../../model/interface/subscription/CreateSubscriptionRequest";
import { prismaClient } from "../../prisma";

class CreateSubscriptionService {
  async execute({
    name,
    price,
    renewal_dayOf_Month,
    user_id,
  }: CreateSubscriptionRequest) {
    if (!user_id) {
      throw new Error("User id is required");
    }

    if (!name || !price || !renewal_dayOf_Month) {
      throw new Error("Name, price and renewal day of month are required");
    }

    try {
      const subscription = await prismaClient.subscription.create({
        data: {
          name,
          renewal_dayOf_Month,
          price,
          user: {
            connect: { id: user_id },
          },
        },
      });
      return subscription;
    } catch (error) {
      throw new Error(`Failed to create subscription: ${error.message}`);
    }
  }
}

export { CreateSubscriptionService };
