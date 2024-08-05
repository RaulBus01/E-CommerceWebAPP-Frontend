import React from 'react';
import FormField from './form-field';
import './form.css';

const Form = ({ fieldList, formData, setFormData, onSubmit }) => {
  const handleChange = (id) => (value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (id) => (file) => {
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setFormData({ ...formData, [id]: fileURL });
    }
  };

  return (
    <form onSubmit={onSubmit}>
      {fieldList.map((field) => (
        <FormField
          key={field.id}
          type={field.type}
          label={field.label}
          placeholder={field.placeholder}
          value={formData[field.id] || ''}
          onChange={handleChange(field.id)}
          onFileChange={field.type === 'file' ? handleFileChange(field.id) : undefined}
          select={field.select}
          icon={field.icon}
        />
      ))}
      <button className="btn" type="submit">Submit</button>
    </form>
  );
};

export default Form;
