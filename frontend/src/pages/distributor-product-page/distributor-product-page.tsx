import React, { useState, useEffect } from 'react';
import Form from '../../components/controls/form/form';
import { useAuth } from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
import useProduct from '../../hooks/useProduct';
import './distributor-product-page.css';
import { Category } from '../../types/CategoryType';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: (string | File)[];
  stock: number;
  brand: string;
  categories: Category[];
  distributor?: string;
  isActive?: boolean;
}

const DistributorProductPage = ({type}: {type: string}) => {
  const { user } = useAuth();
  const { productId } = type === 'edit-product' ? useParams() : {productId: ''};
  const { addProduct, fetchProduct, editProduct } = useProduct();

  const [formData, setFormData] = useState<Product>({} as Product);

  useEffect(() => {
    if (type === 'edit-product' && productId) {
      fetchProduct(productId).then((product) => {
        if (product) {
          setFormData({
            ...product,
            images: product?.images || [],
          });
        }
      });
    }
  }, [type, productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') {
        // Handle existing image URLs
        const existingImages = value.filter((img): img is string => typeof img === 'string');
        existingImages.forEach(imgUrl => formDataToSend.append('images', imgUrl));

        // Handle new file uploads
        const newImages = value.filter((img): img is File => img instanceof File);
        newImages.forEach(file => formDataToSend.append('images', file));
      } else if (key === 'categories') {
        const categoryIds = (value as Category[]).map(category => category._id).join(',');
        formDataToSend.append('categories', categoryIds);
      } else {
        formDataToSend.append(key, value as string | Blob);
      }
    });

    try {
      const response = type === 'edit-product' 
        ? await editProduct(formData._id, formDataToSend)
        : await addProduct(formDataToSend);
      console.log('Response:', response);
    } catch (error) {
      console.error('Error handling product:', error);
    }
  };

  return (
    <div className="add-product-container">
      <header>
        <h1>
          {user?.role === 'distributor' 
            ? type === 'add-product' ? 'Add Product' : 'Edit Product' 
            : 'Access Denied'}
        </h1>
      </header>
      <main>
        <Form
          fieldList={[
            { id: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name', icon: 'product' },
            { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter product description', icon: 'description' },
            { id: 'categories', label: 'Category', type: 'category', placeholder: 'Enter category', icon: 'category' },
            { id: 'brand', label: 'Brand', type: 'text', placeholder: 'Enter brand', icon: 'brand' },
            { id: 'price', label: 'Price', type: 'number', placeholder: 'Enter price', icon: 'price' },
            { id: 'images', label: 'Images', type: 'file', placeholder: 'Select images', icon: 'image' }, 
            { id: 'stock', label: 'Stock', type: 'number', placeholder: 'Enter stock', icon: 'stock' },
            type === 'edit-product' ? { id: 'isActive', label: 'Active', type: 'checkbox', placeholder: 'Enter product status', icon: 'status' } : null
          ].filter(Boolean)}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          type={type}
        />
      </main>
    </div>
  );
};

export default DistributorProductPage;