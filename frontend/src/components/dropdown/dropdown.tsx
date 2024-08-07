import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import "./dropdown.css";

const Dropdown = () => {
  const [openDropdowns, setOpenDropdowns] = useState<string[]>([]);
  const [clickedDropdowns, setClickedDropdowns] = useState<string[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const { categories, loading } = useCategory();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdowns([]);
        setClickedDropdowns([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: string) => {
    navigate(`/category/${option.replace(/ /g, "-")}`);
  };

  const handleDropdownToggle = (key: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setClickedDropdowns(prev => 
      prev.includes(key) ? prev.filter(id => id !== key) : [...prev, key]
    );
    setOpenDropdowns(prev => 
      prev.includes(key) ? prev.filter(id => id !== key) : [...prev, key]
    );
  };

  const handleMouseEnter = (key: string) => {
    if (!clickedDropdowns.includes(key)) {
      setOpenDropdowns(prev => [...prev, key]);
    }
  };

  const handleMouseLeave = (key: string) => {
    if (!clickedDropdowns.includes(key)) {
      setOpenDropdowns(prev => prev.filter(id => id !== key));
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const renderSubcategories = (subcategories: any[], parentId: string) => {
    return subcategories.map((subCategory) => (
      <div 
        key={subCategory._id}
        className="dropdown-subcategory"
        onMouseEnter={() => handleMouseEnter(subCategory._id)}
        onMouseLeave={() => handleMouseLeave(subCategory._id)}
      >
        <div
          className="dropdown-item"
          onClick={(e) => {
            e.stopPropagation();
            if (subCategory.children && subCategory.children.length > 0) {
              handleDropdownToggle(subCategory._id, e);
            } else {
              handleOptionClick(subCategory.name);
            }
          }}
          role="button"
          tabIndex={0}
        >
          {subCategory.name}
        </div>
        {subCategory.children && subCategory.children.length > 0 && (
          <div 
            className={`nested-dropdown ${
              openDropdowns.includes(subCategory._id) || clickedDropdowns.includes(subCategory._id) ? 'show' : ''
            }`}
          >
            {renderSubcategories(subCategory.children, subCategory._id)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="book-categories" ref={dropdownRef}>
      <div className="categories-container">
        {categories?.map((category) => (
          <div
            key={category._id}
            className="dropdown-category"
            onMouseEnter={() => handleMouseEnter(category._id)}
            onMouseLeave={() => handleMouseLeave(category._id)}
          >
            <div 
              className="dropdown-toggle" 
              role="button" 
              tabIndex={0}
              onClick={(e) => handleDropdownToggle(category._id, e)}
            >
              {category.name}
            </div>
            {category.children && (
              <div
                className={`dropdown-menu ${
                  openDropdowns.includes(category._id) || clickedDropdowns.includes(category._id) ? "show" : ""
                }`}
              >
                {renderSubcategories(category.children, category._id)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;