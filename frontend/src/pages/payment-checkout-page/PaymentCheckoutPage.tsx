import React from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./PaymentCheckoutPage.css";

const PaymentCheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

   console.log('stripe', stripe)
    console.log('elements', elements)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: 'https://your-website.com/order-complete',
      },
    });

    if (error) {
      console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        Submit
      </button>
    </form>
  );
};

export default PaymentCheckoutPage;
