import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProduct from "../../hooks/useProduct";
import "./SubcategoryPage.css";
import { productData } from "../../types/ProductType";

const SubCategoryPage = () => {
    const { subcategory } = useParams<{ subcategory: string }>();
    const { fetchProductsBySubcategory } = useProduct();
    const [products, setProducts] = useState<productData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetchProductsBySubcategory(subcategory);
                setProducts(response);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [subcategory, fetchProductsBySubcategory]);

    return (
        <div>
            <h1>{subcategory.replace(/-/g, " ")}</h1>
            <p>This is the {subcategory.replace(/-/g, " ")} page.</p>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="product-list">
                    {products?.map(product => (
                        <div key={product.id} className="product-item">
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <p>{product.price} lei</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SubCategoryPage;

