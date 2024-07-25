import React from 'react'
import './style.css'
import Form from '../../components/controls/form/form'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.tsx'
import { useNavigate } from 'react-router-dom'
import { registerData } from '../../types/UserType.ts'
import handleDataErrors from './handleDataError.tsx'
import toast from 'react-hot-toast'


const RegisterPage: React.FC = () => {
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (data:registerData) => {
    try { 

      const error = handleDataErrors({ data, type: 'register' })
      if (error) {
        alert(error)
        return
      }
      const result = await register(data)

      if (result === 'success') {
        toast.success('Registration successful')
        navigate('/')
      }
     


    } catch (error) {
      console.error('Register failed:', error)

    }
  }



  return (
    <div className="auth-container">
       <div className='auth-content'>
        <div className="auth-box">
          <h2>Sign up</h2>
          <Form type="Register" onSubmit={handleSubmit} />
         
        </div>
        <div className="auth-image">
          <img src="src" alt="Sign Up Illustration" />
          <NavLink to="/login" >Already a member? Log in</NavLink>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage