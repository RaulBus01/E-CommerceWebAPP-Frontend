interface loginData {
    email: string;
    password: string;
  }
  interface registerData {
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
export type { loginData, registerData , userData};