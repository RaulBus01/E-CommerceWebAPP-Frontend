import { useCallback, useState } from "react"
import { postReplyData, replyData } from "../types/ReplyType"
import { _post } from "../utils/api";

interface UseReplyResult{
    loading: boolean;
    createReply: (reply: postReplyData) => Promise<replyData | undefined>;
}

const useReply = (token: string): UseReplyResult => {
    const [loading, setLoading] = useState(false);

    const createReply = useCallback(async (reply: postReplyData) => {
        setLoading(true);
        try{
            const response = await _post(`/reply/addReply`, reply, token);
            const res: replyData = response.reply;
            return res;
        }catch(error:any){
            console.log("Error creating reply:", error);
        }finally{
            setLoading(false);
        }
    }, [token]);

    return {createReply, loading};
}

export default useReply;