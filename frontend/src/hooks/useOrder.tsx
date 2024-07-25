import { useEffect, useState } from "react";
import { orderData } from "../types/OrderType";

interface UseOrderResult{
    orders: orderData[] | null;
    loading: boolean;
}

const useOrder = (userId: string, token: string): UseOrderResult => {
    const [orders, setOrders] = useState<orderData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrdersByUser = async (userId: string, token: string) => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:3001/api/orders/yourOrders/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `Bearer ${token}`,
                    },
                });
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                const res: orderData[] = await response.json();
                setOrders(res);
            }catch(error:any){
                console.log(error);
            }finally{
                setLoading(false);
            }
        };

        if(userId){
            fetchOrdersByUser(userId, token);
        }
    },[userId, token]);
    return {orders, loading};
}

export default useOrder;