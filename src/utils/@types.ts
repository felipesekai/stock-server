export type Product = {
    id?: number;
    name: string;
    description: string;
    quantity: number;
    price: number;
}

export type TypeOrder = {
    id?: string;
    name: string;
    total: number;
    products: Product[];
    date: string;
    hour: number;
}