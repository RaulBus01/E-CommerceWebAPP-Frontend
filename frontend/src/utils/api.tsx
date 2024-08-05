import { useAuth } from "../hooks/useAuth";
const API_URL = "http://localhost:3001/api";


const fetchClient = async (url, token,options = {}) => {
   
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
       
        'Token': `Bearer ${token}`,
      },
      
      ...options,
    };
    const response = await fetch(`${API_URL}${url}`, defaultOptions);

    if (!response.ok) {
    
    const errorData = await response.json();
    throw new Error(errorData.message || 'API request failed');
    
    }

    return response.json();
}

//POST
export const _post = (url, data,token, config = {}) => {
    
    return fetchClient(url,token, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    });
  
  };


//GET
export const _get = (url,token, config = {}) => {
    
    return fetchClient(url, token,{
      method: 'GET',
      ...config,
    });
  };

//PUT
export const _put = (url, data,token, config = {}) => {
    return fetchClient(url,token, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    });
  };

//DELETE
export const _delete = (url, data,token, config = {}) => {
    return fetchClient(url, token,{
      method: 'DELETE',
      body: JSON.stringify(data),
      ...config,
    });
  };
