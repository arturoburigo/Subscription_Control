import { Request, Response } from "express";
import { CreateSubscriptionService } from "../../services/subcription/CreateSubscriptionService";

class CreateSubscriptionController {
  async handle(req: Request, res: Response) {
    const { name, price, renewal_dayOf_Month } = req.body;
    const user_id = req.user_id; // Obtendo o user_id do objeto de requisição

    try {
      const createSubscriptionService = new CreateSubscriptionService();
      const subscription = await createSubscriptionService.execute({
        name,
        price,
        renewal_dayOf_Month,
        user_id,
      });

      return res.status(201).json(subscription);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

export { CreateSubscriptionController };
