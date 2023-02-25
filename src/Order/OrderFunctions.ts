import { PrismaClient } from "@prisma/client";
import { Product, TypeOrder } from "../utils/@types";


export const getProductsOrder = (prisma: PrismaClient, orderId: number) => {
    return prisma.orderProduct.findMany({
        where: {
            orderId: orderId
        },
        select: {
            product: true,
            quantity: true
        }
    })
}