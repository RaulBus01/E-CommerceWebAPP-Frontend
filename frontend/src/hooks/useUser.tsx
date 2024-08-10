import { useCallback, useEffect, useState } from "react";
import { userData } from "../types/UserType";
import toast from 'react-hot-toast'
import { _get, _put } from "../utils/api";
import { useAuth } from "./useAuth";
import Cookies from 'js-cookie';

interface UseUserResult{
    user: userData | null;
    loading: boolean;
    editUser: (updates: Partial<userData>) => Promise<void>;
    fetchUsers : () => Promise<userData[] | undefined>;
}

const useUser = (): UseUserResult => {

    const [loading, setLoading] = useState<boolean>(true);
    
    const {token,user} = useAuth();
    
    // useEffect(() => {
    //     const fetchUser = async () => {
    //         setLoading(true);
    //         try{
    //             const response = await _get(`/users/find/${user?.id}`, token);

    //             const res: userData = response;
    //             console.log(res);
              
    //         }catch(error: any){
    //             console.error(error);
    //         } finally{
    //             setLoading(false);
    //         }
    //     };

    //     if(user){
    //         fetchUser();
    //     }

    // }, [token]);

    const editUser = useCallback(
        async (updates: Partial<userData>) => {
            setLoading(true);
            try{
                
                const response = await _put(`/users/edit`, updates,token);
                Cookies.set('accessToken', response.accessToken);
                toast.success('User updated successfully');
            
            }
            catch(error: any){
                console.error(error);
                toast.error('Failed to update user');
            }
            finally{
                setLoading(false);
            }
        }   
    ,[token]);
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try{
            const response = await _get(`/users/all`,token);
            console.log(response);
            return response;
        }
        catch{
            console.error('Error fetching users');
            toast.error('Error fetching users');
        }
        finally{
            setLoading(false);
        }
    },[token]);


    return {user,loading,editUser,fetchUsers};
};

export default useUser;