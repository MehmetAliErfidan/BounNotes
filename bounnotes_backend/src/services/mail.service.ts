import { Resend } from "resend";
import { env } from "../config/env";

const resend = new Resend(env.RESEND_API_KEY);

export async function sendVerificationEmail(to: string, verifyUrl: string) {
  await resend.emails.send({
    from: env.MAIL_FROM,
    to,
    subject: "Verify your BounNotes account",
    text: `Verify your account: ${verifyUrl}`,
    html: `
            <p>Verify your account:</p>
            <p><a href="${verifyUrl}">${verifyUrl}</a></p>
            <p>This link expires in 24 hours.</p>
        `,
  });
}
