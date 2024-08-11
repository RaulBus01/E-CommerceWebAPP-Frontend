import React, { useEffect } from "react";
import '../my-orders-menu/my-orders-menu.css'

import  {formatDateTime}  from "../../../utils/formatDataTime";
import DeleteIcon from '@mui/icons-material/Delete';
import useReview from "../../../hooks/useReview";
import { userData } from "../../../types/UserType";
import { useNavigate } from "react-router";

const MyReviewsMenu = ({token,user}:{token:string,user?:userData | null}) => {
    const { reviews, loading: reviewsLoading, deleteReview, setReviews, fetchReviewsByUser } =  useReview(token as string)
    
    const navigate = useNavigate();

    useEffect(() => { 
        if(token){
            fetchReviewsByUser(token);
        }
    }, [token]);

    const handleDeleteReview = async (reviewId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if(!confirmDelete) return;

        await deleteReview(reviewId);
        const newReviews = reviews?.filter((review) => review._id !== reviewId) || null;
        setReviews(newReviews);

    };

    const handleImageClick = (productId: string) => {
        navigate(`/product/${productId}`);
    }

    if(reviewsLoading){
        return(
            <div className="my-orders-menu">
                <h2>My Reviews</h2>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <>
            <div className="my-orders-menu">
                <h2>My Reviews</h2>
                {reviews && reviews.length > 0 ? (
                    <div className="orders-container">
                        {reviews.map((review) => (
                            <div key={review._id} className="order-item">
                                <div className="review-data">
                                    <p><strong>Product:</strong> {review.product.name}</p>
                                    <p><strong>Reviewed on:</strong> {formatDateTime(review.createdAt)}</p>
                                    <p><strong>Review title: </strong>{review.title}</p> 
                                    
                                    <p><strong>Rating:</strong> {review.rating}</p>
                                    <p><strong>Review message:</strong> {review.content}</p>
                                </div>
                                <div>
                                    <img src={review.product.images[0]} onClick={() => handleImageClick(review.product._id)}></img>
                                </div>
                                {user?.role === 'admin' && (
                                <span>
                                    <DeleteIcon onClick={() => handleDeleteReview(review._id)} />
                                </span>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You didn't write any reviews :'</p>
                )}
            </div>
        </>
      );
}
export default MyReviewsMenu