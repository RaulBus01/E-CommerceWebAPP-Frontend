import { registerDataUser, loginData, registerDataDistributor } from '../../types/UserType'

type ErrorType = 'register' | 'login'

const handleDataErrors = ({ data, type,userType }: { data: registerDataUser | registerDataDistributor | loginData; type: ErrorType,userType:string }): string | null => {
  switch (type) {
    case 'register':
      return handleRegisterErrors(userType === 'User' ? data as registerDataUser : data as registerDataDistributor,userType)
    case 'login':
      return handleLoginErrors(data as loginData)
    default:
      return 'Unknown error occurred'
  }
}

const handleRegisterErrors = (data: registerDataUser | registerDataDistributor, userType: string): string | null => {

  
  if (userType === 'User') {
    const userData = data as registerDataUser;
    if (!userData.first_name || !userData.last_name) {
      return "Please enter both first and last name.";
    }
  }
  if (userType === 'Distributor') {
    const distributorData = data as registerDataDistributor;
    if (!distributorData.name) {
      return "Please enter a company name.";
    }
    if (!distributorData.CUI || distributorData.CUI.length !== 6) {
      return "Please enter a valid CUI.";
    }
    if (!distributorData.phoneNumber || distributorData.phoneNumber.length !== 10) {
      return "Please enter a phone number with 10 digits.";
    }
    if (!distributorData.address )
      return "Please enter a valid address.";
   
    if (!distributorData.address.country)
      return "Please enter a valid country.";

    if (!distributorData.address.county)
      return "Please enter a valid county.";

    if (!distributorData.address.city)
      return "Please enter a valid city.";

    if (!distributorData.address.street)
      return "Please enter a valid street.";

    if (!distributorData.address.number)
      return "Please enter a valid number.";

    if (!distributorData.address.zip)
      return "Please enter a valid zip.";

    }
  if (!data.email) {
    return 'Email is required'
  }
  if (!data.password) {
    return 'Password is required'
  }
  if (!data.confirm_password || data.password !== data.confirm_password) {
    return 'Passwords do not match'
  }
  if (data.password.length < 6) {
    return 'Password must be at least 6 characters long'
  }
  

  return null; // No errors found
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