import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

function Account() {
    const {logout} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        toast.success('Logout successful');
        navigate('/');
        
        
    }

  return (
    <div>
        account 
        <button onClick={handleLogout}>Logout</button>


    </div>
    
  )
}

export default Account