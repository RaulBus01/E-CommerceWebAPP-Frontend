import { useEffect, useState } from "react";
import { userData } from "../types/UserType";
import { useAuth } from "./useAuth";
import { _get } from "../utils/api";

interface UseDistributorResult{
    distributor: userData | null;
    loading: boolean;
    products: any;
    orders: any;

}

const useDistributor = (token:string): UseDistributorResult => {
    const [distributor, setDistributor] = useState<userData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [products, setProducts] = useState<any>(null);
    const [orders, setOrders] = useState<any>(null);
    const {user} = useAuth();
    const fetchProducts = async () => {
        setLoading(true);
        try{
            const response = await _get(`/products/findDistributor/${user?.id}`, token);
            console.log(response);
            setProducts(response);
        }catch(error: any){
            console.error(error);
        } finally{
            setLoading(false);
        }
    };
    
    useEffect(() => {
        
            fetchProducts();
        

    }, [token]);
//    useEffect(() => {
//         const fetchProducts = async (distributorId: string, token: string) => {
//             setLoading(true);
//             try{
//                 const response = await fetch(`http://localhost:3001/api/products/findDistributor/${distributorId}`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Token": `Bearer ${token}`,
//                     },
//                 });
//                 if(!response.ok){
//                     throw new Error(`Error: ${response.status}`);
//                 }
//                 await new Promise(f => setTimeout(f, 2000));
//                 const res = await response.json();
            
//                 setProducts(res);
//             }catch(error: any){
//                 console.error(error);
//             } finally{
//                 setLoading(false);
//             }
//         };

//         if(userId && token){
//             fetchProducts(userId, token);
//         }

//     }, [userId, token]);
    // useEffect(() => {
    //     const fetchOrders = async (distributorId: string, token: string) => {
    //         setLoading(true);
    //         try{
    //             const response = await fetch(`http://localhost:3001/api/orders/distributorOrders/${distributorId}`, {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Token": `Bearer ${token}`,
    //                 },
    //             });
    //             if(!response.ok){
    //                 throw new Error(`Error: ${response.status}`);
    //             }
    //             await new Promise(f => setTimeout(f, 2000));
    //             const res = await response.json();
    //             setOrders(res);
    //         }catch(error: any){
    //             console.error(error);
    //         } finally{
    //             setLoading(false);
    //         }
    //     };

    //     if(userId && token){
    //         fetchOrders(userId, token);
    //     }

    // }, [userId, token]);
    
    


    return {distributor, loading, products,orders};
};

export default useDistributor;