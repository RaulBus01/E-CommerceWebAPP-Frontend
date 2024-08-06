import React from "react";
import "./reviews-submenu.css";
import StarIcon from "@mui/icons-material/Star";
import {formatDateTime} from "../../../utils/formatDataTime.ts";

const ReviewsSubmenu = ({reviews, reviewRef}) => {
    return(
        <div className="product-reviews-container">
          <div className="product-reviews-header" ref={reviewRef}>
            <h1>Buyer's reviews</h1>
            <button>Add a review</button>
          </div>
          <div className="review-cells-container"> 
            {reviews && reviews.map((review) => (
              <div key={review._id} className="review-cell">
                <div className="left-review-cell">
                  <h3>{review.title}</h3>
                  <p>{review.content}</p>
                </div>
                <div className="right-review-cell">
                  <div className="review-rating-container">
                    <h3>{review.rating}</h3>
                    <StarIcon style={{ color: "yellow" }} />
                  </div>
                  <p>Posted on: <strong>{formatDateTime(review.createdAt)}</strong></p>
                  <p>Posted by: <strong>{review.user.name}</strong></p>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
}
export default ReviewsSubmenu;