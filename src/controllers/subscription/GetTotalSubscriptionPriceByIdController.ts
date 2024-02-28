import { Request, Response } from "express";
import { GetTotalSubscriptionPriceByIdService } from "../../services/subcription/GetTotalSubscriptionPriceById.Service";

class GetTotalSubscriptionPriceByIdController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id;

    const getTotalSubscriptionPriceByIdService =
      new GetTotalSubscriptionPriceByIdService();

    const getSubscriptionPrice =
      await getTotalSubscriptionPriceByIdService.execute({ user_id });

    return response.json(getSubscriptionPrice);
  }
}

export { GetTotalSubscriptionPriceByIdController };
