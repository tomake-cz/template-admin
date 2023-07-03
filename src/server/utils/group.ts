import { PrismaPromise } from '@prisma/client';
import { prisma } from '../prisma/script';

type Obj = {
  id?: number;
} & Record<string, unknown>;
export const updateGroup = async <T extends Obj>(
  group: T[] | undefined,
  create: (obj: T) => PrismaPromise<T>,
) => {
  if (!group) return;

  await prisma.$transaction(
    group.map((step) => {
      return create(step);
    }),
  );
};
