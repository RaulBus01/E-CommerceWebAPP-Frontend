import { useEffect, useState } from "react";
import { orderData } from "../types/OrderType";
import { productData, productFormData } from "../types/ProductType";

interface UseOrderResult{
    products: productData[] | null;
    loading: boolean;
    deleteProduct: (productId: string) => Promise<boolean>;
    addProduct: (product: productFormData) => Promise<boolean>;
    editProduct: (product: productFormData) => Promise<boolean>;
    fetchProduct: (productId: string) => Promise<productData | undefined>;
}

const useProduct = (token: string|null): UseOrderResult => {
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
    const addProduct = async (product: productFormData) => {
        try {
          const response = await fetch(`http://localhost:3001/api/products/add`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Token": `Bearer ${token}`,
            },
            body: JSON.stringify(product),
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          return true;
        } catch (error: any) {
          console.error(error);
          return false;
        }
      };


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
   const editProduct = async (product: productFormData) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Token": `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log("Product edited");
      return true;
    } catch (error: any) {
      console.error(error);
      return false;
    }
    };
    const fetchProduct = async (productId: string) => {
        setLoading(true);
        try {
          const response = await fetch(`http://localhost:3001/api/products/find/${productId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
          const res: productData = await response.json();
          return res;
        } catch (error: any) {
          console.error(error);
        } finally {
          setLoading(false);
        }
        };



    return {products, loading, deleteProduct, addProduct, editProduct, fetchProduct};
}

export default useProduct;