import React from 'react'
import './distributor-products-menu.css'
import Spinner from '../../spinner/spinner'
import useProduct from '../../../hooks/useProduct';
import { useAuth } from '../../../hooks/useAuth';
import ProductForm from './distributor-product-form';
import { Modal } from '@mui/material';
import ProductCard from '../../product-card/product-card';

const DistributorProductsMenu = ({products,loading}) => {
   
    const { token } = useAuth();
    const { deleteProduct } = useProduct();
    console.log(products);
    

  if(loading){
      return(
          <div className="my-orders-menu">
              <Spinner/>
          </div>
      );
  }

  const handleOpenProductForm = () => {
    console.log('open product form')
    return <ProductForm/>
    }



  const handleDeleteProduct = (productId) => {
    if(token === null){
        return;
    }
    deleteProduct(productId, token);

  }
  
  return (
        <>
            <div className="products-menu">
                <h2>My Products
                </h2>
                <button className="btn btn-primary" onClick={handleOpenProductForm}>
                    Add Product
                </button>
                <div className="products-container">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} loading={loading}/>
                        

                    ))}
                </div>



                
                    
            </div>
        </>
        );
}


export default DistributorProductsMenu