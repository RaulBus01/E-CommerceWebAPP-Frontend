import { reviewUserData } from "./UserType";

interface replyData{
    id: string;
    user: reviewUserData;
    content: string;
    createdAt: string;
    updatedAt: string;
}
export type {replyData};