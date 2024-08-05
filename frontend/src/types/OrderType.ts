import { addressData } from "./AddressType";
import { productDataForOrder } from "./ProductType";
import { DataDistributor, userData } from "./UserType";

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
    distributor: userData;
    createdAt: string;


}
export type {orderData};