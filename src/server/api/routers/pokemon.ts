import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const pokemonRouter = createTRPCRouter({
  getAllPokemon: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.pokemon.findMany();
  }),
  getPokemon: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return await ctx.db.pokemon.findUnique({
        where: {
          id: input,
        },
      });
    }),
  createPokemon: publicProcedure
    .input(
      z.object({
        name: z.string(),
        imageLink: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.pokemon.create({
        data: {
          name: input.name,
          imageLink: input.imageLink,
        },
      });
    }),
});
