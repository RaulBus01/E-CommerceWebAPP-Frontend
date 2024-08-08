import React, { useEffect,useState } from 'react';
import './order.css';
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { orderData } from '../../types/OrderType';
import { formatDateTime } from '../../utils/formatDataTime';




const OrderSummary = ({order}:{order:orderData}) => {
  

  
 
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`order/${order._id}`);
  }



    
    

    

   


  return (
  
    <div className="orderSummary" key={order._id}>
      <div className="orderHeader">
        <span>Order : {order._id}</span>  

        <span className="orderDate">Placed on: {formatDateTime(order.createdAt)}</span>
        <span className="orderTotal">Total: {Math.round(order.totalPrice)} Lei</span>
     
        
      </div>
      
      <div className="orderItem">
        <div className="sellerRating">
        <span className="productTitle">Distributor: {order.distributor.name}</span>
        </div>
      
        <span className="productStatus">Status: {order.status}</span>
        {/* <img src="path-to-product-image.jpg" alt="Product" className="productImage" /> */}
      </div>

     
      
      <div className="orderFooter">
        
        <button className="orderDetailsButton" onClick={handleNavigate}>
        <KeyboardDoubleArrowDownIcon className="orderDetailsIcon"/>
          Order Details</button>
      </div>
    </div>
  );
};

export default OrderSummary;
