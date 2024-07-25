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

export type { loginData, registerData };