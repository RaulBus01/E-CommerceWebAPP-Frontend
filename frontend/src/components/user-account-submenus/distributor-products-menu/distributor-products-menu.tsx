import React from 'react'
import './distributor-prodcuts-menu.css'
import Spinner from '../../spinner/spinner'
import useProduct from '../../../hooks/useProduct';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../product-card/product-card';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';


const DistributorProductsMenu = ({products,loading}) => {
   
  const {userId, token} = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = React.useState(false);



  if(loading){
      return(
          <div className="my-orders-menu">
              <Spinner/>
          </div>
      );
  }
  const handleNavigate = (path) => {
    navigate(path);
  }

  
  return (
        <>
            <div className="my-orders-menu">
                <div className="top-container">
                    <h2>Your products</h2>
                    <AddCircleOutline className="icon" onClick={()=>handleNavigate('add-product')}/>
                </div>

              


                {products !==undefined && products.length > 0 ? (
                    <div className="products-container">
                        {products.map((product) => (
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
            </div>
        </>
        );
}


export default DistributorProductsMenu