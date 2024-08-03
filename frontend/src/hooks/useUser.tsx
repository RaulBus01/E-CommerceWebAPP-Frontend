import { useCallback, useEffect, useState } from "react";
import { userData } from "../types/UserType";
import toast from 'react-hot-toast'

interface UseUserResult{
    user: userData | null;
    loading: boolean;
    editUser: (updates: Partial<userData>) => Promise<void>;
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
                const res: userData = await response.json();
                console.log(res);
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

    const editUser = useCallback(
        async (updates: Partial<userData>) => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:3001/api/users/edit`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ 
                        ...updates, 
                    }),
                });
                if(!response.ok){
                    throw new Error(`Error ${response.status}`);
                }
                const updatedUser = await response.json();
                setUser((prevUser) => ({
                    ...prevUser,
                    ...updatedUser,
                }));
                toast.success("Your information has been changed!");
                console.log(updatedUser);
            }catch(error){
                console.log("Failed to edit user", error);
            }finally{
                setLoading(false);
            }
        },
        [token]
    );

    return {user, loading, editUser};
};

export default useUser;