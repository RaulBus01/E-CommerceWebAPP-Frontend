import React, { useEffect,useState } from 'react';
import './order.css';
import { useAuth } from '../../hooks/useAuth';
import useDistributor from '../../hooks/useDistributor';
import { useNavigate } from 'react-router';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
interface OrderSummaryProps {
    key: string;
    id: string;
    date: string;
    total: number;
    status: string;
    distributorId: string;

 }
 



const OrderSummary = (data:OrderSummaryProps) => {
    const {userId, token,userRole} = useAuth();
    const {distributor, loading: userLoading} = useDistributor(userId, token);
    const [productDistributor,setProductDistributor] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if(distributor ){
            setProductDistributor(distributor);
        }
    },[distributor]);




    
    

    

   


  return (
     userLoading ? <div className="loader"></div> : 

    <div className="orderSummary" key={data.id}>
      <div className="orderHeader">
        <span>Order : {data.id}</span>  

        <span className="orderDate">Placed on: {data.date}</span>
        <span className="orderTotal">Total: {Math.round(data.total)} Lei</span>
        {userRole === 'User'  ? <button className="reorderButton">Reorder</button> : null}
        
      </div>
      
      <div className="orderItem">
        <span>Products from: {distributor?.name}</span>
        <div className="sellerRating">
        </div>
        <span className="productStatus">Status: {data.status}</span>
        {/* <img src="path-to-product-image.jpg" alt="Product" className="productImage" /> */}
      </div>

     
      
      <div className="orderFooter">
        
        <button className="orderDetailsButton" onClick={() => navigate(`/distributor-dashboard/${data.distributorId}/order/${data.id}`)}>
        <KeyboardDoubleArrowDownIcon className="orderDetailsIcon"/>
          Order Details</button>
      </div>
    </div>
  );
};

export default OrderSummary;
