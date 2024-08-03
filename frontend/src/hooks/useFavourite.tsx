import { useCallback, useEffect, useState } from "react";
import { favouriteItem } from "../types/FavouriteType";

interface UseFavouriteResult {
    favourites: favouriteItem[] | null;
    loading: boolean;
    addToFavourite: (productId: string) => Promise<void>;
    removeFavourite: (productId: string) => Promise<void>;
    isProductFavourite: (productId: string) => boolean;
}

const useFavourite = (userId: string, token: string): UseFavouriteResult => {
    const [favourites, setFavourites] = useState<favouriteItem[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [favouriteSet, setFavouriteSet] = useState<Set<string>>(new Set());

    const isProductFavourite = useCallback((productId: string) => {
        return favouriteSet.has(productId);
    }, [favouriteSet]);

    useEffect(() => {
        const fetchFavouritesByUser = async () => {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:3001/api/favourites/find`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();

                if (!data || !Array.isArray(data.favourites.products)) {
                    throw new Error("Unexpected API response format.");
                }
                console.log(data);
                const res: favouriteItem[] = data.favourites.products;
                setFavourites(res);
                const productIds = res.map(fav => fav.product._id);
                setFavouriteSet(new Set(productIds));
                console.log(productIds);
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
            const response = await fetch("http://localhost:3001/api/favourites/add", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Token": `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const newFavourite = await response.json();
            setFavourites((prevFavourites) => (prevFavourites ? [...prevFavourites, newFavourite] : [newFavourite]));
            setFavouriteSet((prevSet) => new Set(prevSet).add(productId));
        } catch (error: any) {
            console.log("Error adding to favorites:", error);
        }
    };

    const removeFavourite = async (productId: string) => {
        try {
            const response = await fetch("http://localhost:3001/api/favourites/deleteProduct", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Token": `Bearer ${token}`,
                },
                body: JSON.stringify({ productId }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            setFavourites((prevFavourites) => prevFavourites?.filter((fav) => fav.product._id !== productId) || []);
            setFavouriteSet((prevSet) => {
                const newSet = new Set(prevSet);
                newSet.delete(productId);
                return newSet;
            });
        } catch (error: any) {
            console.log("Error removing from favourites:", error);
        }
    };

    return { favourites, loading, addToFavourite, removeFavourite, isProductFavourite };
};

export default useFavourite;
