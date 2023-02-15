import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express from 'express';
import { TypeOrder, Product } from './src/utils/@types';
import { convertHoursStringToMinutes, convertMinutesToHoursString, getHour } from './src/utils/converter';
import { formatDate } from './src/utils/data-converter';
// import { newORderProduct, updateQuantityinStock } from "./src/Order/OrderFunctions";

const app = express();
app.use(express.json());
app.use(cors())

const prisma = new PrismaClient({
    log: ['query']
});

//get all
app.get('/product/all', async (request, response) => {
    const products = await prisma.product.findMany({
        select: {
            id: true,
            name: true,
            description: true,
            price: true,
            quantity: true,
        }
    })

    return response.json(products)
})

// //put new product
// app.put('/product/edit', async (request, response) => {

//     const product = request.body;

//     await prisma.product.update(product.id, product
//     )

//     return response.status(201).json(newProduct);


// });
//post new product
app.post('/product', async (request, response) => {

    const product = request.body;

    const newProduct: any = await prisma.product.create({
        data: {
            name: product.name,
            description: product.description ? product.description : '',
            price: Number(product.price),
            quantity: Number(product.quantity)
        }
    })

    return response.status(201).json(newProduct);


});

//post new order
app.get('/order/all', async (request, response) => {

    const orders = prisma.order.findMany({
        select: {
            id: true,
            name: true,
            total: true,
            date: true,
            hour: true,
            product: true,
        },
        orderBy: {
            id: 'desc'
        }
    })

    return response.json(
        (await orders).map(order => {
            return {
                ...order,
                hour: convertMinutesToHoursString(order.hour)
            }
        })
    );


});
//post new order
app.post('/order',
    async (request, response) => {

        const order: TypeOrder = request.body;
        try {
            await Promise.all(
                order.products.map((product) => updateQuantityinStock(product))

            )
        } catch (e) {
            throw e
        }

        const newOrder: any = await prisma.order.create({
            data: {
                name: order.name ? order.name : "",
                total: Number(order.total),
                date: order.date ? order.date : formatDate(),
                hour: convertHoursStringToMinutes(getHour()),
            }
        });

        await newORderProduct(newOrder, order.products)

        return response.status(201).json(newOrder);

    });



const newORderProduct = async (order: any, products: Product[]) => {
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
const listAllProducts = async () => {
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

const updateQuantityinStock = async (product: Product) => {

    const productStock = await listAllProducts()
    const stock = productStock.find(item => item.id === product.id)
    if (stock) {
        // if quantity in stock > quantity requested, update quantity  
        if (stock.quantity >= product.quantity) {
            updateProduct(product, stock.quantity)
        }
        else {
            throw new Error('Quantidade em Stock é Inferior a quantidade pedida')
        }
    }
    else {
        throw new Error('Item Não Encontrado')
    }
}

async function updateProduct(product: Product, stock: number) {

    await prisma.product.update({
        where: {
            id: product.id,
        },
        data: {
            quantity: (stock - product.quantity)
        }
    })


}

app.listen(3333);