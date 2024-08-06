import React from "react";
import "./questions-submenu.css";
import {formatDateTime} from "../../../utils/formatDataTime.ts";

const QuestionsSubmenu = ({questions}) => {
    return(
        <div className="product-reviews-container">
          <div className="product-reviews-header">
            <h1>Questions about the product</h1>
            <button>Add a question</button>
          </div>
          <div className="question-cells-container"> 
            {questions && questions.map((question) => (
              <div key={question._id} className="question-cell">
                <div className="question-container">
                    <div className="left-review-cell">
                        <h3>{question.user.name} asked:</h3>
                        <p>{question.content}</p>
                    </div>
                    <div className="right-review-cell">
                    <div className="review-rating-container">
                    </div>
                    <p>Posted on: <strong>{formatDateTime(question.createdAt)}</strong></p>
                    </div>
                </div>
                <div className="replies-container">
                {question.replies.map((reply) => (
                    <div key={reply._id} className="reply-cell">
                        <div className="left-review-cell">
                            <h3>{reply.user.name} replied:</h3>
                            <p>{reply.content}</p>
                        </div>
                        <div className="right-review-cell">
                            <p>Posted on: <strong>{formatDateTime(reply.createdAt)}</strong></p>
                        </div>
                    </div>
                ))}
                </div> 
              </div>
            ))}
          </div>
        </div>
    );
}
export default QuestionsSubmenu;