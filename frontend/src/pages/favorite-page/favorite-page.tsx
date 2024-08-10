import React, { useState, useCallback } from "react";
import './favorite-page.css';
import ProductCard from "../../components/product-card/product-card";
import useFavourite from "../../hooks/useFavourite";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../../components/spinner/spinner";

const FavoritePage = () => {
    const { token, user } = useAuth();
    const { favourites,loading,setFavourites } = useFavourite(token as string);
    // const [favourites, setFavourites] = useState(initialFavourites);

    const handleRemoveFavorite = useCallback((productId: string) => {
        setFavourites(prev => prev?.filter(fav => fav.product._id !== productId) || null);
    }, []);

    if (loading) {
        return <Spinner />;
    }
    console.log(favourites);

    return (
        <div className="main-container">
            <h1>{favourites?.length ? "Your Favourites" : "No Favourites"}</h1>
            <div className="items-container">
                {favourites?.map((favourite) => (
                    <ProductCard
                        key={favourite?.product._id}
                        product={favourite?.product}
                        loading={loading}
                        onRemoveFavorite={handleRemoveFavorite}
                    />
                ))}
            </div>
        </div>
    );
};

export default FavoritePage;