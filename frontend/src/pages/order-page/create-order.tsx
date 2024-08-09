import React from 'react';
import { Elements, PaymentElement } from '@stripe/react-stripe-js';
import usePayment from '../../hooks/usePayment';
import './order.css';

const CreateOrder = () => {
  const { stripePromise, clientSecret } = usePayment();
  console.log(clientSecret);
  console.log(stripePromise);

  const appearance = {
    theme: 'stripe',
    variables: {
      fontWeightNormal: '500',
      borderRadius: '2px',
      colorPrimary: '#FC5185',  
      tabIconSelectedColor: '#FC5185',
      gridRowSpacing: '16px'
    },
    rules: {
      '.Tab, .Input, .Block, .CheckboxInput, .CodeInput': {
        boxShadow: '0px 3px 10px rgba(18, 42, 66, 0.08)',
        colorPrimary: '#364F6B'
      },
      '.Block': {
        borderColor: 'transparent',
        colorPrimary: '#364F6B'
      },
      '.BlockDivider': {
        backgroundColor: '#ebebeb'
      },
      '.Tab, .Tab:hover, .Tab:focus': {
        border: '0'
      },
      '.Tab--selected, .Tab--selected:hover': {
        backgroundColor: '#FC5185',
        color: '#fff'
      }
    }
  };

  return (
    <div className="create-order">
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <PaymentElement />
          <button>Pay</button>
        </Elements>
      )}
    </div>
  );
};

export default CreateOrder;