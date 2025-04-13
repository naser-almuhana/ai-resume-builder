import { PrismaClient } from "@/generated/prisma"
import { neonConfig } from "@neondatabase/serverless"
import { PrismaNeon } from "@prisma/adapter-neon"
import ws from "ws"

import { env } from "@/lib/env"

neonConfig.webSocketConstructor = ws

const globalForPrisma = global as unknown as {
  prisma: PrismaClient
}

const connectionString = `${env.DATABASE_URL}`
const adapter = new PrismaNeon({ connectionString })

const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma
