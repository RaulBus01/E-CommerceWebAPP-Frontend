import { useEffect, useState, useCallback} from "react";
import { productData } from "../types/ProductType";
import { _get, getProducts, removeProduct } from "../lib/api";


interface UseOrderResult{
    products: productData[] | null;
    loading: boolean;
    deleteProduct: (productId: string, token: string) => Promise<boolean>;
    //fetchProductsBySubcategory: (subcategory: string) => Promise<productData[] | null>;
}

const useProduct = (): UseOrderResult => {
    const [products, setProducts] = useState<productData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try{
                const response = await _get(`/products/findAll`);
                setProducts(response);
            }catch(error:any){
                console.error(error);
            }finally{
                setLoading(false);
            }
        };

        fetchProducts();
    },[]);

    const deleteProduct = async (productId: string, token: string) => {
      try {
        const response = await removeProduct(productId, token);
          if(!response.ok){
              throw new Error(`Error: ${response.status}`);
          }
          return true;
      } catch (error: any) {
          console.error(error);
          return false;
      }
   };

//    const fetchProductsBySubcategory = useCallback(async (subcategory: string) => {
//     setLoading(true);
//     try {
//         const response = await fetchProductsBySubcategories();
//         if (!response.ok) {
//             throw new Error(`Error: ${response.status}`);
//         }
//         const res: productData[] = await response.json();
//         return res;
//     } catch (error: any) {
//         console.error(error);
//         return null;
//     } finally {
//         setLoading(false);
//     }
// }, []);

    return {products, loading, deleteProduct};
}

export default useProduct;