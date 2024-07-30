import React from "react";
import './favorite-page.css';
import ProductCard from "../../components/product-card/product-card";
import useFavourite from "../../hooks/useFavourite";
import { useAuth } from "../../hooks/useAuth";

const FavoritePage = () => {
    const {userId, token} = useAuth();
    const {favourites, loading} = useFavourite(userId, token);
    console.log(favourites);

    if(favourites?.length <= 0){
        return(
            <div className="main-container">
                <h1>Your favourite items</h1>
                <div>
                    <p>No item saved as favourite</p>
                </div>
            </div>
        );
    }
    return(
        <>
            <div className="main-container">
                <h1>Your favourite items</h1>
                <div className="items-container">
                    {favourites?.map((favourite) => (
                        <ProductCard key={favourite.id} product={favourite.product} loading={loading}/>
                    ))}
                </div>
            </div>
        </>
    );
}
export default FavoritePage