import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./emailhtml";
import { client, sender } from "./mailtrap";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipients = [
    {
      email: email,
    },
  ];
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Verify Your Email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Email Verification",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send email verification");
  }
};
export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipient = [{ email }];
  const htmlcontent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Welcome to YumDash",
      html: htmlcontent,
      template_variables: {
        company_info_name: "YumDash",
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email ");
  }
};
export const sendPasswordResetEmail = async (
  email: string,
  resetUrl: string
) => {
  const recipient = [{ email }];
  const htmlcontent = generatePasswordResetEmailHtml(resetUrl);
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your password",
      html: htmlcontent,
      category: "Reset Password",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to reset password ");
  }
};
export const sendResetSuccessEmail = async (email: string) => {
  const recipient = [{ email }];
  const htmlcontent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: "Password reset successfully",
      html: htmlcontent,
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset success email ");
  }
};
