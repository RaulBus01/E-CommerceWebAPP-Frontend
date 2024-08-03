import { useCallback, useEffect, useState } from "react";
import favouriteData from "../types/FavouriteType";
import { _delete, _get, _put } from "../utils/api";

interface UseFavouriteResult {
  favourites: favouriteData[] | null;
  loading: boolean;
  addToFavourite: (productId: string) => Promise<void>;
  removeFavourite: (productId: string) => Promise<void>;
  isProductFavourite: (productId: string) => boolean;
}

const useFavourite = (userId: string, token: string): UseFavouriteResult => {
  const [favourites, setFavourites] = useState<favouriteData[] | null>(null);
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
        const response = await _get(`/favourites/find`, { token });
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const res: favouriteData[] = await response.json();
        console.log('Fetched favourites:', res);
        setFavourites(res);
        setFavouriteSet(new Set(res.map(fav => fav.product._id)));
      } catch (error: any) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFavouritesByUser();
    }
  }, [userId, token]);

  const addToFavourite = async (productId: string) => {
    try {
      const response = await _put(`/favourites/add`, { productId }, { token });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const newFavourite = await response.json();
      setFavourites((prevFavourites) =>
        prevFavourites ? [...prevFavourites, newFavourite] : [newFavourite]
      );
      setFavouriteSet((prevSet) => new Set(prevSet).add(productId));
      console.log('Added to favourites:', newFavourite);
    } catch (error: any) {
      console.log("Error adding to favorites:", error);
    }
  };

  const removeFavourite = async (productId: string) => {
    try {
      const response = await _delete(`/favourites/deleteProduct`, { productId, token });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setFavourites((prevFavourites) =>
        prevFavourites?.filter((fav) => fav.product._id !== productId) || []
      );
      setFavouriteSet((prevSet) => {
        const newSet = new Set(prevSet);
        newSet.delete(productId);
        return newSet;
      });
      console.log('Removed from favourites:', productId);
    } catch (error: any) {
      console.log("Error removing from favourites:", error);
    }
  };

  return { favourites, loading, addToFavourite, removeFavourite, isProductFavourite };
};

export default useFavourite;
