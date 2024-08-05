import React, { useState, useEffect } from 'react';
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
import CategoryIcon from '@mui/icons-material/Category';
import ImageIcon from '@mui/icons-material/Image';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import InventoryIcon from '@mui/icons-material/Inventory';
import TitleIcon from '@mui/icons-material/Title';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Remove } from '@mui/icons-material';
import './form.css';
import { Category } from '../../../types/CategoryType';
import MultiSelect from './multiSelect';

interface FormFieldProps {
  type: 'text' | 'email' | 'password' | 'checkbox' | 'tel' | 'number' | 'textarea' | 'select' | 'file' | 'category';
  label?: string;
  placeholder?: string;
  value: string | boolean;
  onChange: (value: string | boolean | Category[]) => void;
  onFileChange?: (value: File | null) => void;
  icon?: string;
  showVisibilityIcon?: boolean;
  categories?: Category[];
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  label,
  placeholder,
  value,
  onChange,
  onFileChange,
  icon,
  showVisibilityIcon,
  categories,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);


  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const renderIcon = () => {
    switch (icon) {
      case 'email': return <EmailIcon className='icon' />;
      case 'key': return <KeyIcon className='icon' />;
      case 'person': return <PersonIcon className='icon' />;
      case 'phone': return <PhoneIcon className='icon' />;
      case 'business': return <BusinessIcon className='icon' />;
      case 'description': return <DescriptionIcon className='icon' />;
      case 'flag': return <FlagIcon className='icon' />;
      case 'mailbox': return <MarkunreadMailboxIcon className='icon' />;
      case 'street': return <SignpostIcon className='icon' />;
      case 'county': return <ApartmentIcon className='icon' />;
      case 'city': return <LocationCityIcon className='icon' />;
      case 'pin': return <PinDropIcon className='icon' />;
      case 'category': return <CategoryIcon className='icon' />;
      case 'image': return <ImageIcon className='icon' />;
      case 'price': return <LocalOfferIcon className='icon' />;
      case 'stock': return <InventoryIcon className='icon' />;
      case 'product': return <TitleIcon className='icon' />;
      default: return null;
    }
  };

  const handleVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    if (onFileChange) {
      onFileChange(file);
    }
  };

  const handleAddButtonClick = () => {
    fileInputRef.current?.click();
  };
  const handleCategoryChange = (selectedCategories: Category[]) => {
    setSelectedCategories(selectedCategories);
  
    onChange(selectedCategories);
    
  }

 
  
  



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
        ) : type === 'textarea' ? (
          <textarea
            placeholder={placeholder}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : type === 'file' ? (
          <div className="file-upload-container">
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
              accept="image/*"
            />
            {selectedFile ? (
              <div className="image-preview">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Uploaded"
                  onLoad={() => URL.revokeObjectURL(URL.createObjectURL(selectedFile))}
                />
                <div className="overlay" onClick={() => setSelectedFile(null)}>
                  <Remove />
                </div>
              </div>
            ) : (
              <div className="add-image-button" onClick={handleAddButtonClick}>
                <AddCircleOutlineIcon />
              </div>
            )}
          </div>
        ) : type === 'category' ? (
          <div className="category-selects">
              <MultiSelect categories={categories} onCategoriesSelected={handleCategoryChange} />
          </div>
        ) : (
          <input
            type={type === 'password' && showPassword ? 'text' : type}
            placeholder={placeholder}
            value={value as string}
            onChange={(e) => onChange(e.target.value)}
          />
        )}
      </div>
      {showVisibilityIcon && type === 'password' && (
        <div className="visibility-icon" onClick={handleVisibility}>
          {showPassword ? <LockIcon /> : <LockOpenIcon />}
        </div>
      )}
    </div>
  );
};

export default FormField;
