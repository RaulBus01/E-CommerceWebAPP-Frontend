    import React, { useEffect, useState } from 'react';
    import './product-card.css';
    import StarIcon from '@mui/icons-material/Star';
    import FavoriteIcon from '@mui/icons-material/Favorite';
    import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
    import { useAuth } from '../../hooks/useAuth';
    import useFavourite from '../../hooks/useFavourite';

    const ProductCard = ({favourite, loading}) => {
        const {userId, token} = useAuth();
        const { addToFavourite, removeFavourite, isProductFavourite, favourites} = useFavourite(userId, token);

        const [isFavorite, setIsFavorite] = useState(false);
        //console.log(favourite);
        const productImage: string = favourite.productId.image;
    
        useEffect(() => {
            setIsFavorite(isProductFavourite(favourite.productId._id));
            console.log(isFavorite);
        }, [favourite.productId._id, isProductFavourite, favourites]);
    
        const handleFavorite = async () => {
            if (isFavorite) {
                await removeFavourite(favourite.productId._id);
            } else {
                await addToFavourite(favourite.productId._id);
            }
            setIsFavorite(!isFavorite);
            //window.location.reload();
        };

        return (
            <div className="card-container">
                <img src={productImage} alt="product-image" />
                <div className="information-container">
                    <p className="product-name">
                        {favourite.productId.name}
                    </p>
                    <h2>{favourite.productId.price} lei</h2>
                </div>
                <div className="rating-container">
                    <StarIcon style={{ color: 'yellow'}} />
                    <p>{favourite.productId.ratingProduct} ({favourite.productId.numberOfReviews})</p>
                </div>
                <div className="button-container">
                    <button>
                        <AddShoppingCartIcon />
                    </button>
                    <button onClick={handleFavorite} className="favorite-button">
                        <FavoriteIcon style={{ color: isFavorite ? 'red' : 'white' }} />
                    </button>
                </div>
            </div>
        );
    };

    export default ProductCard;
