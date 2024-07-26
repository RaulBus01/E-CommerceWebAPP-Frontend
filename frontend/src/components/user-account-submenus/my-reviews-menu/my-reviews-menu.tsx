import React from "react";
import '../my-orders-menu/my-orders-menu.css'
import Spinner from "../../spinner/spinner";

const MyOrdersMenu = ({reviews, loading}) => {
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${day}-${month}-${year}; ${hours}:${minutes}`;
    };

    if(loading){
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
                            <div key={review.id} className="order-item">
                                <h3>Review ID: {review.id}</h3>
                                <p><strong>Rating:</strong> {review.rating}</p>
                                <p><strong>Content:</strong> {review.content}</p>
                                <p><strong>Placed at:</strong> {formatDateTime(review.createdAt)}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>You didn't write any reviews :'(</p>
                )}
            </div>
        </>
      );
}
export default MyOrdersMenu