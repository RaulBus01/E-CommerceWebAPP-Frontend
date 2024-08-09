import React, { useEffect,useState } from 'react'
import { _get,_post } from '../utils/api';
import { useAuth } from './useAuth';
import { loadStripe } from '@stripe/stripe-js';

const usePayment = () => {
    const {token} = useAuth();
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');


    useEffect(() => {
        _get('/payment/config',token).then(async (res) => {
            const{stripePublicKey: publicKey} = res;
            setStripePromise(loadStripe(publicKey));
        }
        )
    }
    , [])
    useEffect(() => {
        const data = {
            source: 'tok_visa',
            amount: 100,
            currency: 'usd',
        }
        _post('/payment/create-payment',data,token).then(async (res) => {
           
            setClientSecret(res);
        }
        )
    }
    , [])
   

  return {stripePromise, clientSecret}
}

export default usePayment