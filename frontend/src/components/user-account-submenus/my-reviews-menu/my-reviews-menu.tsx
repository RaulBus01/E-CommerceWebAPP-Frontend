import React from "react";
import '../my-orders-menu/my-orders-menu.css'
import Spinner from "../../spinner/spinner";
import  {formatDateTime}  from "../../../utils/formatDataTime";
import DeleteIcon from '@mui/icons-material/Delete';
import useReview from "../../../hooks/useReview";
import { userData } from "../../../types/UserType";

const MyReviewsMenu = ({token,user}:{token:string,user?:userData | null}) => {
    const { reviews, loading: reviewsLoading,deleteReview,setReviews } =  useReview(token as string);
   console.log(reviews);
    if(reviewsLoading){
        return(
            <div className="my-orders-menu">
                <Spinner/>
            </div>
        );
    }
    const handleDeleteReview = async (reviewId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this review?");
        if(!confirmDelete) return;

        await deleteReview(reviewId);
        const newReviews = reviews?.filter((review) => review._id !== reviewId) || null;
        setReviews(newReviews);

    }
    console.log(reviews);

    return (
        <>
            <div className="my-orders-menu">
                <h2>My Reviews</h2>
                {reviews && reviews.length > 0 ? (
                    <div className="orders-container">
                        {reviews.map((review) => (
                            <div key={review._id} className="order-item">
                                <p>{review.product.name}</p>
                                <p><strong>on:</strong> {formatDateTime(review.createdAt)}</p>
                                <p><strong>{review.title}</strong></p> 
                                
                                <p><strong>Rating:</strong> {review.rating}</p>
                                <p>{review.content}</p>
                             
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