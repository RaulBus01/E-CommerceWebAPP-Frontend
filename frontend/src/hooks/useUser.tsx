import { useCallback, useEffect, useState } from "react";
import { userData } from "../types/UserType";
import toast from 'react-hot-toast'
import { _get } from "../utils/api";
import { useAuth } from "./useAuth";

interface UseUserResult{
    user: userData | null;
    localUser: userData | null;
    loading: boolean;
    editUser: (updates: Partial<userData>) => Promise<void>;
}

const useUser = (): UseUserResult => {
    const [localUser, setLocalUser] = useState<userData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const {token,user} = useAuth();
    
    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try{
                const response = await _get(`/users/find/${user?.id}`, token);

                console.log(response);
                const res: userData = response;
                setLocalUser(res);
            }catch(error: any){
                console.error(error);
            } finally{
                setLoading(false);
            }
        };

        if(user){
            fetchUser();
        }

    }, [token]);

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
                setLocalUser((prevUser) => ({
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

    return {user,localUser, loading, editUser};
};

export default useUser;