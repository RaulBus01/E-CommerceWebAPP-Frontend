import { useEffect, useState } from "react";
import { userData } from "../types/UserType"

interface UseUserResult{
    user: userData | null;
    loading: boolean;
}

const useUser = (userId: string, token: string): UseUserResult => {
    const [user, setUser] = useState<userData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUser = async (userId: string, token: string) => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:3001/api/users/find/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `Bearer ${token}`,
                    },
                });
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                await new Promise(f => setTimeout(f, 2000));
                const res: userData = await response.json();
                setUser(res);
            }catch(error: any){
                console.error(error);
            } finally{
                setLoading(false);
            }
        };

        if(userId){
            fetchUser(userId, token);
        }

    }, [userId, token]);
    return {user, loading};
};

export default useUser;