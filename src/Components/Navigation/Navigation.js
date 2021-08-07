import React from "react";
import './Navigation.css'
import { CgNotes } from "react-icons/cg";
import { BsListCheck } from "react-icons/bs";
import {FaSignOutAlt} from 'react-icons/fa'
import logo from '../../logo.png';

const Navigation = ({ onRouteChange, isSignedIn, setSubRoute, subRoute }) => {
 
 
  if (isSignedIn) {
    return (
      <nav className="nav">
        <p className='for-mob'>{subRoute}</p>
        <p className="nav-p" onClick={() => setSubRoute("Notebooks")}>
          {" "}
          <span className="nav-name">Notebooks</span>
          <CgNotes className="icon" />
        </p>
        <p className="nav-p" onClick={() => setSubRoute("Todo")}>
          {" "}
          <span className="nav-name">To-do's</span>
          <BsListCheck className="icon" />
        </p>
        <p className="nav-p" onClick={() => onRouteChange("signout")}>
          {" "}
          <span className="nav-name">Sign Out</span>
          <FaSignOutAlt className="icon" />
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        {/* <img className='logo' src={logo} alt="Logo " /> */}
        <a className="app-logo" href="/">
        <img src={logo} alt="Logo" />
        NoteIt</a>
        <p className="nav-p" onClick={() => onRouteChange("signin")}>
          {" "}
          Sign In
        </p>
        <p className="nav-p" onClick={() => onRouteChange("register")}>
          {" "}
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
