import React from "react";
import "./home.css";
import Dropdown from "../../components/dropdown/dropdown";



const Home = () => {
  return (
    <div className="home">
      <h1 >EmagoAmazoniana</h1>
      <div className="home-dropdown">
        <Dropdown />
      </div>
    </div>
  );
};

export default Home;
