import { useCallback, useEffect, useState } from "react";
import { _get, _post } from "../utils/api";
import { postQuestionData, questionData } from "../types/QuestionType";

interface useQuestionResult{
    questions: questionData[]| null;
    loading: boolean;
    fetchQuestionsByProduct: (productId: string) => Promise<void>;
    fetchQuestionsByUser: (userId: string) => Promise<void>;
    createQuestion: (question: postQuestionData) => Promise<questionData | undefined>;
}

const useQuestion = (userId: string, token: string, productId: string): useQuestionResult => {
    const [questions, setQuestions] = useState<questionData[]| null>(null);
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
            setQuestions(res);
        } catch (error: any) {
            console.log("Error fetching questions by user:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    const createQuestion = useCallback(async (question: postQuestionData) => {
        setLoading(true);
        try {
            const response = await _post(`/question/addQuestion`, question, token);
            const res: questionData = response.question;
            setQuestions((prevQuestions) => (prevQuestions ? [res, ...prevQuestions] : [res]));
            return res;
        } catch (error: any) {
            console.log("Error creating question:", error);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (productId) {
            fetchQuestionsByProduct(productId);
        }
    }, [productId, fetchQuestionsByProduct]);

    return {questions, loading, fetchQuestionsByProduct, fetchQuestionsByUser, createQuestion};
}

export default useQuestion;