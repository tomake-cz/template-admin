import { PrismaClient } from '@prisma/client';
import { DataSource } from 'apollo-datasource';
import { MutationUpdateSingleArgs as UpdateSingleArgs } from '../types/resolvers-types';

export class SingleAPI extends DataSource {
  private context: any;
  private readonly prisma: PrismaClient;

  constructor({ prisma }: { prisma: PrismaClient }) {
    super();
    this.prisma = prisma;
  }

  initialize(config: any) {
    this.context = config.context;
  }

  async getSingle() {
    const single = await this.prisma.single.findFirst();

    console.log('getSingle', single);
    return single;
  }

  async updateSingle(values: UpdateSingleArgs) {
    const single = await this.prisma.single.upsert({
      where: { id: 0 },
      update: values,
      create: values,
    });

    console.log('updateSingle', single);
    return single;
  }
}
