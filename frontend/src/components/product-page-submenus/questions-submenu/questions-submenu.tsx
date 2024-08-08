import React, { useEffect, useState } from "react";
import "./questions-submenu.css";
import {formatDateTime} from "../../../utils/formatDataTime.ts";
import useQuestion from "../../../hooks/useQuestion.tsx";
import QuestionModal from "../../modals/question-modal/question-modal.tsx";
import { postQuestionData } from "../../../types/QuestionType.ts";

const QuestionsSubmenu = ({productId, token, user}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReplyOpen, setIsReplyOpen] = useState({});

    const {questions, fetchQuestionsByProduct, createQuestion} = useQuestion(user.id, token, productId);
    console.log("Questions:", questions);
    useEffect(() => {
      fetchQuestionsByProduct(productId);
    }, [fetchQuestionsByProduct, productId]);

    const handleAddQuestion = async (question: {content: string}) => {
        const newQuestion: postQuestionData = {
          ...question,
          productId: productId,
        };
        await createQuestion(newQuestion);
    }

    const toggleReply = (questionId) => {
        setIsReplyOpen((prev) => ({...prev, [questionId]: !prev[questionId]}));
    }

    return(
        <div className="product-reviews-container">
          <div className="product-reviews-header">
            <h1>Questions about the product ({questions?.length})</h1>
            <button onClick={() => setIsModalOpen(true)}>Add a question</button>
          </div>
          <div className="question-cells-container"> 
            {questions && questions.map((question) => (
              <div key={question?.id} className="question-cell">
                <div className="question-container">
                    <div className="left-review-cell">
                        <h3>{question?.user.name || user?.name} asked:</h3>
                        <p>{question?.content}</p>
                    </div>
                    <div className="right-review-cell">
                      <div className="review-rating-container">
                      </div>
                      <p>Posted on: <strong>{formatDateTime(question?.createdAt)}</strong></p>
                    </div>
                </div>
                <div className="replies-container">
                {question?.replies && question?.replies.map((reply) => (
                    <div key={reply.id} className="reply-cell">
                        <div className="left-review-cell">
                            <h3>{reply?.user.name} replied:</h3>
                            <p>{reply?.content}</p>
                        </div>
                        <div className="right-review-cell">
                            <p>Posted on: <strong>{formatDateTime(reply?.createdAt)}</strong></p>
                        </div>
                    </div>
                ))}
                </div>
                <div className="reply-container">
                  {isReplyOpen[question.id] ? (
                    <div className="reply-container">
                      <textarea placeholder="Reply to this question"></textarea>
                      <button>Submit reply</button>
                      <button onClick={() => toggleReply(question.id)}>Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => toggleReply(question.id)}>Reply</button>
                  )}
                </div>     
              </div>
            ))}
          </div>
          <QuestionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddQuestion}></QuestionModal>
        </div>
    );
}
export default QuestionsSubmenu;