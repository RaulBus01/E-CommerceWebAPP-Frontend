import React from "react";
import './favorite-page.css';
import ProductCard from "../../components/product-card/product-card";
import useFavourite from "../../hooks/useFavourite";
import { useAuth } from "../../hooks/useAuth";
import Spinner from "../../components/spinner/spinner";

const FavoritePage = () => {
    const { token } = useAuth();
    const { favourites, loading } = useFavourite(token as string);

    return (
        <>
            <div className="main-container">
                <h1>Your favourite items</h1>
                <div className="items-container">
                    {favourites?.map((favourite) => (
                        <ProductCard key={favourite.product._id} product={favourite.product} loading={loading} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default FavoritePage;
