import { useEffect, useState, useCallback } from "react";
import { orderData } from "../types/OrderType";

interface UseOrderResult {
    orders: orderData[] | null;
    loading: boolean;
    fetchOrderById: (orderId: string, token: string) => Promise<orderData | undefined>;
    editOrderStatus: (orderId: string, token: string) => Promise<orderData | undefined>;
    cancelOrder: (orderId: string, token: string) => Promise<boolean>;
}

const useOrder = (userId: string | null, token: string|null): UseOrderResult => {
    const [orders, setOrders] = useState<orderData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchOrdersByUser = async (userId: string | null, token: string | null) => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/orders/yourOrders/${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Token": `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const res: orderData[] = await response.json();
            setOrders(res);
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderById = useCallback(async (orderId: string | null, token: string | null) => {
        setLoading(true);
        console.log(token);
        try {
            const response = await fetch(`http://localhost:3001/api/orders/order/${orderId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Token": `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const res: orderData = await response.json();
            return res;
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);
    const editOrderStatus = async (orderId: string | null, token: string | null) => {
        console.log(orderId);
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/orders/editOrderStatus/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Token": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    status: "Shipped",
                }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const res: orderData = await response.json();
            return res;
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const cancelOrder = async (orderId: string | null, token: string | null) => {
        console.log(orderId);
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3001/api/orders/cancelOrder/${orderId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Token": `Bearer ${token}`,
                }
               
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const res: string = await response.json();
            if(res.message === 'Order canceled'){
                return true;
            }
            return false;
          
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (userId) {
            fetchOrdersByUser(userId, token);
        }
    }, [userId, token]);

    return { orders, loading, fetchOrderById, editOrderStatus,cancelOrder };
}

export default useOrder;
