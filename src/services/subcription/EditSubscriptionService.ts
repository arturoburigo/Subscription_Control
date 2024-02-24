import { EditSubscriptionRequest } from "../../model/interface/subscription/EditSubscriptionRequest";
import { prismaClient } from "../../prisma";

class EditSubscriptionService {
  async execute({
    name,
    price,
    renewal_dayOf_Month,
    subscription_id,
    user_id,
  }: EditSubscriptionRequest) {
    if (!name || !price || !renewal_dayOf_Month) {
      throw new Error("Name, price and renewal day of month are required");
    }

    try {
      const Editedsubscription = await prismaClient.subscription.update({
        where: {
          id: subscription_id,
          userId: user_id,
        },
        data: {
          name,
          price,
          renewal_dayOf_Month,
        },
        select: {
          id: true,
          name: true,
          price: true,
          renewal_dayOf_Month: true,
        },
      });
      return Editedsubscription;
    } catch (error) {
      throw new Error(`Failed to edit subscription: ${error.message}`);
    }
  }
}

export { EditSubscriptionService };
