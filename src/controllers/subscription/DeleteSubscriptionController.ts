import { Request, Response } from "express";
import { DeleteSubscriptionService } from "../../services/subcription/DeleteSubscriptionService";

class DeleteSubscriptionController {
  async handle(request: Request, response: Response) {
    const subscription_id = request?.query.subscription_id as string;
    const user_id = request.user_id;

    const removeSubscriptionService = new DeleteSubscriptionService();
    const removeSubscription = await removeSubscriptionService.execute(
      subscription_id,
      user_id,
    );
    return response.json(removeSubscription);
  }
}

export { DeleteSubscriptionController };
