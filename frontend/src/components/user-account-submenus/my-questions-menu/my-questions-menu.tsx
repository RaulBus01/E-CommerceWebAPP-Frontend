import React, { useState } from "react";
import '../my-orders-menu/my-orders-menu.css'
import Spinner from "../../spinner/spinner";
import formatDateTime from "../../../utils/formatDataTime";

const MyQuestionsMenu = ({questions, loading}) => {
    
    const [visibleReplies, setVisibleReplies] = useState({});

    if(loading){
        return(
            <div className="my-orders-menu">
                <Spinner/>
            </div>
        );
    }
    console.log(questions)

    const handleRepliesVisibility = (questionId) => {
    
        setVisibleReplies(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };

    return (
        <div className="my-orders-menu">
            <h2>My Questions</h2>
            {questions && questions.length > 0 ? (
                <div className="orders-container">
                    {questions.map((question) => (
                        <div key={question.id} className="order-item">
                            <p><strong>Content:</strong> {question.content}</p>
                            <p><strong>Placed at:</strong> {formatDateTime(question.createdAt)}</p>
                            <button 
                                onClick={() => handleRepliesVisibility(question.id)} 
                                className="btn btn-primary"
                            >
                                {question.replies.length} Answers
                            </button>
                            {visibleReplies[question.id] && (
                                <div className="replies-container">
                                    {question.replies.map((answer) => (
                                        console.log(answer),
                                        <div key={answer.id} className="reply-item">
                                            <p><strong>Answer:</strong> {answer.content}</p>
                                            <p><strong>Placed at:</strong> {formatDateTime(answer.createdAt)}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <p>You haven't written any questions yet.</p>
            )}
        </div>
    );
}

export default MyQuestionsMenu;