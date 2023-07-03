import { Asset, Prisma, PrismaPromise } from '@prisma/client';
import { z } from 'zod';
import { prisma } from '../prisma/script';
import { AssetInput } from '../trpc/routers/asset';

const parseName = (name: string) => {
  const original = name.replaceAll(' ', '-').toLowerCase();
  const split = original.split('.');

  const extension = split.pop() ?? '';
  const nameWithoutExtension = split.join('.');

  return {
    name: original,
    nameNoExt: nameWithoutExtension,
    extension,
  };
};

const getUrl = (nameNoExt: string, timestamp: string, extension: string) => {
  return `/api/asset/${nameNoExt}-${timestamp}.${extension}`;
};

const upsertAsset = (
  image: z.infer<typeof AssetInput>,
  relation: keyof Prisma.AssetAvgAggregateInputType,
  id?: number,
  where?: Prisma.AssetWhereUniqueInput,
): PrismaPromise<Asset> => {
  const timestamp = new Date().getTime().toString();
  const { name, nameNoExt, extension } = parseName(image.name);

  return prisma.asset.upsert({
    where: {
      ...(where ?? {
        name_timestamp: {
          name,
          timestamp: image.timestamp ?? '-1',
        },
      }),
    },
    create: {
      title: image.name,
      name,
      type: image.type,
      size: image.size,
      extension,
      timestamp,
      url: getUrl(nameNoExt, timestamp, extension),
      blurhash: image.blurhash,
      file: {
        create: {
          bytes: Buffer.from(image?.bytes ?? []),
        },
      },
      [relation]: id ?? 0,
    },
    update: {
      title: image.name,
      name,
      type: image.type,
      size: image.size,
      extension,
      timestamp,
      url: getUrl(nameNoExt, timestamp, extension),
      blurhash: image.blurhash,
      file: {
        update: {
          bytes: Buffer.from(image?.bytes ?? []),
        },
      },
    },
  });
};

export const updateAsset = async (
  image: z.infer<typeof AssetInput> | undefined,
  relation: keyof Prisma.AssetAvgAggregateInputType,
  id?: number,
) => {
  if (!image || image.size === -1) {
    await prisma.asset.delete({
      where: {
        [relation]: id ?? 0,
      },
    });
  } else if (image && image.bytes.length > 0) {
    if (image.id) {
      await upsertAsset(image, relation, id);
    } else {
      await upsertAsset(image, relation, id, {
        [relation]: id ?? 0,
      });
    }
  } else if (image.bytes.length === 0) {
    await copyAssetToNewRevision(image, relation, id);
  }
};

export const updateAssets = async (
  images: z.infer<typeof AssetInput>[] | undefined,
  relation: keyof Prisma.AssetAvgAggregateInputType,
  id?: number,
) => {
  if (!images) return;

  const assetIds = images
    .map((x) => x.id)
    .filter((x) => x !== undefined) as number[];
  if (assetIds.length !== 0) {
    await prisma.asset.deleteMany({
      where: {
        id: {
          notIn: assetIds,
        },
        [relation]: id ?? 0,
      },
    });
  }

  await Promise.all(
    images
      .map((image) => {
        if (image.bytes.length === 0) {
          return copyAssetToNewRevision(image, relation, id);
        }

        return upsertAsset(image, relation, id);
      })
      .filter((x) => x != null) as Array<
      ReturnType<typeof prisma.asset.upsert>
    >,
  );
};

const copyAssetToNewRevision = async (
  asset: z.infer<typeof AssetInput>,
  relation: keyof Prisma.AssetAvgAggregateInputType,
  id?: number,
) => {
  const oldAsset = await prisma.asset.findUnique({
    include: {
      file: true,
    },
    where: {
      name_timestamp: {
        name: asset.name,
        timestamp: asset.timestamp ?? '-1',
      },
    },
  });

  const bytes = oldAsset?.file?.bytes;
  if (!oldAsset || !bytes) return;

  const timestamp = new Date().getTime().toString();
  const { name, nameNoExt, extension } = parseName(asset.name);
  return prisma.asset.create({
    data: {
      name,
      title: asset.name,
      url: getUrl(nameNoExt, timestamp, extension),
      extension,
      timestamp,
      size: asset.size,
      type: asset.type,
      blurhash: asset.blurhash,
      file: {
        create: {
          bytes,
        },
      },
      [relation]: id ?? 0,
    },
  });
};
