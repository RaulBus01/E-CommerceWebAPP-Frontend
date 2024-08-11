import React, { useState } from "react";
import './my-questions-menu.css';

import {formatDateTime} from "../../../utils/formatDataTime";
import useQuestion from "../../../hooks/useQuestion";
import DeleteIcon from '@mui/icons-material/Delete';
import useReply from "../../../hooks/useReply";
import { userData } from "../../../types/UserType";
const MyQuestionsMenu = ({token,userId,user} : {token:string,userId?:string,user?:userData}) => {
    
    console.log(userId);
    const [visibleReplies, setVisibleReplies] = useState({});
    const { questions, loading: questionLoading,setQuestions,deleteQuestion } = userId ? useQuestion(token,userId) : useQuestion(token,'admin');

    console.log(questions);

    const {deleteReply} = useReply(token);

    useEffect(() => {
        if (userId) {
            fetchQuestionsByUser();
        }
    }, [userId, fetchQuestionsByUser]);
   
    const handleDeleteReply = async (replyId) => {

        const confirmDelete = window.confirm("Are you sure you want to delete this reply?");
        if(!confirmDelete) return;

        await deleteReply(replyId);
        questions?.forEach((question) => {
            question.replies = question?.replies?.filter((reply) => reply.id !== replyId);
        });
        setQuestions([...questions]);
    }
    const handleDeleteQuestion = async (questionId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if(!confirmDelete) return;

        await deleteQuestion(questionId);
        setQuestions(questions?.filter((question) => question.id !== questionId));
    }
 

    const handleRepliesVisibility = (questionId) => {
       
    
        setVisibleReplies(prev => ({
            ...prev,
            [questionId]: !prev[questionId]
        }));
    };
    console.log(questions);
    return (
        <div className="my-questions-menu">
            <div className="questions-header">
                <h2>My Questions</h2>
            </div>
            {questions && questions.length > 0 ? (
                <div className="questions-container">
                    {questions.map((question) => (
                        <div key={question.id} className="question-item">
                          <div className="question-data">
                             <div className="question-product">
                                        <img src={question?.product?.images[0]}></img>
                                        <div className="product-name">{question?.product?.name}</div>
                            </div>
                            <div className="question-content">
                                <div className="question-info"> {question?.user?.name} </div>
                                <p className="question-date">on: {formatDateTime(question.createdAt)}</p>

                                <div className="question-content">
                                    <p>{question.content}</p>
                                </div>
                                <button onClick={() => handleRepliesVisibility(question.id)} className="btn btn-primary">
                                
                                {question.replies?.length} Answers
                                </button>
                                {
                                visibleReplies[question.id] && (
                                    <div className="question-replies-container">
                                        {question.replies?.map((reply) => (
                                            <div key={reply.id} className="reply-item">
                                                <div className="reply-data">
                                                    <div className="reply-info">{reply.user.name}</div>
                                                    <p className="reply-date">on: {formatDateTime(reply.createdAt)}</p>
                                                    <div className="reply-content">
                                                        <p>{reply.content}</p>
                                                    </div>
                                                </div>
                                               
                                                    {user?.role === 'admin' && (
                                                         <div className="reply-actions">
                                                        <DeleteIcon onClick={() => handleDeleteReply(reply.id)}/>
                                                        </div>
                                                    )}
                                              
                                            </div>
                                        ))}
                                    </div>
                                )
                            }
                            </div>
                            
                           
                                    
                               

                        </div>
                            {user?.role === 'admin' && (
                                <div className="questions-actions">
                                    <DeleteIcon onClick={() => handleDeleteQuestion(question.id)}/>
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
export default MyQuestionsMenu  