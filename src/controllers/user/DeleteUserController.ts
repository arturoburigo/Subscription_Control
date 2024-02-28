import { Request, Response } from "express";
import { DeleteUserService } from "../../services/user/DeleteUserService";

class DeleteUserController {
  async handle(request: Request, response: Response) {
    const user_id = request.user_id;
    const removeUserService = new DeleteUserService();
    const removeUser = await removeUserService.execute({ user_id });
    return response.json(removeUser);
  }
}

export { DeleteUserController };
