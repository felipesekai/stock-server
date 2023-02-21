import { PrismaClient } from "@prisma/client";
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