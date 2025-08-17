import { polarClient } from "@/lib/polar";
import prisma from "@/lib/prisma";
import {
  createTRPCRouter,
  premiumProcedure,
  protectedProcedure,
} from "@/trpc/init";
import z from "zod";

export const premiumRouter = createTRPCRouter({
  getFreeUsage: protectedProcedure.query(async ({ ctx }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });

    const subscription = customer.activeSubscriptions[0];

    if (subscription) {
      return null;
    }

    return {
      subscriptionType: "Free",
    };
  }),
  createPremiunContent: premiumProcedure("search")
    .input(
      z.object({
        text: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const userId = ctx.auth.user.id;
      console.log(input);
      console.log(userId);
      // const insertedRecord = await prisma. // Insertion with db
      return {
        response: "newMutationFromPremium",
      };
    }),
  getProducts: protectedProcedure.query(async () => {
    const products = await polarClient.products.list({
      isArchived: false,
      isRecurring: true,
      sorting: ["price_amount"],
    });

    return products.result.items;
  }),
  getCurrentSubcription: protectedProcedure.query(async ({ ctx }) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });
    const subscription = customer.activeSubscriptions[0];
    if (!subscription) {
      return null;
    }
    const product = await polarClient.products.get({
      id: subscription.productId,
    });
    return product;
  }),
});
