import { useEffect, useState } from "react";
import { distributorData } from "../types/UserType";

interface UseDistributorResult{
    distributor: distributorData | null;
    loading: boolean;
    products: any;
    orders: any;

}

const useDistributor = (userId: string | null, token: string | null): UseDistributorResult => {
    const [distributor, setDistributor] = useState<distributorData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [products, setProducts] = useState<any>(null);
    const [orders, setOrders] = useState<any>(null);
   
    
    useEffect(() => {
        const fetchUser = async (distributorId: string, token: string) => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:3001/api/distributor/find/${distributorId}`, {
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
                const res: distributorData = await response.json();
                
                setDistributor(res);
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
   useEffect(() => {
        const fetchProducts = async (distributorId: string, token: string) => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:3001/api/products/findDistributor/${distributorId}`, {
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
                const res = await response.json();
            
                setProducts(res);
            }catch(error: any){
                console.error(error);
            } finally{
                setLoading(false);
            }
        };

        if(userId && token){
            fetchProducts(userId, token);
        }

    }, [userId, token]);
    useEffect(() => {
        const fetchOrders = async (distributorId: string, token: string) => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:3001/api/orders/distributorOrders/${distributorId}`, {
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
                const res = await response.json();
                setOrders(res);
            }catch(error: any){
                console.error(error);
            } finally{
                setLoading(false);
            }
        };

        if(userId && token){
            fetchOrders(userId, token);
        }

    }, [userId, token]);
    
    


    return {distributor, loading, products,orders};
};

export default useDistributor;