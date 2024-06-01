import React, { useState } from "react";
import styles from "./signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://netflix-final-two.vercel.app/api/register", {
        email: email,
        password: password,
        username: username,
      })
      .then((res) => {
        if (res.status === 201) {
          toast.success("Signup successful", {
            onClose: () => navigate("/signin"),
          });
        } else {
          toast.error("Signup failed");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("An error occurred during signup");
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
              onClick={() => navigate("/signin")}
            >
              Sign In
            </button>
          </div>
        </div>
        <ToastContainer />
        <div className={styles.signup}>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                id="username"
                placeholder="Username"
              />
            </div>
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
              bot. <a href="https://www.google.com/recaptcha/about/">Learn more</a>.
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
