import React, { useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://netflix-final-two.vercel.app/api/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.setItem("TOKEN", res.data.token); // Set the token in local storage
          navigate("/");
        } else {
          toast.error("Login failed: " + res.data.message);
        }
      })
      .catch((err) => {
        toast.error("An error occurred during login.");
        console.error(err);
      });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.navbar}>
            <div>
              <img src="images/logo.png" alt="Logo" />
            </div>
            <div>
              <form id="language">
                <select>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                </select>
              </form>
            </div>
            <button
              className={styles.sign}
              type="button"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
        <ToastContainer />
        <div className={styles.signup}>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                id="email"
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div>
              <button className={styles.submit} type="submit">
                Submit
              </button>
            </div>
            <div className={styles.msg}>
              This page is protected by Google reCAPTCHA to ensure you're not a
              bot.{" "}
              <a href="https://www.google.com/recaptcha/about/">Learn more</a>.
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
