import React, { useState } from "react";
import './product-slider.css';
import ProductCard from "../product-card/product-card";
import { productData } from "../../types/ProductType";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

interface ProductSliderProps{
    products: productData[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({products}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const productsPerSlide = 4;
    const totalSlides = Math.ceil(products.length / productsPerSlide);

    const handleNext = () => {
        setCurrentSlide((prevSlide) => prevSlide === totalSlides - 1 ? 0 : prevSlide + 1);
    };
    const handlePrev = () => {
        setCurrentSlide((prevSlide) => prevSlide === 0 ? totalSlides - 1 : prevSlide - 1);
    };

    //index of the first product on a slide
    const startIndex = currentSlide * productsPerSlide;
    //array of the products on one slide
    const currentProducts = products.slice(startIndex, startIndex + productsPerSlide);

    return(
        <div className="product-slider">
            <button className="product-slider-button left" onClick={handlePrev}>
                <KeyboardArrowLeftIcon fontSize="large" className="button-icon" />
            </button>
            <div className="product-slider-display">
                <div className="product-slider-inner"
                    style={{
                        transform: `translateX(-${currentSlide * 100}%)`,
                        transition: 'transform 0.5s ease-in-out',
                    }}
                >
                    {products.map((product) => (
                        <div className="product-card-wrapper" key={product._id}>
                            <ProductCard product={product} loading={false} />
                        </div>
                    ))}
                </div>
            </div>
            <button className="product-slider-button right" onClick={handleNext}>
                <KeyboardArrowRightIcon fontSize="large" className="button-icon" />
            </button>
        </div>
    );
}
export default ProductSlider;