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
  const { distributorProducts,loading,setDistributorProducts,deleteProduct } = useProduct();
  const [filteredProducts, setFilteredProducts] = useState<productData[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredProducts(distributorProducts);
  }, [distributorProducts]);



  const searchProducts = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filtered = distributorProducts?.filter(product =>
      product.name.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(filtered);
  };

 

  return (
    loading ? (
      <Spinner />
    ) : (
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

      <div className="add-container">
        <span>  
         <h2>Add new product </h2>
        <AddCircleOutline className="icon" onClick={() => navigate('add-product')} />
        </span>
      </div>

      <div className="products-container">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              loading={false}
              products={distributorProducts}
              setProducts={setDistributorProducts}
              deleteProduct={deleteProduct}

            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
    )
  );
};

export default DistributorProductsMenu;

