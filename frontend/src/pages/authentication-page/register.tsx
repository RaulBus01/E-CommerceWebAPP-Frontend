import React from 'react'
import './style.css'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.tsx'
import { useNavigate } from 'react-router-dom'
import { registerDataDistributor, registerDataUser } from '../../types/UserType.ts'
import handleDataErrors from './handleDataError.tsx'
import toast from 'react-hot-toast'
import RegisterForm from '../../components/controls/form/registerForm.tsx'


const RegisterPage: React.FC<{userType:string}> = ({userType}) => {
  const { userId,registerUser,registerDistributor } = useAuth()
  const navigate = useNavigate()

  const registerFunctions ={
    User:registerUser,
    Distributor:registerDistributor
  }

  const handleSubmit = async (data: registerDataUser & registerDataDistributor) => {
    try { 
     
      
      const error = handleDataErrors({ data, type: 'register', userType: userType as 'Distributor' | 'User' })
      if (error) {
        toast.error(error)
        return
      }
      const registerFunction = registerFunctions[userType as keyof typeof registerFunctions];
      if (!registerFunction) {
        toast.error('Invalid user type');
        return;
      }
      const result = await registerFunction(data)
  
  
      if (result === "success") {
        toast.success('Registration successful')
        if(userType === 'User'){
          navigate('/')
        }
        else if(userType === 'Distributor'){
          navigate(`/distributor-dashboard/${userId}`)
        }
        else if(userType === 'Admin'){
          navigate(`/admin-dashboard/${userId}`)
        }
        
      }
      else{
      toast.error('Registration failed')
      return
      }
  
    } catch (error) {
      console.error('Register failed:', error)
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
          <h2>Sign Up as {userType}</h2>
          <RegisterForm onSubmit={handleSubmit} userType={userType as 'Distributor' | 'User'} />
         
        </div>
        <div className="auth-image">
          <img src="src" alt="Sign Up Illustration" />
          {
            userType === 'User' ?
            <>
            <p>Already have an account? <NavLink to="/login">Login</NavLink></p>
            <p>You are a distributor? <NavLink to="/distributor/login">Login as Distributor</NavLink></p>
            </> : userType === 'Distributor' ?
            <>
            <p>Already have an account? <NavLink to="/distributor/login">Login</NavLink></p>
            <p>You are a user? <NavLink to="/login">Login as User</NavLink></p>
            </> 
            : 
            null
          }
        </div>
      </div>
    </div>
  )
}

export default RegisterPage