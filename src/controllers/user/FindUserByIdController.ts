import { Request, Response } from "express";
import { FindUserByIdService } from "../../services/user/FindUserByIdService";

class FindUserByIdController {
  async handle(request: Request, response: Response) {
    const user_id = request?.query.user_id as string;
    const userIdController = new FindUserByIdService();
    const userId = await userIdController.execute({ user_id });

    return response.json(userId);
  }
}

export { FindUserByIdController };
