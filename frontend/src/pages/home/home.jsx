import React, { useState } from "react";
import "./home.css";
import Dropdown from "../dropdown/dropdown";
import CardSlider from "../cardSlider/cardSlider";

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="home">
      <h1>EmagoAmazoniana</h1>
      <Dropdown
        anchorEl={anchorEl}
        handleClick={handleClick}
        handleClose={handleClose}
        open={open}
      />
      {/* <div className="card-slider-wrapper">
        <CardSlider />
      </div> */}
    </div>
  );
};

export default Home;
