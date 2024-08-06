import React from "react";
import '../my-orders-menu/my-orders-menu.css'
import Spinner from "../../spinner/spinner";
import  {formatDateTime}  from "../../../utils/formatDataTime";
import useReview from "../../../hooks/useReview";

const MyReviewsMenu = ({token}) => {
    const { reviews, loading: reviewsLoading } =  useReview(token as string);
   
    if(reviewsLoading){
        return(
            <div className="my-orders-menu">
                <Spinner/>
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
                                 <h1 key={review._id}>{review.product.name}</h1> 
                                <p><strong>Rating:</strong> {review.rating}</p>
                                <p><strong>Content:</strong> {review.content}</p>
                                <p><strong>Placed at:</strong> {formatDateTime(review.createdAt)}</p>
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