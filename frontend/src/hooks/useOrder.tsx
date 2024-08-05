import { useEffect, useState, useCallback } from "react";
import { orderData } from "../types/OrderType";
import { _get } from "../utils/api";

interface UseOrderResult {
interface UseOrderResult {
    orders: orderData[] | null;
    loading: boolean;
    fetchOrderById: (orderId: string, token: string) => Promise<orderData | undefined>;
    editOrderStatus: (orderId: string, token: string) => Promise<orderData | undefined>;
    cancelOrder: (orderId: string, token: string) => Promise<boolean>;
}

const useOrder = (token: string): UseOrderResult => {
    console.log(token);
    const [orders, setOrders] = useState<orderData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrdersByUser = async (token: string) => {
            setLoading(true);
            try {
                const response = await _get(`/orders/find`, token);
                const res: orderData[] = response.orders;
                setOrders(res);
            } catch (error: any) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrdersByUser(token);
    }, [token]);

    return { orders, loading };
}

export default useOrder;
