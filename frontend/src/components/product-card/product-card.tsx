import React, { useState } from 'react';
import './product-card.css';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard: React.FC = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [animationKey, setAnimationKey] = useState(0); // To force re-render of animation

    // Handle toggling the favorite state
    const handleFavorite = () => {
        setIsFavorite((prevState) => !prevState);
        setAnimationKey((prevKey) => prevKey + 1); // Change key to restart animation
    };

    return (
        <div className="card-container">
            <img src="https://via.placeholder.com/200" alt="product-image" />
            <div className="information-container">
                <p className="product-name">
                    Name this is the name of the product 128gb, 2024 v2.0
                </p>
                <h2>799.99 lei</h2>
            </div>
            <div className="rating-container">
                <StarIcon />
                <p>5.0 (14)</p>
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
