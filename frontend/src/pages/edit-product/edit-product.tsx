import React, { useState, useEffect } from 'react';
import Form from '../../components/controls/form/form';
import useProduct from '../../hooks/useProduct';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';

const EditProductPage: React.FC = () => {
  const { user, token } = useAuth();
  const { productId } = useParams();
  const { fetchProduct, updateProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    stock: 0,
    category: '',

    distributorId: user?.id
  });

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProduct(productId as string).then((product) => {
      if (product) {
        setFormData({
          id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image[0],
          stock: product.stock,
          category: product.categories[0].name,
       
          distributorId: product.distributor
        });
      }
    });
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await updateProduct(formData);
      navigate('/products'); // Redirect to products page after successful update
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error('Error updating product:', err);
    }
  };

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
          { id: 'image', label: 'Image URL', type: 'file', placeholder: 'Enter image URL', icon: 'image' },
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