import { OrderProduct, prisma, PrismaClient } from "@prisma/client";
import { response } from "express";
import { Product } from "../utils/@types";

export const editProduct = (prisma: PrismaClient, product: Product) => {
    prisma.product.update({
        where: {
            id: product.id!!
        },
        data: {
            name: product.name,
            description: product.description,
            price: Number(product.price),
            quantity: Number(product.quantity)
        }
    }).then((res) => {
        return res
    }).catch(error => {
        console.log(error);
        return new Error("Não Foi Possivel Editar");
    })
}

export const findProductsById = async (prisma: PrismaClient, productId: number) => {

    return await prisma.product.findFirst({
        where: {
            id: productId
        },
        select: {
            id: true,
            name: true,
            description: true,
            quantity: true,
            price: true
        },
    })
}