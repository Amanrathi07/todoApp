// packages/database/src/index.ts

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

function CreatePrismaClient(){
    const adapter = new PrismaPg({connectionString:process.env.DATABASE_URL!})

    return new PrismaClient({adapter})
}

export const prismaClient = globalThis.prisma ??  CreatePrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;