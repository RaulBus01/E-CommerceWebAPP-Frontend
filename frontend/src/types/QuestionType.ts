import { replyData } from "./ReplyType";
import { reviewUserData } from "./UserType";

interface questionData{
    id: string;
    user: reviewUserData;
    productId: string;
    content: string;
    createdAt: string;        
    updatedAt: string;
    replies?: replyData[];
}
interface postQuestionData{
    productId: string;
    content: string;
}
export type {questionData, postQuestionData}; 