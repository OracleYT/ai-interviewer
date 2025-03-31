'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getPrismaClient(){
    if (prisma) {
        return prisma
    } else {
        throw new Error('Prisma client not initialized')
    }
}

export default getPrismaClient