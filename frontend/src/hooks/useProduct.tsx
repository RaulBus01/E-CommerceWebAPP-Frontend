import { useEffect, useState } from "react";
import { orderData } from "../types/OrderType";
import { productData } from "../types/ProductType";

interface UseOrderResult{
    products: productData[] | null;
    loading: boolean;
    deleteProduct: (productId: string) => Promise<boolean>;
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
                console.log(res);
            }catch(error:any){
                console.error(error);
            }finally{
                setLoading(false);
            }
        };

        fetchProducts();
    },[]);

    const deleteProduct = async (productId: string) => {
      try {
        const response = await fetch(`http://localhost:3001/api/products/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
              "Token": `Bearer ${token}`,
          },
          body: JSON.stringify({id: productId}),
          });
          if(!response.ok){
              throw new Error(`Error: ${response.status}`);
          }
          return true;
      } catch (error: any) {
          console.error(error);
          return false;
      }
   };
    return {products, loading, deleteProduct};
}

export default useProduct;