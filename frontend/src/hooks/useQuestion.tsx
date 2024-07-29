import { useEffect, useState } from "react";
import { questionData } from "../types/UserType";

interface useQuestionResult{
    questions: questionData[]| null;
    loading: boolean;
    replies: string[]
}

const useQuestion = (userId: string, token: string): useQuestionResult => {
    const [questions, setQuestions] = useState<string[]| null>(null);
    const [replies, setReplies] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchQuestions = async (userId: string, token: string) => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:3001/api/question//findUserQuestion/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `Bearer ${token}`,
                    },
                });
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                const res: questionData[] = await response.json();
                setQuestions(res);
               
            }catch(error:any){
                console.log(error);
            }finally{
                setLoading(false);
            }
        };

        if(userId){
            fetchQuestions(userId, token);
        }
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