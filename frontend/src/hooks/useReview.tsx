import { useCallback, useEffect, useState } from "react";
import { reviewData } from "../types/ReviewType";
import { _get } from "../utils/api";

interface UseReviewResult{
    reviews: reviewData[] | null;
    loading: boolean;
    fetchReviewsByProduct: (productId: string) => Promise<void>;
}

const useReview = (token: string, productId: string): UseReviewResult => {
    const [reviews, setReviews] = useState<reviewData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchReviewsByProduct = useCallback(async (productId: string) => {
        setLoading(true);
        try{
            const response = await _get(`/reviews/getReviewsForProduct/${productId}`, {}, {});
            const res: reviewData[] = response;
            console.log("Product Reviews:", res);
            setReviews(res);
        }catch(error:any){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }, []);

    const fetchReviewsByUser = useCallback(async (token: string) => {
        setLoading(true);
        try{
            const response = await _get(`/reviews/getReviews`, token);
            const res: reviewData[] = response;
            console.log("User Reviews:", res);
            setReviews(res);
        }catch(error:any){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if(productId){
            fetchReviewsByProduct(productId);
        }
    },[productId, fetchReviewsByProduct]);

    useEffect(() => { 
        if(token){
            fetchReviewsByUser(token);
        }
    }, [token, fetchReviewsByUser]);

    return {reviews, loading, fetchReviewsByProduct};
}

export default useReview;