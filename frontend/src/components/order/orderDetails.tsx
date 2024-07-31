import React, { useEffect, useState, useCallback } from 'react';
import './orderDetails.css';
import { useAuth } from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';

import { useParams } from 'react-router';
import useDistributor  from '../../hooks/useDistributor';
import { Edit } from '@mui/icons-material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { orderData } from '../../types/OrderType';
import { distributorData } from '../../types/UserType';


const OrderDetails: React.FC = () => {
 
  const { userId, token } = useAuth();
  const { fetchOrderById,editOrderStatus,cancelOrder } = useOrder(userId, token);
  const { orderId } = useParams();
  const [order, setOrder] = useState<orderData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchOrder = useCallback(async () => {
    setLoading(true);
    const fetchedOrder = await fetchOrderById(orderId, token);
    setOrder(fetchedOrder || null);
    setLoading(false);
  }, [orderId, token, fetchOrderById]);

  const {distributor, loading: userLoading} = useDistributor(userId, token);
  const [productDistributor,setProductDistributor] = useState<distributorData | null>(null);
    
  useEffect(() => {
    if(distributor ){
        setProductDistributor(distributor);
    }
  },[distributor]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleEditOrderStatus = () => {
    const isConfirmed = window.confirm("Are you sure you want to confirm the shipment from the distributor?");
    if (isConfirmed && orderId && token) {
      
        const updatedOrder = editOrderStatus(orderId, token);
        
    }
  };
  const handleCancelOrder = () => {
    const isConfirmed = window.confirm("Are you sure you want to cancel the order?");
    if (isConfirmed && orderId && token) {
      
       const updatedOrder = cancelOrder(orderId, token);
        
    }
    }
  if (userLoading || loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <div className="order-details">
      <div className="order-header">
        <h1>Order nr. {order._id}</h1>
        
        <div className="order-info">
          <p>Placed on: <strong>{new Date(order.createdAt).toLocaleDateString()}</strong></p>
          <p>Total: <strong>{Math.round(order.totalPrice)}<sup> Lei</sup></strong></p>
        </div>
        <div className="order-status">
            <p>Status: <strong>{order.status}</strong></p> 
          
        </div>
      </div>
      <div className="products-sold">
        <h2>Products sold by {distributor?.name}</h2>
        <div className="product-details">
          <div className="delivery-info">
            {/* <h3>Produse ridicate</h3>
            <p>Data de livrare: <strong>{new Date(order.createdAt).toLocaleDateString()}</strong></p> */}
          </div>
          <div className="delivery-modalities">
            <div className="delivery-method">
              <h4>Delivery Method:</h4>
              <p>DHL Express</p>
              <p>Customer: {order.first_name} {order.last_name}, </p>
              <p>Phone: {order.phoneNumber}</p>
              <h4>Delivery Address:</h4>
                <p>Country: {order.address.country}</p>
                <p>County:{order.address.county}</p>
                <p>City: {order.address.city}</p>
                <p>Street: {order.address.street}</p>
                <p>Number:{order.address.number}</p>
                <p>Postal Code: {order.address.zip}</p> 
            </div>
            <div className="billing-info">
              <h4>Billing info</h4>
              <p>Customer: {order.first_name} {order.last_name}, </p>
              <p>Country: {order.address.country}</p>
              <p>County:{order.address.county}</p>
              <p>City: {order.address.city}</p>
              <p>Street: {order.address.street}</p>
              <p>Number:{order.address.number}</p>
               
            </div>
            <div className="payment-method">
              <h4>Modalitate de plata</h4>
              {/* <p>{order.paymentMethod}</p> */}
              <p className="payment-status">Plata acceptata</p>

              <h4>Order Status</h4>
              <p>{order.status} </p>
              {order.status === 'Pending' && <button onClick={handleEditOrderStatus}>Confirm Shipment from Distributor<Edit/></button>}
              {order.status === 'Pending' && <button onClick={handleCancelOrder}>Cancel Order<DisabledByDefaultIcon/></button>}

              
            </div>
          </div>
          {order.products.map((p, index) => (
            <div key={index} className="product-item">
      
               <img src={p.product.image} alt="Product" />
               <div className="product-description">
                <p className="product-name">{p.product.name}</p>
                    <p className="product-price">{p.product.price}<sup> Lei</sup></p>
                <p className="product-quantity">{p.quantity} buc</p>
              </div>
            </div>
          ))}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: <strong>{Math.round(order.totalPrice)}<sup> Lei</sup></strong></p>
            <p>Shipping: <strong>12.99<sup> Lei</sup></strong></p>
            <p>Total: <strong>{Math.round(order.totalPrice + 12.99)}<sup> Lei</sup></strong></p>
          </div>
        </div>
      </div>
    
    </div>
  );
}

export default OrderDetails;