import { z } from 'zod';
import { prisma } from '../../prisma/script';
import { publicProcedure, router } from '../trpc';

export const multiRouter = router({
  getOne: publicProcedure.input(z.number()).query(async ({ input }) => {
    const multi = await prisma.multi.findUnique({
      include: {
        ActiveRevision: true,
      },
      where: {
        id: input,
      },
    });

    if (!multi || !multi.ActiveRevision) {
      return null;
    }

    return revisionMerge(multi);
  }),
  getAll: publicProcedure.query(async () => {
    const multi = await prisma.multi.findMany({
      include: {
        ActiveRevision: true,
      },
    });

    return multi.map((m) => {
      return revisionMerge(m);
    });
  }),
  upsert: publicProcedure
    .input(
      z.tuple([
        z.object({
          id: z.number(),
          notes: z.string().optional(),
          state: z.boolean().optional(),
        }),
        z.object({
          revisionName: z.string().optional(),
          title: z.string(),
          description: z.string(),
          dateUpload: z.string().optional(),
          dateExpire: z.string().optional(),
        }),
      ]),
    )
    .mutation(async ({ input: [parent, revision] }) => {
      const rev = await prisma.multiRevision.create({
        data: {
          ...revision,
          revisionName: revision.revisionName || getRevisionName(),
          Multi: {
            connectOrCreate: {
              where: {
                id: parent.id,
              },
              create: {
                notes: parent.notes,
                state: parent.state,
              },
            },
          },
        },
      });

      await prisma.multi.update({
        where: {
          id: rev.multiId,
        },
        data: {
          ActiveRevision: {
            connect: {
              id: rev.id,
            },
          },
        },
      });
    }),
  deleteMany: publicProcedure
    .input(z.array(z.number()))
    .mutation(async ({ input }) => {
      const multis = await prisma.$transaction(
        input.map((id) => {
          return prisma.multi.delete({
            where: {
              id,
            },
          });
        }),
      );

      return multis;
    }),
  toggleMany: publicProcedure
    .input(z.tuple([z.array(z.number()), z.boolean()]))
    .mutation(async ({ input: [ids, state] }) => {
      const multis = await prisma.$transaction(
        ids.map((id) => {
          return prisma.multi.update({
            where: {
              id,
            },
            data: {
              state,
            },
          });
        }),
      );

      return multis;
    }),
});
