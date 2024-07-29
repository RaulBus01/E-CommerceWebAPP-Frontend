interface productDataForOrder{
    productId: string;
    quantity: number;
}
interface productData{
    productId: string;
    name: string;
    price: number;
    category: string[];
    description: string;
    image: string;
    stock: number;
    distributorId: string;
    createdAt: string;
    updatedAt: string;
    numberOfReviews: number;
    ratingProduct: number;
}
export type {productDataForOrder, productData} 