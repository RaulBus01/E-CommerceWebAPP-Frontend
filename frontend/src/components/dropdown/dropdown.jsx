import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Menu, MenuItem } from "@mui/material";
import "./dropdown.css";

const Dropdown = ({ anchorEl, handleClick, handleClose, open }) => {
  const navigate = useNavigate();

  const handleMenuItemClick = (path) => {
    handleClose();
    navigate(path);
  };

  return (
    <div className="dropdown-container">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        //className="dropdown-button"
        sx={{
          backgroundColor: "#ff9001",
          color: "white",
          padding: "10px 20px",
          "&:hover": {
            backgroundColor: "#e78200",
          },
          fontSize: "16px",
        }}
      >
        Categories
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick("/x")}
          className="dropdown-item"
        >
          x
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("/y")}
          className="dropdown-item"
        >
          y
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("/z")}
          className="dropdown-item"
        >
          z
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Dropdown;
