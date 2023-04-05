import { RegisterEntry } from "@prisma/client"
import { prisma } from "../../server"
import { Product, ProductEntryDTO } from "../utils/@types"
import { convertHoursStringToMinutes, getHour } from "../utils/converter"
import { formatDate } from "../utils/data-converter"


export const newEntry = async (entry: Product) => {

    return prisma.registerEntry.create({
        data: {
            productId: Number(entry.id),
            quantity: Number(entry.quantity),
            date: formatDate(),
            hour: convertHoursStringToMinutes(getHour())
        },

    })
}

export async function updateProductEntry(product: Product, productStock: Product[]) {
    const stock = productStock.find(item => item.id === product.id)
    const value = stock ? stock.quantity : 0

    await prisma.product.updateMany({
        where: {
            id: product.id,
        },
        data: {
            quantity: value + product.quantity
        }
    })


}

export async function getAllRecords() {
    return await prisma.registerEntry.findMany({
        select: {
            id: true,
            quantity: true,
            product: true,
            date: true,
            hour: true,

        },
        orderBy: {
            id: 'desc'
        }
    })
}

export const listAllProducts = async () => {
    return await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            quantity: true,
        }
    })
}
