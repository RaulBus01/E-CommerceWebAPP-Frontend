import { replyData } from "./Reply";

interface questionData{
    _id: string;
    user: string;
    productId: string;
    content: string;
    createdAt: string;        
    updatedAt: string;
    replies?: replyData[];
}
export type {questionData}; 