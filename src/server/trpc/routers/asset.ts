import { z } from 'zod';
import { prisma } from '../../prisma/script';
import { router, publicProcedure as pp } from '../trpc';

export const AssetInput = z.object({
  id: z.onumber(),
  name: z.string(),
  type: z.string(),
  size: z.number(),
  bytes: z.array(z.number()),
  blurhash: z.ostring().nullable(),
  timestamp: z.string().nullable(),
  // relation: z.object({
  //   id: z.number().default(0),
  //   type: z.union([z.literal('singleOne'), z.literal('singleMany')]),
  // }),
});

export const assetRouter = router({
  getAll: pp.query(async () => {
    return await prisma.asset.findMany();
  }),
  getOne: pp.input(z.number()).query(async ({ input }) => {
    return await prisma.asset.findUnique({
      where: {
        id: input,
      },
    });
  }),
  upsertOne: pp
    .input(
      z.object({
        id: z.number(),
        title: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      return await prisma.asset.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
        },
      });
    }),
  delete: pp.input(z.number()).mutation(async ({ input }) => {
    return await prisma.asset.delete({
      where: {
        id: input,
      },
    });
  }),
  deleteMany: pp.input(z.array(z.number())).mutation(async ({ input }) => {
    return await prisma.asset.deleteMany({
      where: {
        id: {
          in: input,
        },
      },
    });
  }),
});
