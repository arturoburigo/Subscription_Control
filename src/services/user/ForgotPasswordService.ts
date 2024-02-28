import { prismaClient } from "../../prisma";
import { createTransport } from "nodemailer";
import jwt from "jsonwebtoken";

interface ForgotPasswordServiceRequest {
  email: string;
}

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

class ForgotPasswordService {
  async execute({ email }: ForgotPasswordServiceRequest) {
    if (!email) {
      throw new Error("Email is required");
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Generate a unique token
    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
      expiresIn: "15m", // Token expires in 15 minutes
    });

    // Send email to user with password recovery link
    const info = await transporter.sendMail({
      to: email,
      subject: "Password Recovery",
      text: `Password recovery link: http://localhost:3333/reset-password?token=${token}`,
      html: `<p>Password recovery link: <a href="http://yourdomain.com/reset-password?token=${token}">Reset Password</a></p>`,
    });

    return info;
  }
}

export { ForgotPasswordService };
