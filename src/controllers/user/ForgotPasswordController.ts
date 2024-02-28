import { Request, Response } from "express";
import { ForgotPasswordService } from "../../services/user/ForgotPasswordService";

class ForgotPasswordController {
  async handle(request: Request, response: Response) {
    const { email } = request.body;
    const forgotPasswordService = new ForgotPasswordService();
    const forgotPassword = await forgotPasswordService.execute({ email });
    return response.json(forgotPassword);
  }
}

export { ForgotPasswordController };
