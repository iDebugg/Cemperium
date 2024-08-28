// src/components/LogoutButton.js

import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logout } from "../controller/assetscontroller";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch logout action
    dispatch(logout());

    // Clear token from localStorage
    localStorage.removeItem("token");

    // Console confirmation
    console.log("Token has been cleared from localStorage.");

    // Toast notification for logout confirmation
    toast.success("You have been logged out successfully!");

    // Redirect to login page
    navigate("/LogIn");
  };

  return (
    <div className="bottom-content">
      <ul>
        <li>
          <Link onClick={handleLogout} className="nav-link">
            <i className="fa-solid fa-right-from-bracket icon"></i>
            <span className="text nav-text">Log Out</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default LogoutButton;
