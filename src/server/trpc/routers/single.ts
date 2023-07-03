import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../../prisma/script';
import { publicProcedure, router } from '../trpc';
import { AssetInput } from './asset';

export const SINGLE_REV_INCLUDE =
  Prisma.validator<Prisma.SingleRevisionInclude>()({
    persons: true,
    image: true,
    images: true,
  });

export const personOptional = z.object({
  id: z.number().optional(),
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
});

export const singleRouter = router({
  get: publicProcedure.query(async () => {
    const single = await prisma.single.findFirst({
      include: {
        ActiveRevision: {
          include: SINGLE_REV_INCLUDE,
        },
      },
    });

    if (!single || !single.ActiveRevision) {
      return null;
    }

    return revisionMerge(single);
  }),
  getRevisions: publicProcedure.query(async () => {
    const single = await prisma.single.findFirst({
      select: {
        ActiveRevision: {
          include: SINGLE_REV_INCLUDE,
        },
      },
    });
    const revisions = await prisma.singleRevision.findMany({
      include: SINGLE_REV_INCLUDE,
      orderBy: {
        dateCreated: 'desc',
      },
    });

    if (!single || !single.ActiveRevision) {
      return null;
    }

    return {
      active: single?.ActiveRevision,
      all: revisions,
    };
  }),
  update: publicProcedure
    .input(
      z.tuple([
        z.number(),
        z.object({
          dateUpload: z.string().optional(),
          dateExpire: z.string().optional(),
          notes: z.string().optional(),
          state: z.boolean().optional(),
        }),
        z.object({
          name: z.string().optional(),
          email: z.string().optional(),
          number: z.number().optional(),
          persons: z.array(personOptional).optional(),
          image: AssetInput.optional(),
          images: z.array(AssetInput).optional(),
        }),
      ]),
    )
    .mutation(async ({ input: [parentId, parent, revision] }) => {
      const single = await prisma.single.upsert({
        where: {
          id: parentId,
        },
        create: {
          ...parent,
        },
        update: {
          ...parent,
        },
      });

      const rev = await prisma.singleRevision.create({
        data: {
          ...revision,
          revisionName: getRevisionName(),
          image: {},
          images: {},
          persons: {},
          Single: {
            connect: {
              id: single.id,
            },
          },
        },
      });

      updateGroup(revision.persons, (o) => {
        return prisma.person.create({
          data: {
            firstname: o.firstname ?? '',
            lastname: o.lastname ?? '',
            email: o.email ?? '',
            phone: o.phone ?? '',
            singleId: rev.id,
          },
        });
      });

      updateAsset(revision.image, 'singleImageId', rev.id);
      updateAssets(revision.images, 'singleImagesId', rev.id);
    }),
});
