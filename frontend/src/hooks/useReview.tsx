import { useEffect, useState } from "react";
import { reviewData } from "../types/ReviewType";

interface UseReviewResult{
    reviews: reviewData[] | null;
    loading: boolean;
}

const useReview = (userId: string, token: string): UseReviewResult => {
    const [reviews, setReviews] = useState<reviewData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviewsByUser = async (userId: string, token: string) => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:3001/api/reviews/getReviewsByUser/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `Bearer ${token}`,
                    },
                });
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                const res: reviewData[] = await response.json();
                setReviews(res);
            }catch(error:any){
                console.log(error);
            }finally{
                setLoading(false);
            }
        };

        if(userId){
            fetchReviewsByUser(userId, token);
        }
    },[userId, token]);
    return {reviews, loading};
}

export default useReview;