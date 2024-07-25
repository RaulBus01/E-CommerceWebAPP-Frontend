import { addressData } from "./AddressType";
import { productDataForOrder } from "./ProductType";

interface orderData{
    address: addressData;
    id: string;
    userId: string;
    products: productDataForOrder[];
    status: string;
    first_name: string;
    last_name: string;
    email: string;
    phoneNumber: string;
    totalPrice: number;
    distributorId: string;
    createdAt: string;
}
export type {orderData};