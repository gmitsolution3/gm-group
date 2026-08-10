import { sendEmail } from "@/lib/email";
import clientPromise from "@/lib/mongodb";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = await clientPromise;
const db = client.db(process.env.MONGODB_DB);

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
      },

      role: {
        type: ["user", "admin"],
        required: false,
        defaultValue: "user",
        input: false,
      },
    },
  },

  session: {
    // 24 hours
    expiresIn: 60 * 60 * 24,

    // Don't extend the session lifetime
    updateAge: 0,

    // Don't refresh the session automatically
    disableSessionRefresh: true,
  },

  emailAndPassword: {
    enabled: true,

    requireEmailVerification: true,

    sendResetPassword: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Reset your GM Group password",
        text: `Reset your password by visiting: ${url}`,
        html: `
        <h2>Reset your GM Group password</h2>
        <p>
          We received a request to reset the password for your GM Group account.
        </p>
        <p>
          <a href="${url}">Reset your password</a>
        </p>
        <p>
          If you did not request this, you can safely ignore this email.
        </p>
      `,
      });
    },

    resetPasswordTokenExpiresIn: 60 * 60,

    revokeSessionsOnPasswordReset: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    sendOnSignIn: true,

    sendVerificationEmail: async ({ user, url }) => {
      void sendEmail({
        to: user.email,
        subject: "Verify your GM Group email",
        text: `Verify your email address by visiting: ${url}`,
        html: `
        <h2>Welcome to GM Group</h2>

        <p>
          Please verify your email address to activate your account.
        </p>

        <p>
          <a href="${url}">
            Verify my email
          </a>
        </p>

        <p>
          This verification link will expire after 1 hour.
        </p>
      `,
      });
    },

    expiresIn: 60 * 60,
  },
});
