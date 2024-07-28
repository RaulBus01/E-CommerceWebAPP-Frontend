import React, { useState } from 'react';
import Button from '../button/button';
import FormField from './form-field';
import { NavLink } from 'react-router-dom';

interface LoginFormProps {
    onSubmit: (data: any) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (field: keyof typeof formData) => (value: string | boolean) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange('email')}
        icon="email"
      />
      <FormField
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange('password')}
        icon="key"
        showVisibilityIcon
      />
      <p>Forgot your password? <NavLink to="/forgot-password">Reset Password</NavLink></p>
      <Button
        text="Login"
        type="submit"
        disabled={!formData.email || !formData.password}
      />

    </form>
  );
};

export default LoginForm;