import React, { useState } from 'react'
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Button from '../button/button';
import {registerData, loginData} from '../../../types/UserType'
import './form.css'

interface FormProps {
  type: 'Login' | 'Register'
  onSubmit: (data : loginData | registerData) => void
}
const Form: React.FC<FormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [terms, setTerms] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (type === 'Login') {
      onSubmit({ email, password })
    } else if (type === 'Register') {
      console.log(type)
      onSubmit(type === 'Register' ? {email, password,confirm_password: confirmPassword,first_name: firstName,last_name: lastName} : {email, password});
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {type === 'Register' && (
        <div className="form-group">
          <PersonIcon className='icon'/>
          <input 
            type="text" 
            placeholder="First Name" 
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input 
            type="text" 
            placeholder="Last Name" 
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      )}
      <div className="form-group">
        <EmailIcon className='icon'/>
        <input 
          type="email" 
          placeholder="Your Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <KeyIcon className='icon'/>
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <VisibilityIcon className='icon'/>
      </div>
      {type === 'Register' && (
        <div className="form-group">
          <KeyIcon className='icon'/>
          <input 
            type="password" 
            placeholder="Confirm Password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <VisibilityIcon className='icon'/>
        </div>
      )}
      {type === 'Register' && (
        <div className="form-group">
          <input type="checkbox" id="terms" onChange={(e) => setTerms(prev=>!prev)} />
          <label htmlFor="terms">I agree all statements in <a href="#" >Terms of service</a></label>
        </div>
      )}
      <Button disabled={type ==='Register' ? terms : false} text={type === 'Login' ? 'Login' : 'Sign Up'} type="submit" />
    </form>
  )
}

export default Form