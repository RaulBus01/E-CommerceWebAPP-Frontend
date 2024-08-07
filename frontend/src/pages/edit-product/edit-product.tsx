import React, { useState, useEffect } from 'react';
import Form from '../../components/controls/form/form';
import useProduct from '../../hooks/useProduct';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';

const EditProductPage: React.FC = () => {
  const { user, token } = useAuth();
  const { productId } = useParams();
  const { fetchProduct, editProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    _id: '',
    name: '',
    description: '',
    price: 0,
    images: '',
    stock: 0,
    category: '',
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct(productId as string).then((product) => {
      if (product) {
        setFormData({
          _id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.image,
          stock: product.stock,
          category: product.categories[0].name,
        });
      }
    });
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      console.log('Key:', key);
      if (key === 'image') {
        if (formData.images) {
          formDataToSend.append('image', formData.images);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
    );
    try {
      console.log('Sending form data:', formDataToSend);
      const response = await editProduct(formData._id,formDataToSend);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error editing product:', error);
      setError('Error editing product. Please try again.');
    }
  }

  

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Edit Product</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form
        fieldList={[
          { id: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name', icon: 'product' },
          { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter product description', icon: 'description' },
          { id: 'category', label: 'Category', type: 'select', placeholder: 'Enter category', icon: 'category' },
          { id: 'subcategory', label: 'Subcategory', type: 'select', placeholder: 'Enter subcategory', icon: 'category' },
          { id: 'price', label: 'Price', type: 'number', placeholder: 'Enter price', icon: 'price' },
          { id: 'images', label: 'Image URL', type: 'file', placeholder: 'Enter image URL', icon: 'image' },
          { id: 'stock', label: 'Stock', type: 'number', placeholder: 'Enter stock', icon: 'stock' }
        ]}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        type='edit'
      />
    </div>
  );
};

export default EditProductPage;