interface productDataForOrder{
    productId: string;
    quantity: number;
}
interface productData {
    _id: string;            
    id: string;             
    name: string;
    price: number;
    category: string[];
    description: string;
    image: string;
    stock: number;
    distributorId: string;
    createdAt: string;
    updatedAt: string;
    ratingProduct: number;
    numberOfReviews: number;
  }
  
export type {productDataForOrder, productData} 