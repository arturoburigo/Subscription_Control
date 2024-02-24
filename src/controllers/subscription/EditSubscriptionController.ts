import { Request, Response } from "express";
import { EditSubscriptionRequest } from "../../model/interface/subscription/EditSubscriptionRequest";
import { EditSubscriptionService } from "../../services/subcription/EditSubscriptionService";

class EditSubscriptionController {
  async handle(request: Request, response: Response) {
    const { name, price, renewal_dayOf_Month }: EditSubscriptionRequest =
      request.body;
    const subscription_id = request?.query.subscription_id as string;
    const user_id = request.user_id;

    const editSubscriptionService = new EditSubscriptionService();
    const editSubscription = await editSubscriptionService.execute({
      name,
      price,
      renewal_dayOf_Month,
      subscription_id,
      user_id,
    });
    return response.json(editSubscription);
  }
}

export { EditSubscriptionController };
