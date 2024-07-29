import { useEffect, useState } from "react";
import favouriteData from "../types/FavouriteType";

interface UseFavouriteResult{
    favourites: favouriteData[] | null;
    loading: boolean;
    addToFavourite: (productId: string) => Promise<void>;
    removeFavourite: (productId: string) => Promise<void>;
    isProductFavourite: (productId: string) => boolean;
}

const useFavourite = (userId: string, token: string): UseFavouriteResult => {
    const [favourites, setFavourites] = useState<favouriteData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const isProductFavourite = (productId: string) => {
        console.log(favourites);
        return favourites?.some(fav => fav.productId._id === productId) || false;
    };

    useEffect(() => {
        const fetchFavouritesByUser = async () => {
            setLoading(true);
            try{
                const response = await fetch(`http://localhost:3001/api/favourites/find/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Token": `Bearer ${token}`,
                    },
                });
                if(!response.ok){
                    throw new Error(`Error: ${response.status}`);
                }
                const res: favouriteData[] = await response.json();
                console.log(favourites);
                setFavourites(res);
            }catch(error:any){
                console.log(error);
            }finally{
                setLoading(false);
            }
        };

        if(userId){
            fetchFavouritesByUser();
        }
    },[userId, token]);

    const addToFavourite = async (productId: string) => {
        try{
            const response = await fetch("http://localhost:3001/api/favourites/add", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Token": `Bearer ${token}`,
                },
                body: JSON.stringify({ id:userId, productId }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const newFavourite = await response.json();
            setFavourites((prevFavourites) => (prevFavourites ? [...prevFavourites, newFavourite] : [newFavourite]));
        }catch (error: any) {
            console.log("Error adding to favorites:", error);
        }
    };

    const removeFavourite = async (productId: string) => {
        try{
            const response = await fetch("http://localhost:3001/api/favourites/deleteProduct", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Token": `Bearer ${token}`,
                },
                body: JSON.stringify({id:userId, productId}),
            });
            if(!response.ok){
                throw new Error(`Error: ${response.status}`);
            }
            setFavourites((prevFavourites) => prevFavourites?.filter((fav) => fav.id !== productId) || []);
        }catch(error:any){
            console.log("Error removing from favourites:", error);
        }
    };


    return {favourites, loading, addToFavourite, removeFavourite, isProductFavourite};
}

export default useFavourite;    