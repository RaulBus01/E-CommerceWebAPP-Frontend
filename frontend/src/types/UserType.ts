interface loginData {
    email: string;
    password: string;
  }
  interface registerDataUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
  
  }
  interface userData {
    address: string;
    first_name: string;
    last_name: string;
    email: string;
    isVerified: boolean;
    createdAt: string;
  }
  interface distributorData {
    address: string;
    name: string;
    email: string;
    isVerified: boolean;
    createdAt: string;
    isDistributor: boolean;

  }
  interface questionData {
    content: string;
    createdAt: string;
    replies: string;
    
  }


  interface address {
    country: string;
    county: string;
    city: string;
    street: string;
    number: string;
    zip: string;
  }
  interface registerDataDistributor {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
    phoneNumber: string;
    address: address;
    CUI: string;
  }


export type { loginData,questionData, registerDataUser, registerDataDistributor,userData,distributorData,address };
