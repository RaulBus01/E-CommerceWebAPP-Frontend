import React, { useState, useEffect } from 'react';
import Form from '../../components/controls/form/form';
import useProduct from '../../hooks/useProduct';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';



const EditProductPage: React.FC = () => {
  const { userId, token } = useAuth();
  const { productId } = useParams();
  const { editProduct, fetchProduct } = useProduct(token);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    stock: '',
    category: '',
    subcategory: '',
    distributorId: userId
  });

  useEffect(() => {
    fetchProduct(productId as string).then((productData) => {
      if (productData) {
        setFormData({
          id: productId,
          name: productData.name,
          description: productData.description,
          price: productData.price,
          image: productData.image,
          stock: productData.stock,
          category: productData.category,
          subcategory: productData.subcategory || '',
          distributorId: productData.distributor
        });
      }
    });
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data being submitted:", formData);
    const result = await editProduct(formData); 
    if (result) {
      navigate(`/distributor-dashboard/${userId}`);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Edit Product</h1>
      <Form
        fieldList={[
          { id: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name', icon: 'product' },
          { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter product description', icon: 'description' },
          { id: 'category', label: 'Category', type: 'select', placeholder: 'Enter category', icon: 'category' },
          { id: 'subcategory', label: 'Subcategory', type: 'select', placeholder: 'Enter subcategory', icon: 'category' },
          { id: 'price', label: 'Price', type: 'number', placeholder: 'Enter price', icon: 'price' },
          { id: 'image', label: 'Image URL', type: 'file', placeholder: 'Enter image URL', icon: 'image' },
          { id: 'stock', label: 'Stock', type: 'number', placeholder: 'Enter stock', icon: 'stock' }
        ]}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};


export default EditProductPage;