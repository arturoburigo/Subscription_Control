import { Request, Response } from "express";
import { ResetPasswordService } from "../../services/user/ResetPasswordService";

class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const token = request.query.token as string;
    const { newPassword } = request.body;

    const resetPasswordService = new ResetPasswordService();

    try {
      await resetPasswordService.execute({ token, newPassword });
      return response
        .status(200)
        .json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Error resetting password:", error);
      return response.status(500).json({ error: "Failed to reset password" });
    }
  }
}

export { ResetPasswordController };
