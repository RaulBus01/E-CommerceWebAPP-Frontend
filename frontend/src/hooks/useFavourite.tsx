import { useCallback, useEffect, useState } from "react";
import { favouriteItem } from "../types/FavouriteType";
import { _delete, _get, _put } from "../utils/api";
import { useAuth } from "./useAuth";

interface UseFavouriteResult {
    favourites: favouriteItem[] | null;
    loading: boolean;
    addToFavourite: (productId: string) => Promise<string>;
    removeFavourite: (productId: string) => Promise<true | undefined>;
    isProductFavourite: (productId: string) => boolean;
    setFavourites:React.Dispatch<React.SetStateAction<favouriteItem[] | null>>;
}

const useFavourite = (token:string): UseFavouriteResult => {
    
    const [favourites, setFavourites] = useState<favouriteItem[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [favouriteSet, setFavouriteSet] = useState<Set<string>>(new Set());

  const isProductFavourite = useCallback(
    (productId: string) => favouriteSet.has(productId),
    [favouriteSet]
  );

    useEffect(() => {
        const fetchFavouritesByUser = async () => {
            setLoading(true);
            try {
                
                const data = await _get(`/favourites/find`, token, {});
           
                if (!data || !Array.isArray(data.favourites.products)) {
                    throw new Error("Unexpected API response format.");
                }
              
                const res: favouriteItem[] = data.favourites.products;
                setFavourites(res);
                const productIds = res.map(fav => fav.product._id);
                setFavouriteSet(new Set(productIds));
                
            } catch (error: any) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchFavouritesByUser();
        }
    }, [token]);

    const addToFavourite = async (productId: string) => {
        try {
            
            const response = await _put(`/favourites/add`,{ productId }, token, {});
            const newFavourite = response.result;
            setFavouriteSet((prevSet) => new Set(prevSet).add(productId));

            return newFavourite;
         
            
           
        } catch (error: any) {
            console.log("Error adding to favorites:", error);
        }
    };

    const removeFavourite = async (productId: string) => {
        try {
            const response = await _delete(`/favourites/deleteProduct/${productId}`,{}, token);
            if (!response) {
                throw new Error("Unexpected API response format.");
            }

          
          
           
            setFavouriteSet((prevSet) => {
                const newSet = new Set(prevSet);
                newSet.delete(productId);
                return newSet;
            });
            return true;
        } catch (error: any) {
            console.log("Error removing from favourites:", error);
        }
    };

    return { favourites, loading, addToFavourite, removeFavourite, isProductFavourite,setFavourites };
};

export default useFavourite;


