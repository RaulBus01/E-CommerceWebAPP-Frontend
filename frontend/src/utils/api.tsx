import { useAuth } from "../hooks/useAuth";
const API_URL = "http://localhost:3001/api";


const fetchClient = async (url, token, options = {}) => {
  const defaultOptions = {
    headers: {
      'Token': `Bearer ${token}`,
    },
    ...options,
  };

  // Remove 'Content-Type' header if it's FormData
  if (options.body instanceof FormData) {
    delete defaultOptions.headers['Content-Type'];
  } else {
    defaultOptions.headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${API_URL}${url}`, defaultOptions);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'API request failed');
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  } else {
    // Return text for non-JSON responses
    return response.text();
  }
}
//POST
export const _post = (url, data, token, config = {}) => {
  let body;
  
  if (data instanceof FormData) {
    body = data;
  } else {
    body = JSON.stringify(data);
  }

  return fetchClient(url, token, {
    method: 'POST',
    body: body,
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
