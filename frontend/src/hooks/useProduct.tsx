import { useEffect, useState, useCallback } from "react";
import { productData } from "../types/ProductType";
import { _delete, _get } from "../utils/api";
import { useAuth } from "./useAuth";

interface UseOrderResult {
  products: productData[] | null;
  setProducts: (products: productData[] | null) => void;
  loading: boolean;
  deleteProduct: (productId: string, token: string) => Promise<boolean>;
  distributorProducts: productData[] | null;    
}

const useProduct = (): UseOrderResult => {
  const { token, user } = useAuth();
  const [products, setProducts] = useState<productData[] | null>(null);
  const [distributorProducts, setDistributorProducts] = useState<productData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await _get(`/products/findAll`, {}, {});
      setProducts(response);
    } catch (error: any) {
      console.error("Error fetching all products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProductsDistributor = useCallback(async () => {
    if (!user?.role || user.role !== "distributor" || !user.id) {
      return;
    }
    setLoading(true);
    try {
      const response = await _get(`/products/findDistributor/${user.id}`, token);
      setDistributorProducts(response);
    } catch (error: any) {
      console.error("Error fetching distributor products:", error);
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    fetchProducts();
    fetchProductsDistributor();
  }, [fetchProducts, fetchProductsDistributor]);

  const deleteProduct = async (productId: string, token: string) => {
    try {
      await _delete(`/products/delete/${productId}`, {}, token);
      return true;
    } catch (error: any) {
      console.error("Error deleting product:", error);
      return false;
    }
  };

  return { products, setProducts, loading, deleteProduct, distributorProducts };
};

export default useProduct;