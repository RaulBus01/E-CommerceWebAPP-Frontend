import { addressData } from "./AddressType";
import { productDataForOrder } from "./ProductType";

interface orderData{
    _id: string;
    user:string;
    products:productDataForOrder[];
    status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    name: string;
    email: string;
    phoneNumber: string;
    address: addressData;
    totalPrice: number;
    paymentMethod: string;
    distributor: string;
    createdAt: string;


}
export type {orderData};