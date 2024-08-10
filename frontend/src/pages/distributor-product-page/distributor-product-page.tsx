import React, { useState,useEffect } from 'react';
import Form from '../../components/controls/form/form';

import { useAuth } from '../../hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom';

import useProduct from '../../hooks/useProduct';
import { _post } from '../../utils/api';
import './distributor-product-page.css';
import { Category } from '../../types/CategoryType';
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: File[];
  stock: number;
  categories: Category[];
  distributor?: string;
  isActive?: boolean;
}

const DistributorProductPage = ({type}:{type:string}) => {
  const { user,token } = useAuth();
  const { productId } = type === 'edit-product' ? useParams() : {productId: ''};
  const {  addProduct } = useProduct();
  const { fetchProduct,editProduct } = type === 'edit-product' ? useProduct() : {fetchProduct: () => {},editProduct: () => {}};



  const [formData, setFormData] = useState<Product>({} as Product);
  useEffect(() => {
    if (type === 'add-product') {
      return;
    }
    fetchProduct(productId as string).then((product) => {
      if (product) {
        setFormData({
          _id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          images: product.image,
          stock: product.stock,
          categories: product.categories[0].name,
          isActive: product.isActive,
        });
      }
    });
  }, [productId]);

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
     
      const response =  type === 'edit-product' ? await editProduct(formData._id,formDataToSend)  : await addProduct(formDataToSend);
      console.log('Response:', response);

    
    } catch (error) {
      console.error('Error adding product:', error);

    }
  };
  console.log(formData);

  return (
    <div className="add-product-container">
      <header>
        <h1>{user?.role === 'distributor' ? type === 'add-product' ? 'Add Product' : 'Edit Product' : 'Access Denied'}</h1>

      </header>
      <main>
      <Form
        fieldList={[
          { id: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name', icon: 'product' },
          { id: 'description', label: 'Description', type: 'textarea', placeholder: 'Enter product description', icon: 'description' },
          { id: 'categories', label: 'Category', type: 'category', placeholder: 'Enter category', icon: 'category' },
          { id: 'price', label: 'Price', type: 'number', placeholder: 'Enter price', icon: 'price' },
          { id: 'images', label: 'Images', type: 'file', placeholder: 'Select images', icon: 'image' }, 
          { id: 'stock', label: 'Stock', type: 'number', placeholder: 'Enter stock', icon: 'stock' },
          type === 'edit-product' ? { id: 'isActive', label: 'Active', type: 'checkbox', placeholder: 'Enter product status', icon: 'status' } : null
        ]}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        type="add-product"
      />
      </main>
    </div>
  );
};

export default DistributorProductPage;