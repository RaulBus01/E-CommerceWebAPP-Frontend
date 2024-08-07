import { reviewUserData } from "./UserType";

interface reviewData{
    _id:string;
    product:string
    user:reviewUserData;
    rating:number;
    content?:string;
    title:string;
    createdAt:string;
    updatedAt:string;
}

interface postReviewData{
    productId: string;
    userId: string;
    rating: number;
    title: string;
    content?: string;
}
export type {reviewData, postReviewData};