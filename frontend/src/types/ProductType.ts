import { questionData } from "./Question";
import { reviewData } from "./ReviewType";

interface productDataForOrder{
    productId: string;
    quantity: number;
}
interface productData {
    _id: string;                         
    name: string;
    price: number;
    categories: string[];
    description: string;
    image: string;
    stock: number;
    distributor: string;
    createdAt: string;
    updatedAt: string;
    ratingProduct?: number;
    numberOfReviews?: number;
    reviews?: reviewData[];
    questions?: questionData[];
  }
  
export type {productDataForOrder, productData} 