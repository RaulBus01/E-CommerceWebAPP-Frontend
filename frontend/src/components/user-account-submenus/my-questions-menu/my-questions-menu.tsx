import React, { useState } from "react";
import '../my-orders-menu/my-orders-menu.css'
import Spinner from "../../spinner/spinner";
import {formatDateTime} from "../../../utils/formatDataTime";
import useQuestion from "../../../hooks/useQuestion";
import DeleteIcon from '@mui/icons-material/Delete';
import useReply from "../../../hooks/useReply";
import { userData } from "../../../types/UserType";
const MyQuestionsMenu = ({token,userId,user} : {token:string,userId?:string,user?:userData}) => {
    
 
    const [visibleReplies, setVisibleReplies] = useState({});
    const { questions, loading: questionLoading,setQuestions,deleteQuestion } = userId ? useQuestion(token,userId) : useQuestion(token);

    const {deleteReply} = useReply(token);

 
   
    if(questionLoading){
        return(
            <div className="my-orders-menu">
                <Spinner/>
            </div>
        );
    }
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
        <div className="my-orders-menu">
            <h2>My Questions</h2>
            {questions && questions.length > 0 ? (
                <div className="orders-container">
                    {questions.map((question) => (
                        <div key={question.id} className="order-item">
                            <p><strong>{question?.user?.name} asked:</strong></p>
                            <p><strong>on:</strong> {formatDateTime(question.createdAt)}</p>
                            <p>{question.content}</p>
                            {user?.role === 'admin' && (
                                <span>
                                    <DeleteIcon onClick={() => handleDeleteQuestion(question.id)}/>
                                </span>
                            )}   
                            <button 
                                onClick={() => handleRepliesVisibility(question.id)} 
                                className="btn btn-primary"
                            >
                               
                                {question.replies?.length} Answers
                            </button>
                            {visibleReplies[question.id] && (
                                <div className="replies-container">
                                    {question.replies?.map((answer) => (
                                        console.log(answer),
                                        <div key={answer.id} className="reply-item">
                                            <p><strong>{answer.user.name} replied:</strong></p>
                                            <p><strong>on:</strong> {formatDateTime(answer.createdAt)}</p>
                                            <p>{answer.content}</p>
                                           {user?.role === 'admin' && (
                                            <span>
                                                <DeleteIcon onClick={() => handleDeleteReply(answer.id)}/>
                                            </span>
                                            )}
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