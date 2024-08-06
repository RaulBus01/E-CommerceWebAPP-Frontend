import React, { useState } from 'react';
import Form from '../../components/controls/form/form';

import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { _post } from '../../utils/api'; // Assuming this is where your API functions are
import './add-product.css';

const AddProductPage = () => {
  const { user,token } = useAuth();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    images: [], // Change this to an array
    stock: '',
    categories: '',
    distributor: user?.id
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form data:', formData);
    const formDataToSend = new FormData();
    

    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        console.log('Images:', formData.images);
        if (formData.images.length === 0) {
          return;
        }
        if (formData.images.length > 1) {
          formData.images.forEach((image: File) => {
            formDataToSend.append('images', image);
          });
          return;
        }
        formDataToSend.append('images', formData.images[0]);
      } else if (key === 'categories') {
        const categoryIds = formData.categories.map((category: { _id: string }) => category._id).join(',');
        formDataToSend.append('categories', categoryIds);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      console.log('Sending form data:', formDataToSend);
      const response = await _post('/products/add', formDataToSend, token);
      console.log('Response:', response);
      if (response) {
        navigate('/products');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="add-product-container">
      <Form
        fieldList={[
          { id: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name', icon: 'product' },
          { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter product description', icon: 'description' },
          { id: 'categories', label: 'Category', type: 'category', placeholder: 'Enter category', icon: 'category' },
          { id: 'price', label: 'Price', type: 'number', placeholder: 'Enter price', icon: 'price' },
          { id: 'images', label: 'Images', type: 'file', placeholder: 'Select images', icon: 'image', multiple: true }, // Allow multiple file selection
          { id: 'stock', label: 'Stock', type: 'number', placeholder: 'Enter stock', icon: 'stock' }
        ]}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddProductPage;