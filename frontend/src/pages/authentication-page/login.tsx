import React from 'react'
import './style.css'

import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.tsx'
import { loginData } from '../../types/UserType.ts'
import handleDataErrors from './handleDataError.tsx'
import toast from 'react-hot-toast'
import LoginForm from '../../components/controls/form/loginForm.tsx'


const LoginPage: React.FC<{userType:string}> = ({userType}) => {
  const { loginUser,loginDistributor,loginAdmin } = useAuth();
  const navigate = useNavigate()

  const loginFunctions ={
    User:loginUser,
    Distributor:loginDistributor,
    Admin:loginAdmin
  }
  const imageSource = {
    User: "https://previews.123rf.com/images/uu777/uu7772004/uu777200400031/146833209-le-concept-de-l-enseignement-%C3%A0-domicile.jpg",
    Distributor: "https://previews.123rf.com/images/uu777/uu7772006/uu777200600013/149560612-concept-de-biblioth%C3%A8que-en-ligne-avec-de-petites-personnes-lisant-des-livres-e-learning.jpg",
    Admin: "https://previews.123rf.com/images/uu777/uu7772006/uu777200600013/149560612-concept-de-biblioth%C3%A8que-en-ligne-avec-de-petites-personnes-lisant-des-livres-e-learning.jpg"
  }


  const handleSubmit = async (data: loginData) => {
    try {
      const error = handleDataErrors({ data, type: 'login', userType })
      if (error) {
        toast.error(error)

        return
      }
      const loginFunction = loginFunctions[userType as keyof typeof loginFunctions];
      if (!loginFunction) {
        toast.error('Invalid user type');
        return;
      }
      const result = await loginFunction(data)
      
      if (result === 'success') {
        toast.success('Login successful')
        navigate('/')
      }
      else{
      toast.error('Login failed. Please check your credentials')
      return
      }

    } catch (error) {
      console.error('Login failed:', error)

    }
  }

  return (
    <div className="auth-container">
       <div className="auth-header">
        <h1 className="auth-title" >
          <a href="/" >
          Bookstore
          </a>
          </h1>
        </div>
      <div className='auth-content'>
        <div className="auth-box">
            <h2>Login In as {userType}</h2>
          <LoginForm onSubmit={handleSubmit} />
         
        </div>
       
        <div className="auth-image">
            <img src={imageSource[userType]} alt="Sign Up Illustration" />
            {userType === 'User' ?
            <>
            <p>Don't have an account? <NavLink to="/register">Sign Up</NavLink></p>
            <p>You are a distributor? <NavLink to="/distributor/login">Login as Distributor</NavLink></p>
            </> : userType === 'Distributor' ?
            <>
            <p>Don't have an account? <NavLink to="/distributor/register">Sign Up</NavLink></p>
            <p>You are a user? <NavLink to="/login">Login as User</NavLink></p>
            </> 
            : 
            null}

          
        </div>
         
      </div>
    </div>
  )
}

export default LoginPage