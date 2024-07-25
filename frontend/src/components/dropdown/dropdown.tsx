import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './dropdown.css';

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const options = ['Utilaje agricole', 'Foraje', 'Ingrasaminte & Tratamente'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const navigate = useNavigate();

  const handleOptionClick = (option: string) => {
    setIsOpen(false);
    navigate(`/category/${option.replace(/ /g, '-')}`);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        Categories
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div key={index} className="dropdown-item" onClick={() => handleOptionClick(option)}>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
