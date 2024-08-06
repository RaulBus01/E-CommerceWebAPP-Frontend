import React, { useState } from 'react';
import Form from '../../components/controls/form/form';
import useProduct  from '../../hooks/useProduct';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import './add-product.css';


const AddProductPage = () => {
 
  const {user} = useAuth();
  const {addProduct} = useProduct();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    categories: '',
    distributor: user?.distributorInfo._id
  });
 

  const handleSubmit =async (e) => {
    e.preventDefault();
    const result = await addProduct(formData);
    if(result){
      setFormData({
        name: '',
        description: '',
        price: '',
        image: '',
        stock: '',
        categories: '',
        distributor: user?.distributorInfo._id
      });
      navigate(`/distributor-dashboard/${user?.id}`);

    }

  };

  return (
    <div className="add-product-container">
   
      <Form
        fieldList={[
          { id: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name',icon: 'product' },
          { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter product description',icon:'description' },
          { id:'categories', label: 'Category', type: 'category', placeholder: 'Enter category',icon:'category' },
          { id: 'price', label: 'Price', type: 'number', placeholder: 'Enter price',icon:'price' },
          { id: 'image', label: 'Image URL', type: 'file', placeholder: 'Enter image URL',icon:'image' },
          { id: 'stock', label: 'Stock', type: 'number', placeholder: 'Enter stock',icon:'stock' }
        ]}
    
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        
      
      />
    </div>
  );
};

export default AddProductPage;
