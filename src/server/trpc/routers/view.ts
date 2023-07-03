import { z } from 'zod';
import { prisma } from '../../prisma/script';
import { publicProcedure, router } from '../trpc';

const include = {
  keys: true,
  filters: true,
} as const;

const FilterInput = z.object({
  id: z.string(),
  viewId: z.number(),
  key: z.string(),
  type: z.union([z.literal('string'), z.literal('none')]),
  constraint: z.union([
    z.literal('is'),
    z.literal('!is'),
    z.literal('contains'),
    z.literal('!contains'),
    z.literal('starts'),
    z.literal('!starts'),
    z.literal('ends'),
    z.literal('!ends'),
    z.literal('empty'),
    z.literal('!empty'),
  ]),
  value: z.string(),
});
const KeyInput = z.object({
  name: z.string(),
  type: z.string(),
  enabled: z.boolean(),
});

const UpdateViewInput = z.object({
  id: z.number(),
  name: z.string().optional(),
  modelName: z.string().optional(),
  sortName: z.string().optional(),
  sortDir: z.string().optional(),
  filters: z.array(FilterInput).optional(),
  keys: z.array(KeyInput).optional(),
});

export const viewRouter = router({
  createView: publicProcedure
    .input(
      z.object({
        isEditable: z.boolean().optional(),
        name: z.string(),
        modelName: z.string(),
        sortName: z.string().optional(),
        sortDir: z.string().optional(),
        filters: z.array(FilterInput).optional(),
        keys: z.array(KeyInput),
      }),
    )
    .mutation(async ({ input }) => {
      const view = await prisma.view.create({
        include,
        data: {
          ...input,
          sortName: input.sortName ?? undefined,
          sortDir: input.sortDir ?? undefined,
          filters: {
            createMany: {
              data: input.filters ?? [],
            },
          },
          keys: {
            create: input.keys,
          },
        },
      });

      return view;
    }),
  getView: publicProcedure
    .input(
      z.object({
        name: z.string(),
        modelName: z.string(),
      }),
    )
    .query(async ({ input: { name, modelName } }) => {
      const view = await prisma.view.findUnique({
        include,
        where: {
          name_modelName: {
            name,
            modelName,
          },
        },
      });

      return view;
    }),
  getViews: publicProcedure.input(z.string()).query(async ({ input }) => {
    const views = await prisma.view.findMany({
      include,
      where: {
        modelName: input,
      },
    });

    return views;
  }),
  updateView: publicProcedure
    .input(UpdateViewInput)
    .mutation(async ({ input }) => {
      const { id, name, modelName, sortName, sortDir, filters } = input;
      const view = await prisma.view.update({
        include,
        where: {
          id,
        },
        data: {
          name: name ?? undefined,
          modelName: modelName ?? undefined,
          sortName: sortName ?? undefined,
          sortDir: sortDir ?? undefined,
          filters: {
            upsert: filters?.map((f) => ({
              where: {
                id_viewId: {
                  id: f.id,
                  viewId: f.viewId,
                },
              },
              update: {
                id: f.id,
                viewId: f.viewId,
                key: f.key,
                type: f.type,
                constraint: f.constraint,
                value: f.value,
              },
              create: {
                id: f.id,
                viewId: f.viewId,
                key: f.key,
                type: f.type,
                constraint: f.constraint,
                value: f.value,
              },
            })),
          },
          keys: {
            upsert: input.keys?.map((k) => ({
              where: {
                name_viewId: {
                  name: k.name,
                  viewId: id,
                },
              },
              update: {
                name: k.name,
                type: k.type,
                enabled: k.enabled,
              },
              create: {
                name: k.name,
                type: k.type,
                enabled: k.enabled,
              },
            })),
          },
        },
      });

      return view;
    }),
  deleteView: publicProcedure.input(z.number()).mutation(async ({ input }) => {
    const view = await prisma.view.delete({
      include,
      where: {
        id: input,
      },
    });

    return view;
  }),
  setViewKey: publicProcedure
    .input(
      z.object({
        name: z.string(),
        viewId: z.number(),
        enabled: z.boolean(),
      }),
    )
    .mutation(async ({ input: { name, viewId, enabled } }) => {
      const key = await prisma.viewKey.update({
        where: {
          name_viewId: {
            name,
            viewId,
          },
        },
        data: {
          enabled,
        },
      });

      return {
        id: key.id,
        name: key.name,
        type: key.type,
        enabled: key.enabled,
      };
    }),
  updateViews: publicProcedure
    .input(z.array(UpdateViewInput))
    .mutation(async ({ input }) => {
      const views = await prisma.$transaction(
        input.map((v) =>
          prisma.view.update({
            include,
            where: {
              id: v.id,
            },
            data: {
              name: v.name ?? undefined,
              modelName: v.modelName ?? undefined,
              sortName: v.sortName ?? undefined,
              sortDir: v.sortDir ?? undefined,
              filters: {
                upsert:
                  v.filters?.map((f) => ({
                    where: {
                      id_viewId: {
                        id: f.id,
                        viewId: v.id,
                      },
                    },
                    update: {
                      id: f.id,
                      // viewId: v.id,
                      key: f.key,
                      type: f.type,
                      constraint: f.constraint,
                      value: f.value,
                    },
                    create: {
                      id: f.id,
                      // viewId: v.id,
                      key: f.key,
                      type: f.type,
                      constraint: f.constraint,
                      value: f.value,
                    },
                  })) ?? [],
              },
              keys: {
                upsert: v.keys?.map((k) => ({
                  where: {
                    name_viewId: {
                      name: k.name,
                      viewId: v.id,
                    },
                  },
                  update: {
                    name: k.name,
                    type: k.type,
                    enabled: k.enabled,
                  },
                  create: {
                    name: k.name,
                    type: k.type,
                    enabled: k.enabled,
                  },
                })),
              },
            },
          }),
        ),
      );

      await prisma.filter.deleteMany({
        where: {
          id: {
            notIn: input.flatMap((v) => v.filters?.map((f) => f.id) ?? []),
          },
          viewId: {
            in: input.map((v) => v.id),
          },
        },
      });

      return views;
    }),
  deleteFilters: publicProcedure
    .input(z.array(z.object({ id: z.string(), viewId: z.number() })))
    .mutation(async ({ input }) => {
      const s = await prisma.filter.deleteMany({
        where: {
          id: {
            in: input.map((f) => f.id),
          },
          viewId: {
            in: input.map((f) => f.viewId),
          },
        },
      });
      // eslint-disable-next-line no-console
      console.log(s);
      return [];
    }),
});
