import { Request, Response } from "express";
import { GetSubscriptionByUserService } from "../../services/subcription/GetSubscriptionByUserService";

class GetSubscriptionbyUserController {
  async handle(request: Request, response: Response) {
    const user_id = request?.query.user_id as string;

    const getSubscriptionbyUserService = new GetSubscriptionByUserService();

    const getSubscription = await getSubscriptionbyUserService.execute({
      user_id,
    });

    response.json(getSubscription);
  }
}

export { GetSubscriptionbyUserController };
