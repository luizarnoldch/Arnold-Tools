import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import prisma from "./prisma";

import { polar, checkout, portal, webhooks } from "@polar-sh/better-auth";
import { polarClient } from "./polar";

const databaseConfig = prismaAdapter(prisma, {
  provider: "postgresql",
});

const emailAndPasswordConfig = {
  enabled: true,
  autoSignIn: true,
};

const pluginsConfig = [
  polar({
    client: polarClient,
    createCustomerOnSignUp: true,
    use: [
      checkout({
        authenticatedUsersOnly: true,
        successUrl: "/dashboard/upgrade",
      }),
      portal(),
      webhooks({
        secret: process.env.POLAR_WEBHOOK_SECRET!,
        onCustomerStateChanged: async (payload) => {}, // Triggered when anything regarding a customer changes
        onOrderPaid: async (payload) => {}, // Triggered when an order was paid (purchase, subscription renewal, etc.)
        // Over 25 granular webhook handlers
        onPayload: async (payload) => {
          console.log(payload);
        }, // Catch-all for all events
      }),
    ],
  }),
  nextCookies(),
];

export const auth = betterAuth({
  database: databaseConfig,
  emailAndPassword: emailAndPasswordConfig,
  plugins: pluginsConfig,
});
