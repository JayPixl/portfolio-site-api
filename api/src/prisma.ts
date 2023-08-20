import { PrismaClient } from "@prisma/client"

let prisma: PrismaClient
declare global {
    var __db: PrismaClient | undefined
}

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient()
    try {
        prisma.$connect()
            .then(() => console.log("💿 Database connected! 💿"))
    } catch {
        console.error("❗ Could not connect to database! ❗")
    }
} else {
    if (!global.__db) {
        global.__db = new PrismaClient()
        try {
            global.__db.$connect()
                .then(() => console.log("💿 Database connected! 💿"))
        } catch {
            console.error("❗ Could not connect to database! ❗")
        }
    }
    prisma = global.__db
}

export { prisma }