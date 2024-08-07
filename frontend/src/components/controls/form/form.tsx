import React from 'react';
import FormField from './form-field';
import './form.css';
import useCategory from '../../../hooks/useCategory';
import { Category } from '../../../types/CategoryType';

const Form = ({ fieldList, formData, setFormData, onSubmit, type }) => {
  const { categories, loading } = useCategory();
 
  const handleChange = (id) => (value) => {
    console.log(id, value);
    setFormData({ ...formData, [id]: value });
    console.log(formData);
  };

  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <form onSubmit={onSubmit} className="form-container">
      {fieldList.map((field) => (
        <FormField
          key={field.id}
          type={field.type}
          label={field.label}
          placeholder={field.placeholder}
          value={formData[field.id] || ''}
          onChange={handleChange(field.id)}
          icon={field.icon}
          categories={field.type === 'category' ? categories as Category[] : undefined}
        />
      ))}
      <button className="btn" type="submit">
        {type === 'edit' ? 'Update Product' : 'Submit'}
      </button>
    </form>
  );
};

export default Form;