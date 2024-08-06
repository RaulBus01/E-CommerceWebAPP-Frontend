import { useEffect, useState } from "react";
import { reviewData } from "../types/ReviewType";
import { _get } from "../utils/api";

interface UseReviewResult{
    reviews: reviewData[] | null;
    loading: boolean;
}

const useReview = (token: string, productId: string): UseReviewResult => {
    const [reviews, setReviews] = useState<reviewData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReviewsByUser = async (token: string) => {
            setLoading(true);
            try{
                const response = await _get(`/reviews/getReviews`, token);
                const res: reviewData[] = response;
                setReviews(res);
            }catch(error:any){
                console.log(error);
            }finally{
                setLoading(false);
            }
        };

        fetchReviewsByUser(token);
    },[token]);

    useEffect(() => {
        const fetchReviewsByProduct = async (productId: string) => {
            setLoading(true);
            try{
                const response = await _get(`/reviews/getReviews/${productId}`, {}, {});
                const res: reviewData[] = response;
                setReviews(res);
            }catch(error:any){
                console.log(error);
            }finally{
                setLoading(false);
            }
        };
        if(productId){
            fetchReviewsByProduct(productId);
        }
    }, [productId]);

    return {reviews, loading};
}

export default useReview;