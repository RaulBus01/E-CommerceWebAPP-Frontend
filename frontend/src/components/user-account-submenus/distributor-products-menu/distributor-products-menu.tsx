import React, { useState, useEffect } from 'react';
import './distributor-products-menu.css';
import Spinner from '../../spinner/spinner';
import ProductCard from '../../product-card/product-card';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import useProduct from '../../../hooks/useProduct';
import { productData } from '../../../types/ProductType';

const DistributorProductsMenu = () => {
  const { distributorProducts,loading } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState<productData[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(distributorProducts);
  }, [distributorProducts]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const searchProducts = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = distributorProducts?.filter(product =>
      product.name.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="distributor-products-menu">
      <div className="top-container">
        <h2>Search your product list</h2>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products"
            onChange={searchProducts}
            className="search-input"
          />
          <SearchIcon className="icon" />
        </div>
      </div>

      <div className="add-product-container">
        <h3>Add New Product</h3>
        <AddCircleOutline className="icon" onClick={() => handleNavigate('add-product')} />
      </div>

      <div className="products-container">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              loading={false}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default DistributorProductsMenu;
