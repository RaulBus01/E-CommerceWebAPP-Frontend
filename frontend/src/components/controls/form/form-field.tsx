import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FlagIcon from '@mui/icons-material/Flag';
import MarkunreadMailboxIcon from '@mui/icons-material/MarkunreadMailbox';
import SignpostIcon from '@mui/icons-material/Signpost';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PinDropIcon from '@mui/icons-material/PinDrop';
import './form.css';

interface FormFieldProps {
  type: 'text' | 'email' | 'password' | 'checkbox' | 'tel';
  label?: string;
  placeholder?: string;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  icon?: 'email' | 'key' | 'person' | 'phone' | 'business' | 'description' | 'flag' | 'mailbox' | 'street' | 'county' | 'city' | 'pin';
  showVisibilityIcon?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  icon,
  showVisibilityIcon
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'email':
        return <EmailIcon className='icon' />;
      case 'key':
        return <KeyIcon className='icon' />;
      case 'person':
        return <PersonIcon className='icon' />;
      case 'phone':
        return <PhoneIcon className='icon' />;
      case 'business':
        return <BusinessIcon className='icon' />;
      case 'description':
        return <DescriptionIcon className='icon' />;
      case 'flag':
        return <FlagIcon className='icon' />;
      case 'mailbox':
        return <MarkunreadMailboxIcon className='icon' />;
      case 'street':
        return <SignpostIcon className='icon' />;
      case 'county':
        return <ApartmentIcon className='icon' />;
      case 'city':
        return <LocationCityIcon className='icon' />;
      case 'pin':
        return <PinDropIcon className='icon' />;



      default:
        return null;
    }
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="form-group-container">
      <div className="form-group">
        {renderIcon()}
        {type === 'checkbox' ? (
          <>
            <input
              type="checkbox"
              id={label}
              checked={value as boolean}
              onChange={(e) => onChange(e.target.checked)}
            />
            <label htmlFor={label}>{label}</label>
          </>
        ) :  (
          
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            placeholder={placeholder}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
            
          />
        )}
      </div>
        {showVisibilityIcon && (
          <div className="visibility-icon" onClick={handleVisibility}>
            {showPassword ? <LockIcon /> : <LockOpenIcon />}
        </div>
      )}
    </div>
  );
};

export default FormField;
