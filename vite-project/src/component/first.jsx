
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom"; 
import  styles from './first.module.css';
function First() {

    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        navigate("/signup"); 
    };

    const handleSign = (e) => {
      e.preventDefault();
      
      navigate("/signin"); 
  };

  return (
    <>
      <div className={styles.container1}>
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
            <div><button className={styles.sign} type="submit" onClick={handleSign}>Sign In </button></div>
          </div>
        </div>

        <div className={styles.headertext}>
          <h1>Unlimited films, TV programmes and more</h1>
          <p>Watch anywhere. Cancel at any time.</p>
          <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
          <form onSubmit={handleSubmit}>
            <input
             onChange={(e) => {
               setEmail(e.target.value);
             }}
             value={email}
             className={styles.gmail}
             type="email" id="email" placeholder="Email address" />
            <button className={styles.getstarted} type="submit">Get Started {">"}</button>
          </form>
        </div>
      </div>

      <div className={styles.container2}>
        <div className={styles.subcontainer}>
          <div className={styles.left}>
            <h2>Enjoy on your TV</h2>
            <p>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</p>
          </div>
          <div className={styles.right}><img src="images/feature-1.png" alt="Feature 1" /></div>
        </div>
      </div>

     

      <div className={styles.container2}>
        <div className={styles.subcontainer}>
            <div className={styles.left}><img src="images/feature-2.png" /></div>
            <div className={styles.right}><h2>Download your programmes to watch offline</h2>
                <p>Save your favourites easily and always have something to watch.</p></div>
        </div>
    </div>

    <div className={styles.container2}>
        <div className={styles.subcontainer}>
            <div className={styles.left}><h2>Watch everywhere</h2>
                <p>Stream unlimited films and TV programmes on your phone, tablet, laptop and TV.</p></div>
            <div className={styles.right}><img src="images/feature-3.png" /></div>
        </div>
    </div>

    <div className={styles.container2}>
        <div className={styles.subcontainer}>
            <div className={styles.left}><img src="images/feature-4.png" /></div>
            <div className={styles.right}><h2>Create profiles for children</h2>
                <p>Send children on adventures with their favourite characters in a space made just for them – free with
                your membership.</p></div>
        </div>
    </div>

      <div className={styles.container3}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.querry}>What Can I Watch on NETFLIX?</div>
        <div className={styles.querry}>What is NETFLIX?</div>
        <div className={styles.querry}>How Much NETFLIX? Cost?</div>
        <div className={styles.querry}>Where can I Watch?</div>
        <div className={styles.querry}>How Do I Cancel?</div>
        <div className={styles.querry}>Is NETFLIX Good For Children?</div>
        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
        <form>
          <input type="email" className={styles.gmail} placeholder="Email address" />
          <button className={styles.getstarted} type="submit" onClick={handleSign}>Get Started {">"}</button>
        </form>
      </div>
    

      <div className={styles.footer}>
        <div className={styles.subfooter}>
        <div className={styles.gridcontainer}>
                <a href="" className={styles.griditem}>About</a>
                <a href="" className={styles.griditem}>FAQ</a>
                <a href="" className={styles.griditem}> Help Centre</a>
                <a href="" className={styles.griditem}>Account</a>
                <a href="" className={styles.griditem}>Media Centre</a>
                <a href="" className={styles.griditem}>Investor Relations</a>
                <a href="" className={styles.griditem}>Jobs</a>
                <a href="" className={styles.griditem}>Redeem gift cards</a>
                <a href="" className={styles.griditem}>Buy gift cards</a>
                <a href="" className={styles.griditem}>Ways to Watch</a>
                <a href="" className={styles.griditem}>Terms of Use</a>
                <a href="" className={styles.griditem}>Privacy</a>
                <a href="" className={styles.griditem}>Cookie Preferences</a>
       
          </div>
        </div>
      </div>
    </>
  );
}

export default First;
