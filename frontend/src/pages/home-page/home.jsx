import React, { useState } from "react";
import "./home.css";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckoutPage from "../payment-checkout-page/PaymentCheckoutPage";
import { useEffect } from "react";



const Home = () => {

  const stripePromise = loadStripe("pk_test_51Pg2VcDhjOk0MV0OoPWBd5SfoFf1xryrwwLqHVaYyNNv7147yXoTQ2QC8tm86L0n4qYH05Q4JhjUf2TeHhjLqPH900hD8gXwhH");

  const [clientSecret, setClientSecret] = useState("");

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="home" >
      <h1 >EmagoAmazoniana</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentCheckoutPage />
        </Elements>
      )}
    </div>
  );
};

export default Home;
