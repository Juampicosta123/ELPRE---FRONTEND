import React, { useRef, useEffect } from "react";

import { Link, NavLink } from "react-router-dom";
import "./header.css";

import logo from "../../assets/images/logo.jpg";
import userIcon from "../../assets/images/user-icon.png";

import { motion } from "framer-motion";

import { Container, Row } from "reactstrap";

import loginService from "../../services/login";

const nav__links = [
  {
    path: "home",
    display: "Home",
  },
  {
    path: "nopay",
    display: "Sin Pagar",
  },
];

const Header = ({ isLogged }) => {
  const headerRef = useRef(null);

  const profileActionRef = useRef(null);

  const menuRef = useRef(null);

  const handleLogout = async () => {
    loginService.logout();
    window.location.reload();
  };

  const menuToggle = () => menuRef.current.classList.toggle("active__menu");

  const toggleProfileActions = () =>
    profileActionRef.current.classList.toggle("show__profileActions");

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div>
                <h1>ElPre</h1>
              </div>
            </div>

            <div className="navigation" ref={menuRef} onClick={menuToggle}>
              <ul className="menu">
                {
                  isLogged === "1" ? (nav__links.map((item, index) => (
                    <li className="nav__item text-white" key={index}>
                      <NavLink
                        to={item.path}
                        className={(navClass) =>
                          navClass.isActive ? "nav__active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))) : (<li className="nav__item text-white">
                  <NavLink
                    to="/login"
                    className={(navClass) =>
                      navClass.isActive ? "nav__active" : ""
                    }
                  >
                    Login
                  </NavLink>
                </li>)
                }
                
              </ul>
            </div>

            <div className="nav__icons">
              <div className="profile">
                <motion.img
                  whileTap={{ scale: 1.2 }}
                  src={isLogged === "1" ? logo : userIcon}
                  alt="profile"
                  onClick={toggleProfileActions}
                />
                <div
                  className="profile__actions"
                  ref={profileActionRef}
                  onClick={toggleProfileActions}
                >
                  {isLogged === "1" ? (
                    <span onClick={handleLogout}>Logout</span>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center flex-column">
                      <Link to="/login">Login</Link>
                    </div>
                  )}
                </div>
              </div>
              <div className="mobile__menu">
                <span onClick={menuToggle}>
                  <i className="ri-menu-line text-white"></i>
                </span>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
