import { useCallback, useEffect, useState } from "react";
import { postReviewData, reviewData } from "../types/ReviewType";
import { _get, _post } from "../utils/api";

interface UseReviewResult{
    reviews: reviewData[] | null;
    loading: boolean;
    fetchReviewsByProduct: (productId: string) => Promise<void>;
    createReview: (review: postReviewData) => Promise<reviewData | undefined>;
}

const useReview = (token: string, productId: string): UseReviewResult => {
    const [reviews, setReviews] = useState<reviewData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchReviewsByProduct = useCallback(async (productId: string) => {
        setLoading(true);
        try{
            const response = await _get(`/reviews/getReviewsForProduct/${productId}`, {}, {});
            const res: reviewData[] = response;
            setReviews(res);
        }catch(error:any){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }, [productId]);

    const fetchReviewsByUser = useCallback(async (token: string) => {
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
    }, [token]);

    const createReview = useCallback(async (review: postReviewData) => {
        setLoading(true);
        try{
            const response = await _post(`/reviews/addReview`, review, token);
            const res: reviewData = response;
            setReviews((prevReviews) => (prevReviews ? [res, ...prevReviews] : [res]));
            return res;
        }catch(error:any){
            console.log(error);
        }finally{
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        
        fetchReviewsByProduct(productId);
        
    },[productId, fetchReviewsByProduct]);

    useEffect(() => { 
        if(token){
            fetchReviewsByUser(token);
        }
    }, [token, fetchReviewsByUser]);

    return {reviews, loading, fetchReviewsByProduct, createReview};
}

export default useReview;