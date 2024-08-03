import { addressData } from "./AddressType";
interface loginData {
    email: string;
    password: string;
  }
  interface registerDataCustomer {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    phoneNumber?: string;
    address?: addressData;
    role: userRole;
  }
  interface registerDataDistributor {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    phoneNumber: string;
    address: addressData;
    CUI: string;
    role: userRole;
  }
  interface DataCustomer {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    phoneNumber?: string;
    address?: addressData;
    isVerified?: boolean;
  }
interface DataDistributor {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    phoneNumber: string;
    address: addressData;
    CUI: string;
    isAuthorized: boolean;
  }
type userRole = 'customer' | 'distributor' | 'admin';






export type {userRole, loginData, DataCustomer, DataDistributor, registerDataCustomer, registerDataDistributor };
