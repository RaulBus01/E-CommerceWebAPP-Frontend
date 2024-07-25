import { registerData, loginData } from '../../types/UserType'

type ErrorType = 'register' | 'login'

const handleDataErrors = ({ data, type }: { data: registerData | loginData; type: ErrorType }): string | null => {
  switch (type) {
    case 'register':
      return handleRegisterErrors(data as registerData)
    case 'login':
      return handleLoginErrors(data as loginData)
    default:
      return 'Unknown error occurred'
  }
}

const handleRegisterErrors = (data: registerData): string | null => {
    if (!data.first_name) {
        return 'First name is required'
      }
      if (!data.last_name) {
        return 'Last name is required'
      }
    if (!data.email) {
    return 'Email is required'
  }
  if (!data.password) {
    return 'Password is required'
  }
if (!data.confirm_password) {
    return 'Confirm password is required'
}
  if (data.password !== data.confirm_password) {
    return 'Passwords do not match'
  }
  if(data.password.length < 6 || data.confirm_password.length < 6){
    return 'Password must be at least 6 characters'
  }
 
  
  return null
}

const handleLoginErrors = (data: loginData): string | null => {
  if (!data.email) {
    return 'Email is required'
  }
  if (!data.password) {
    return 'Password is required'
  }

  return null
}

export default handleDataErrors