import React from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './order.css';

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:5173/order/summary',
      },
    });

    if (error) {
      console.error('Payment failed:', error);
    } else {
      console.log('Payment succeeded!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;