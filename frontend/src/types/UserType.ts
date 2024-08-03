import { addressData } from "./AddressType";
interface loginData {
    email: string;
    password: string;
  }
  interface DataCustomer {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    role?: string;
    phoneNumber?: string;
    address?: addressData;
    isVerified?: boolean;
  }
interface DataDistributor {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    role?: string;
    phoneNumber: string;
    address: addressData;
    CUI: string;
    isAuthorized: boolean;
  }

interface userData{
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    role?: string;
    phoneNumber?: string;
    address?: addressData;
    isVerified?: boolean;
    CUI?: string;
    isAuthorized?: boolean;
}

export type { loginData, DataCustomer, DataDistributor, userData};
