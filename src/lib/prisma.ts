import { PrismaClient } from "@/generated/prisma";
import { withAccelerate } from '@prisma/extension-accelerate'
const globalForPrisma = global as unknown as { prisma: ReturnType<PrismaClient['$extends']> };

export const prisma = new PrismaClient().$extends(withAccelerate())
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;