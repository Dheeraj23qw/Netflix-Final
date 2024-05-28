import styles from "./signup.module.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate
  
    const handleSubmit = (e) => {
      e.preventDefault(); // Prevent default form submission
      console.log(email, password);
      axios.post("http://localhost:4096/signin", {
        email: email,
        password: password
      })
      .then((res) => {
        console.log(res);
  
        if(res.data.code === 200){
          //move to home page
          navigate("/home")
          localStorage.setItem("TOKEN", res.data.token)
        }
        else if(res.data.code === 401){
          alert("Invalid password. Please enter Correct password");
        }
      })
      .catch(err => {
        console.log(err);
      });
    };

    const handleSignup = (e) => {
      e.preventDefault();
      
      navigate("/signup"); 
  };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <div className={styles.navbar}>
                        <div><img src="images/logo.png" alt="Logo" /></div>
                        <div>
                            <form id="language">
                                <select>
                                    <option value="Hindi">Hindi</option>
                                    <option value="English">English</option>
                                </select>
                            </form>
                        </div>
                        <button className={styles.sign} type="submit" onClick={handleSignup}>Sign Up</button>
                    </div>
                </div>
                <div className={styles.signup}>


                    <h1>Sign In</h1>
                    <form 
                    onSubmit={handleSubmit}
                    action="/submit" method="post"> {/* Replace "/submit" with your form submission URL */}
                        <div><input
                         onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          value={email}
                        type="email" id="email" placeholder="Email address" /></div>
                        <div><input 
                         onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          value={password}
                        type="password" id="password" placeholder="Password" /></div>
                        <div><button className={styles.submit} type="submit">Submit</button></div>
                        <div className={styles.msg}>This page is protected by Google reCAPTCHA to ensure you're not a bot. <a href="">Learn more</a>.</div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signin;