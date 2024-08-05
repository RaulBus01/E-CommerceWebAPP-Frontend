import { useEffect, useState } from "react";
import { orderData } from "../types/OrderType";
import { _get } from "../utils/api";

interface UseOrderResult {
    orders: orderData[] | null;
    loading: boolean;
}

const useOrder = (token: string): UseOrderResult => {
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