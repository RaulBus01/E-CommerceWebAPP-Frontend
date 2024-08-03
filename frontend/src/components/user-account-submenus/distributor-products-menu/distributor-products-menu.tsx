import React from 'react'
// import './distributor-products-menu.css'
import Spinner from '../../spinner/spinner'
import useProduct from '../../../hooks/useProduct';
import { useAuth } from '../../../hooks/useAuth';
import ProductForm from './distributor-product-form';
import { Modal } from '@mui/material';

const DistributorProductsMenu = ({products,loading}) => {
   
  const {userId, token} = useAuth();

  const {deleteProduct} = useProduct(userId, token);

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
    window.location.reload();
  }
  
  return (
        <>
            <div className="my-orders-menu">
                <h2>My Products
                </h2>
                <button className="btn btn-primary" onClick={handleOpenProductForm}>
                    Add Product
                </button>

                {products !==undefined && products.length > 0 ? (
                    <div className="orders-container">
                        {products.map((product) => (
                            <div key={product._id} className="order-item">
                                <h3>Product name: {product.name}</h3>
                                <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
                                <p><strong>Stock:</strong> {product.stock}</p>
                                <p><strong>Category:</strong> {product.category}</p>
                                <p><strong>Description:</strong> {product.description}</p>
                                <p><strong>Created at:</strong> {product.createdAt}</p>
                                <p><strong>Updated at:</strong> {product.updatedAt}</p>
                                <p><strong>Rating:</strong>{product.ratingProduct}</p> 
                                <p><strong>Reviews:</strong> {product.numberOfReviews}</p>
                               
                                <button className="btn btn-primary">
                                    Edit
                                </button>
                                <button className="btn btn-danger" onClick={handleDeleteProduct}>
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </>
        );
}


export default DistributorProductsMenu