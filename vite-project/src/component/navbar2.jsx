import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import styles from "./navbar.module.css";
import {FaPlay} from "react-icons/fa";
export default function Navbar2({ isScrolled }) {
  const links = [
    { name: "Home", link: "/home" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My list", link: "/list" },
  ];
  const navigate = useNavigate();


  const handleSignout = () => {
    localStorage.removeItem("token");
    navigate("/signup");
  };

  return (
    <>
      <div className={styles.container}>
        <nav >
          <div className={styles.container1}>
            <div className={styles.brand}>
              <img src="images/logo.png" alt="logo" />
            </div>
            <ul className={styles.link}>
              {links.map((link) => (
                <li key={link.name}>
                  <Link to={link.link}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.right}>
            <div>
              {" "}
              <input
                className={styles.Search}
                type="text"
                placeholder="Search"
              />
            </div>
            <button onClick={handleSignout}>
              <FaPowerOff />
            </button>
          </div>
        </nav>
      </div>
      
    </>
  );
}