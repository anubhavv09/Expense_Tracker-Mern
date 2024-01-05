// Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/navbar.css";
import { useNavigate } from "react-router-dom";
import obj from "./AuthService";
import axios from "axios";
import { GiHamburgerMenu } from "react-icons/gi";
import { z } from 'zod';

const Navbar = () => {
  const navigate = useNavigate();
  const token = obj.getToken();
  const [username, setUsername] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const apiUrl=import.meta.env.VITE_API_BASE_URL;

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const logoutHere = () => {
    obj.removeToken();
    navigate("/signin");
  };

  useEffect(() => {
    const getUsername = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const result = await axios.get(
          `${apiUrl}verify/getUsername`,
          config
        );
        setUsername(result.data.username);
      } catch (error) {
        console.log("Error fetching username:", error);
      }
    };

    getUsername();
  }, [token]); // Include dependencies in the dependency array

  return (
    <>
      <nav className="nav">
        <div className="container">
          <div className="logo-class">Expense Tracker</div>
          <div className="menu-icon" onClick={handleShowNavbar}>
          <GiHamburgerMenu />
          </div>
        

          <div className={`nav-elements ${showNavbar ? "active" : ""}`}>
            <div className="ul-list">
              <li>
                <Link to="/dashboard">DashBoard</Link>
              </li>
              <li>
                <Link to="/expense">Expense</Link>
              </li>
              <li>
                <Link to="/income">Income</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/game">Game</Link>
              </li>
              <li>
                <div style={{color:"white"}} className="navbar-font" > {username}</div>
              </li>
              <li>
                <div style={{color:"white"}} onClick={logoutHere} className="navbar-font" >Logout</div>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
