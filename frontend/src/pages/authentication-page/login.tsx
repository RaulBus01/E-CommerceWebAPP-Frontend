import React from 'react'
import './style.css'
import Form from '../../components/controls/form/form'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.tsx'
import { loginData } from '../../types/UserType.ts'
import handleDataErrors from './handleDataError.tsx'
import toast from 'react-hot-toast'

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate()

  const handleSubmit = async (data: loginData) => {
    try {
      const error = handleDataErrors({ data, type: 'login' })
      if (error) {
        toast.error(error)

        return
      }
      const result = await login(data)
      if (result === 'success') {
        toast.success('Login successful')
        navigate('/')
      }

    } catch (error) {
      console.error('Login failed:', error)

    }
  }

  return (
    <div className="auth-container">
      <div className='auth-content'>
        <div className="auth-box">
            <h2>Login In</h2>
            <Form type="Login" onSubmit={handleSubmit} />
        </div>
        <div className="auth-image">
            <img src={login} alt="Sign Up Illustration" />
            <NavLink to="/register" style={{"textDecoration":"none"}} >New in our community? Sign Up</NavLink>
        </div>
      </div>
    </div>
  )
}

export default LoginPage