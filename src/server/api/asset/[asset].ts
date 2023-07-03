import { prisma } from '@/server/prisma/script';

export default defineEventHandler(async (e) => {
  const namePart = e.node.req.url?.split('/').pop();

  if (!namePart) {
    return { error: 'No url' };
  }

  const lastDash = namePart.lastIndexOf('-');
  const firstDot = namePart.indexOf('.');
  const extension = namePart.slice(firstDot + 1);
  const name = namePart.slice(0, lastDash) + '.' + extension;
  const timestamp = namePart.slice(lastDash + 1, firstDot);

  const file = await prisma.asset.findUnique({
    include: {
      file: true,
    },
    where: {
      name_timestamp: {
        name,
        timestamp,
      },
    },
  });

  if (!file || !file.file) {
    return { error: 'File not found' };
  }

  return file.file.bytes;
});
