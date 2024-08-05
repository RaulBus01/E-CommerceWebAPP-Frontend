import React, { useState, useEffect } from 'react';
import './distributor-products-menu.css';
import Spinner from '../../spinner/spinner';
import ProductCard from '../../product-card/product-card';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import  useProduct  from '../../../hooks/useProduct';
const DistributorProductsMenu = ({ products, loading }) => {
 
    const { token } = useAuth();
    const { deleteProduct,setProducts } = useProduct();
    console.log(products);
    const navigate = useNavigate();
    const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const searchProducts = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

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

      {loading ? (
        <Spinner />
      ) : (
        <>
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="products-container">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  loading={loading}
                />
              ))}
            </div>
          ) : (
            <p>No products found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default DistributorProductsMenu;