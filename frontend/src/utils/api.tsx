const API_URL = "http://localhost:3001/api";

const fetchClient = async (url, options = {}) => {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Token': `Bearer ${sessionStorage.getItem('token')}`,
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
export const _post = (url, data, config = {}) => {
    return fetchClient(url, {
      method: 'POST',
      body: JSON.stringify(data),
      ...config,
    });
  };


//GET
export const _get = (url, config = {}) => {
    return fetchClient(url, {
      method: 'GET',
      ...config,
    });
  };

//PUT
export const _put = (url, data, config = {}) => {
    return fetchClient(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...config,
    });
  };

//DELETE
export const _delete = (url, data, config = {}) => {
    return fetchClient(url, {
      method: 'DELETE',
      body: JSON.stringify(data),
      ...config,
    });
  };



// //CART
// export const getCart = (userId, token) => {
//     return fetch(`${API_URL}/cart/find`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Token": `Bearer ${token}`,
//         },
//     });
// }

// export const editProductQuantities = (userId, product, token, quantity, stock) => {  
//     return fetch(`${API_URL}/cart/edit`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Token': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id: userId, productId: product.product._id, quantity, stock }),
//       });
// }

// export const addProductCart = (userId, product, token) => {
//     return fetch(`${API_URL}/cart/add`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Token': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id: userId, productId: product._id, quantity: 1 }),
//       });
// }

// export const removeProductCart = (userId, product, token) => {
//     return fetch(`${API_URL}/cart/deleteProduct`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Token': `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id: userId, productId: product._id }),
//       });
// }

// //FAVOURITES
// export const getFavourites = (userId, token) => {
//     return fetch(`${API_URL}/favourites/find/${userId}`, {
//         method: "GET",
//         headers: {
//             "Content-Type": "application/json",
//             "Token": `Bearer ${token}`,
//         },
//     });
// }

// export const addFavourites = (userId, productId, token) => {
//     return fetch(`${API_URL}/favourites/add`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//             "Token": `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id:userId, productId }),
//     });
// }

// export const removeFromFavourites = (userId, productId, token) => {
//     return fetch(`${API_URL}/favourites/deleteProduct`, {
//         method: "DELETE",
//         headers: {
//             "Content-Type": "application/json",
//             "Token": `Bearer ${token}`,
//         },
//         body: JSON.stringify({id:userId, productId}),
//     });
// }

