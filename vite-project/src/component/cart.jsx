import React, { useState } from "react";
import axios from "axios";
import styles from "./cart.module.css";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

export default function Cart() {
  const location = useLocation();
  const { movieData } = location.state;
console.log(movieData)
  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OynzPSAgwRpikwcc3cRBOvcsZzFfrViPNvm4kLE7PQZOUXwE2c34B44pJNvf0t2qUynT75PXWmTqWbzK7ZkxxKj00OANCOhGq"
    );

    const body = {
      id: movieData.id,
      name: movieData.name,
      quantity: 1,
      price: getDefaultPrice(),
      totalBill: getDefaultPrice().toFixed(2),
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/create-checkout",
        body,
        { headers }
      );
      const result = await stripe.redirectToCheckout({
        sessionId: response.data.id,
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const getDefaultPrice = () => {
    return 12;
  };

  return (
    <div className={styles.cartContainer}>
        <div
        className={styles.movieContainer}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.7)),
           url(https://image.tmdb.org/t/p/original/${movieData.backdrop})`,
        }}
      >
      <div className={styles.heading}>Cart</div>
      <div className={styles.itemsContainer}>
        <div className={styles.movieItem}>
          <div className={styles.imgdiv}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieData.poster}`}
              alt="Movie Image"
              className={styles.movieImage} // Apply styling to this class in your CSS
            />
          </div>
          <div className={styles.movieDetails}>
            <div className={styles.movieName}>{movieData.name}</div>
            <div className={styles.moviePrice}>Price: $10.00</div>
            <div className={styles.overview}>
            {movieData.overview}
          </div>
            <div className={styles.totalBill}>Total Bill: $12.00 (Including GST)</div>
            <div className={styles.checkoutBtn}>
              <button onClick={handlePayment}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
