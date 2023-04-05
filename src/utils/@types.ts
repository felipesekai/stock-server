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
    paymentMethod?: string | null
}
export type ProductEntryDTO = {
    id?: number;
    // name: string;
    quantity: number;
    product: Product;
    date?: string;
    hour?: number;
}