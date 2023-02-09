import { Product } from "../utils/@types";
import { PrismaClient, Prisma } from "@prisma/client";



const prisma = new PrismaClient({
    // log: ['query']
});

export const newORderProduct = async (order: any, products: Product[]) => {
    for (let i = 0; i < products.length; i++) {
        await prisma.orderProduct.create({
            data: {
                orderId: Number(order.id),
                productId: Number(products[i].id),
                quantity: products[i].quantity
            }
        })
    }

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

export const updateQuantityinStock = async (product: Product) => {

    const productStock = await listAllProducts()
    const stock = productStock.find(item => item.id === product.id)
    if (stock) {
        // if quantity in stock > quantity requested, update quantity  
        if (stock.quantity > product.quantity) {
            updateProduct(product, stock.quantity)
        }
        else {
            throw new Error('Produto não encontrado')
        }




    }
}

async function updateProduct(product: Product, stock: number) {
    try {
        await prisma.product.update({
            where: {
                id: product.id,
            },
            data: {
                quantity: stock - product.quantity
            }
        })
    } catch (e) {
        console.log(e)
        throw new Error('Não Foi Possivel alterar produto')
    }

}