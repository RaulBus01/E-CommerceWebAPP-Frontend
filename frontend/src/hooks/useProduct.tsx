import { useEffect, useState } from "react";
import { orderData } from "../types/OrderType";
import { productData } from "../types/ProductType";

interface UseOrderResult{
    products: productData[] | null;
    loading: boolean;
}

const useProduct = (userId: string, token: string): UseOrderResult => {
    const [products, setProducts] = useState<productData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:3001/api/products/findAll`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                const res: productData[] = await response.json();
                setProducts(res);
            }catch(error:any){
                console.error(error);
            }finally{
                setLoading(false);
            }
        };

        fetchProducts();
    },[]);
    return {products, loading};
}

export default useProduct;