import { useEffect, useState, useCallback } from "react";
import { distributorData } from "../types/UserType";

interface UseDistributorResult {
    distributor: distributorData | null;
    loading: boolean;
    products: any;
    orders: any;
    fetchUser: (distributorId: string, token: string) => Promise<void>;
}

const useDistributor = (userId: string | null, token: string | null): UseDistributorResult => {
    const [distributor, setDistributor] = useState<distributorData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [products, setProducts] = useState<any>(null);
    const [orders, setOrders] = useState<any>(null);

    const fetchData = useCallback(async (distributorId: string, token: string) => {
        setLoading(true);
        try {
            const [userResponse, productsResponse, ordersResponse] = await Promise.all([
                fetch(`http://localhost:3001/api/distributor/find/${distributorId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `Bearer ${token}`,
                    },
                }),
                fetch(`http://localhost:3001/api/products/findDistributor/${distributorId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `Bearer ${token}`,
                    },
                }),
                fetch(`http://localhost:3001/api/orders/distributorOrders/${distributorId}`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `Bearer ${token}`,
                    },
                })
            ]);

            if (!userResponse.ok || !productsResponse.ok || !ordersResponse.ok) {
                throw new Error(`Error in one of the responses`);
            }

            const [userData, productsData, ordersData] = await Promise.all([
                userResponse.json(),
                productsResponse.json(),
                ordersResponse.json()
            ]);

            setDistributor(userData);
            setProducts(productsData);
            setOrders(ordersData);
        } catch (error: any) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (userId && token) {
            fetchData(userId, token);
        }
    }, [userId, token, fetchData]);

    const fetchUser = useCallback(async (distributorId: string, token: string) => {
        await fetchData(distributorId, token);
    }, [fetchData]);

    return { distributor, loading, products, orders, fetchUser };
};

export default useDistributor;