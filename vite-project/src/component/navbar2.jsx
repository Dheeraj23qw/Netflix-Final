import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaPowerOff, FaSearch } from "react-icons/fa";
import styles from "./navbar.module.css";
import MovieSearch from "./MovieSearch";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
export default function Navbar2({ isScrolled }) {
  const links = [
    { name: "Home", link: "/first" },
    { name: "All shows", link: "/" },
    { name: "TV Shows", link: "/tv" },
    { name: "Movies", link: "/movies" },
    { name: "My list", link: "/list" },

  ];
  const navigate = useNavigate();


  const handleSignout = () => {
    localStorage.removeItem("TOKEN");
    navigate("/signup");
  };

  return (
    <>
      <div className={styles.container}>
        <nav >
          <div className={styles.container1}>
            <div className={styles.brand}>
              <img src="images/image.png" alt="logo" />
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
          <MovieSearch/>
          {localStorage.getItem("TOKEN") ? (
              <button
                onClick={handleSignout}
                className={styles.logoutButton}
              >
                <FaPowerOff />
              </button>
            ) : (
              <button
                onClick={() => navigate("/signup")}
                className={styles.loginButton}
              >
                Login
              </button>
            )}
          </div>
        </nav>
      </div>
      <style jsx>{`
        .container {
          position: relative;
          z-index: 3000; /* Higher z-index */
        }
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #333;
          position: relative;
          z-index: 3000; /* Higher z-index */
        }
        .container1 {
          display: flex;
          align-items: center;
        }
        .brand img {
          height: 50px;
        }
        .link {
          display: flex;
          list-style: none;
          margin-left: 20px;
        }
        .link li {
          margin: 0 10px;
        }
        .right {
          display: flex;
          align-items: center;
        }
        .background {
          position: relative;
          z-index: 2000; /* Lower than navbar */
        }
        .playButton {
          cursor: pointer;
          font-size: 24px;
        }
      `}</style>
    </>
  );
}