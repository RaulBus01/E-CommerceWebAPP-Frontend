import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./dropdown.css";

const Dropdown = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [clickedDropdown, setClickedDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const categories = [
    {
      name: "Fiction",
      key: "fiction",
      options: ["Blugi", "Fiction Category 2"],
    },
    {
      name: "Non-fiction",
      key: "nonFiction",
      options: ["Non-fiction Category 1", "Non-fiction Category 2"],
    },
    {
      name: "Academic & Textbooks",
      key: "academic",
      options: ["Academic Category 1", "Textbook Category 2"],
    },
    {
      name: "Audiobooks",
      key: "audiobooks",
      options: ["Audiobook Category 1", "Audiobook Category 2"],
    },
    {
      name: "eBooks",
      key: "ebooks",
      options: ["eBook Category 1", "eBook Category 2"],
    },
    {
      name: "Kids & YA",
      key: "kids",
      options: ["Kids Category 1", "YA Category 2"],
    },
    {
      name: "Book Accessories & Gifts",
      key: "accessories",
      options: ["Accessory Category 1", "Gift Category 2"],
    },
  ];

  const handleOptionClick = (option: string) => {
    navigate(`/category/${option.replace(/ /g, "-")}`);
  };

  const handleDropdownToggle = (key: string) => {
    if (clickedDropdown === key) {
      setClickedDropdown(null);
    } else {
      setClickedDropdown(key);
      setOpenDropdown(key);
    }
  };

  const handleMouseEnter = (key: string) => {
    if (!clickedDropdown) {
      setOpenDropdown(key);
    }
  };

  const handleMouseLeave = () => {
    if (!clickedDropdown) {
      setOpenDropdown(null);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdown(null);
      setClickedDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="book-categories" ref={dropdownRef}>
      <div className="categories-container">
        {categories.map((category) => (
          <div
            key={category.key}
            className="dropdown-category"
            onMouseEnter={() => handleMouseEnter(category.key)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleDropdownToggle(category.key)}
          >
            <div className="dropdown-toggle" role="button" tabIndex={0}>
              {category.name}
            </div>
            <div
              className={`dropdown-menu ${
                openDropdown === category.key ? "show" : ""
              }`}
            >
              {category.options.map((option, index) => (
                <div
                  key={index}
                  className="dropdown-item"
                  onClick={() => handleOptionClick(option)}
                  role="button"
                  tabIndex={0}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;