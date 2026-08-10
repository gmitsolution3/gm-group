import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/mongodb";

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
  },
});