import { useCallback, useEffect, useState } from "react";
import { questionData } from "../types/Question";
import { _get } from "../utils/api";

interface useQuestionResult{
    questions: questionData[]| null;
    loading: boolean;
    replies: string[];
    fetchQuestionsByProduct: (productId: string) => Promise<void>;
}

const useQuestion = (userId: string, token: string, productId: string): useQuestionResult => {
    const [questions, setQuestions] = useState<questionData[]| null>(null);
    const [replies, setReplies] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchQuestionsByProduct = useCallback(async (productId: string) => {
        setLoading(true);
        try {
            const response = await _get(`/question/findQuestion/${productId}`, token);
            const res: questionData[] = response.questions;
            setQuestions(res);
        } catch (error: any) {
            console.log("Error fetching questions by product:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchQuestionsByUser = useCallback(async (userId: string) => {
        setLoading(true);
        try {
            const response = await _get(`/question/findUserQuestion/${userId}`, token);
            const res: questionData[] = response.questions;
            console.log("User Questions:", res);
            setQuestions(res);
        } catch (error: any) {
            console.log("Error fetching questions by user:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (productId) {
            fetchQuestionsByProduct(productId);
        }
    }, [productId, fetchQuestionsByProduct]);

    useEffect(() => {
        if (userId) {
            fetchQuestionsByUser(userId);
        }
    }, [userId, fetchQuestionsByUser]);

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

    return {questions, loading, replies, fetchQuestionsByProduct};
}

export default useQuestion;