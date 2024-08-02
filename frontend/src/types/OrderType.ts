import { addressData } from "./AddressType";
import { productDataForOrder } from "./ProductType";

interface orderData{
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
    createdAt: Date;

}
export type {orderData};