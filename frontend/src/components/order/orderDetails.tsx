import React, { useEffect, useState,useCallback } from 'react';
import './orderDetails.css';
import { useAuth } from '../../hooks/useAuth';
import useOrder from '../../hooks/useOrder';
import { useParams } from 'react-router';
import { Edit } from '@mui/icons-material';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { orderData } from '../../types/OrderType';
import { formatDateTime } from '../../utils/formatDataTime';
import toast from 'react-hot-toast';

const OrderDetails: React.FC = () => {
  const { user, token } = useAuth();
  const { orderId } = useParams();
  const { fetchOrderById, loading,cancelOrder,editOrderStatus } = useOrder(token as string);

  const [order, setOrder] = useState<orderData | null>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderById(orderId as string).then((response) => {
        if (response) {
          setOrder(response.order);
        }
      });
    }
  }, [orderId]);

  const handleEditOrderStatus = useCallback(() => {
    const confirmShipment = window.confirm('Are you sure you want to confirm shipment of this order?');
    if (!confirmShipment) {
      return;
    }
    editOrderStatus(orderId as string, 'Shipped').then((response) => {
      if (response) {
        toast.success('Order shipped successfully.');
        setOrder(prevOrder => ({
          ...prevOrder!,
          status: 'Shipped'
        }));
      } else {
        toast.error('Error shipping order. Please try again.');
      }
    });
  }, []);

  const handleCancelOrder = useCallback(() => {

    const confirmCancel = window.confirm('Are you sure you want to cancel this order?');
    if (!confirmCancel) {
      return;
    }
      cancelOrder(orderId as string).then((response) => {
        if (response) {
          toast.success('Order canceled successfully.');
          setOrder(prevOrder => ({
            ...prevOrder!,
            status: 'Cancelled'
          }));
        } else {
          toast.error('Error canceling order. Please try again.');
        }
      });
    



  }, []);

  if (loading) {
    return (
      <div className="order-details">
        Loading...
      </div>
    );
  }

  return (
    <div className="order-details">
      <div className="order-header">
        <h1>Order nr. {order?._id}</h1>
        
        <div className="order-info">
          <p>Placed on: <strong>{formatDateTime(order?.createdAt as string)}</strong></p>
          <p>Total: <strong>{Math.round(order?.totalPrice as number)}<sup> Lei</sup></strong></p>
        </div>
        <div className="order-status">
            <p>Status: <strong>{order?.status}</strong></p> 
        </div>
      </div>
      <div className="products-sold">
        <h2>Products sold by {order?.distributor.name}</h2>
        <div className="product-details">
          <div className="delivery-info">
            {/* <h3>Produse ridicate</h3>
            <p>Data de livrare: <strong>{new Date(order.createdAt).toLocaleDateString()}</strong></p> */}
          </div>
          <div className="delivery-modalities">
            <div className="delivery-method">
              <h4>Delivery Method:</h4>
              <p>DHL Express</p>
              <p>Customer: {order?.name} </p>
              <p>Phone: {order?.phoneNumber}</p>
              <h4>Delivery Address:</h4>
                <p>Country: {order?.address.country}</p>
                <p>County:{order?.address.county}</p>
                <p>City: {order?.address.city}</p>
                <p>Street: {order?.address.street}</p>
                <p>Number:{order?.address.number}</p>
                <p>Postal Code: {order?.address.zip}</p> 
            </div>
            <div className="billing-info">
              <h4>Billing info</h4>
              <p>Customer: {order?.name}</p>
              <p>Country: {order?.address.country}</p>
              <p>County:{order?.address.county}</p>
              <p>City: {order?.address.city}</p>
              <p>Street: {order?.address.street}</p>
              <p>Number:{order?.address.number}</p>
            </div>
            <div className="payment-method">
              <h4>Modalitate de plata</h4>
              <p>{order?.paymentMethod}</p>
              <p className="payment-status">Plata acceptata</p>

              <h4>Order Status</h4>
              <p>{order?.status} </p>
              {order?.status === 'Pending' && <button onClick={handleEditOrderStatus}>Confirm Shipment from Distributor<Edit/></button>}
              {order?.status === 'Pending' && <button onClick={handleCancelOrder}>Cancel Order<DisabledByDefaultIcon/></button>}
            </div>
          </div>
          {order?.products.map((p, index) => (
            <div key={index} className="product-item">
              <img src={p.product.image[0]} alt="Product" />
              <div className="product-description">
                <p className="product-name">{p.product.name}</p>
                <p className="product-price">{p.product.price}<sup> Lei</sup></p>
                <p className="product-quantity">{p.quantity} buc</p>
              </div>
            </div>
          ))}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Subtotal: <strong>{Math.round(order?.totalPrice as number)}<sup> Lei</sup></strong></p>
            <p>Shipping: <strong>12.99<sup> Lei</sup></strong></p>
            <p>Total: <strong>{Math.round(order?.totalPrice as number) + 12.99}<sup> Lei</sup></strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
