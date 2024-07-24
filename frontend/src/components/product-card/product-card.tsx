import React from 'react';
import './product-card.css'
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const ProductCard = () => {
    return(
        <div className="card-container">
            <img src="https://via.placeholder.com/200" alt='product-image'></img>
            <div className='info-container'>
                <p className='product-name'>Name this is the name of the product 128gb, 2024</p>
                <h2>799.99 lei</h2>
            </div>
            <div className='rating-container'>
                <StarIcon></StarIcon>
                <p>5.0 (14)</p>
            </div>
            <div className="button-container">
                <button>
                    <AddShoppingCartIcon></AddShoppingCartIcon>
                </button>
                <button>
                    <FavoriteIcon></FavoriteIcon>
                </button>
            </div>
        </div>
    );
}

export default ProductCard