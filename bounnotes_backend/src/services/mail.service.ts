import { Resend } from "resend";
import { env } from "../config/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, verifyUrl: string) {
  try {
    const result = await resend.emails.send({
      from: env.MAIL_FROM,
      to,
      subject: "Verify your BounNotes account",

      text: `
Welcome to BounNotes!

Please verify your email address by visiting the link below:

${verifyUrl}

This link expires in 24 hours.
      `,

      html: `
        <h2>Welcome to BounNotes</h2>

        <p>Please verify your email address to activate your account.</p>

        <p>
          <a href="${verifyUrl}">
            Click here to verify your account
          </a>
        </p>

        <p>This link will expire in 24 hours.</p>

        <p>If you did not create this account, you can ignore this email.</p>

        <p>— The BounNotes Team</p>
      `,
    });

    console.log("Verification email sent:", result);
  } catch (error) {
    console.error("Email sending failed:", error);
  }
}
