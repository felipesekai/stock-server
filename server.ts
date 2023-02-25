import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import express, { json, query, response } from 'express';
import { getProductsOrder } from './src/Order/OrderFunctions';
import { editProduct, findProductsById } from './src/products/ProducsService';
import { TypeOrder, Product } from './src/utils/@types';
import { convertHoursStringToMinutes, convertMinutesToHoursString, getHour } from './src/utils/converter';
import { formatDate } from './src/utils/data-converter';
import { error } from './src/utils/errorMsg';
// import { newORderProduct, updateQuantityinStock } from "./src/Order/OrderFunctions";

const app = express();
app.use(express.json());
app.use(cors())

const prisma = new PrismaClient({
    log: ['query'],

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
});
//get product by id
app.get('/product/:id', async (req, res) => {
    const id: number = Number(req.params.id)
    const product = await findProductsById(prisma, id)
    console.log(product)
    return product
})
//get product order by id order
app.get('/product/order/:id', async (req, res) => {
    const id: number = Number(req.params.id)
    const orderProduct = (await getProductsOrder(prisma, id)).map(prod => { return { ...prod.product, quantity: prod.quantity } })
    return res.status(201).json(orderProduct)
})

// //put new product
app.put('/product/edit', async (request, response) => {

    const product = request.body;

    const edit = editProduct(prisma, product)

    return response.status(201).json(edit);


});
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

    const orders = await prisma.order.findMany({
        select: {
            id: true,
            name: true,
            total: true,
            date: true,
            hour: true,
            product: true,
            paymentMethod: true
        },
        orderBy: {
            id: 'desc'
        }
    })

    return response.json(
        (orders).map(order => {
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
        const productStock = await listAllProducts() as Product[]

        await Promise.all(
            order.products.map((product) => updateQuantityinStock(product, productStock))

        ).then(async () => {
            const newOrder: any = await prisma.order.create({
                data: {
                    name: order.name ? order.name : "",
                    total: Number(order.total),
                    date: order.date ? order.date : formatDate(),
                    hour: convertHoursStringToMinutes(getHour()),
                    paymentMethod: order.paymentMethod && order.paymentMethod
                }
            });

            await newORderProduct(newOrder, order.products)
            return response.status(201).json(newOrder);

        }).catch((e) => {
            console.log("LOGERROR: " + e)
            const newerror = error("error status code 500", "Aconteceu um erro ao tentar atualizar os produtos, tente novamente!", 500)
            return response.sendStatus(500).jsonp(newerror)

        })

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


const updateQuantityinStock = async (product: Product, productStock: Product[]) => {

    const stock = productStock.find(item => item.id === product.id)
    if (stock) {
        // if quantity in stock > quantity requested, update quantity  
        if (stock.quantity >= product.quantity) {
            await updateProduct(product, stock.quantity)
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
    await prisma.product.updateMany({
        where: {
            id: product.id,
        },
        data: {
            quantity: stock - product.quantity
        }
    })


}

app.listen(3333);

