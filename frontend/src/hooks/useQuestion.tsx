import { useEffect, useState } from "react";
import { questionData } from "../types/Question";
import { _get } from "../utils/api";

interface useQuestionResult{
    questions: questionData[]| null;
    loading: boolean;
    replies: string[]
}

const useQuestion = (userId: string, token: string): useQuestionResult => {
    const [questions, setQuestions] = useState<questionData[]| null>(null);
    const [replies, setReplies] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchQuestions = async (userId: string, token: string) => {
            setLoading(true);
            try{
                const response = await _get(`/question/findUserQuestion/${userId}`, token);
        
                const res: questionData[] = response.questions;
                setQuestions(res);
                console.log(res);
               
            }catch(error:any){
                console.log(error);
            }finally{
                setLoading(false);
            }
        };

        fetchQuestions(userId, token);
    },[userId, token]);
    useEffect(() => {
        const fetchReplies = async () => {
            questions?.map(async (question) => {
                setReplies(question.replies)
            }
            )
        }
        fetchReplies();
    }
    ,[questions, token])



    return {questions, loading,replies};
}

export default useQuestion;