import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios"; 
import styles from "./cart.module.css";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { removelist } from "../../store";

export default function Cart() {
  const cartItems = useSelector((state) => state.netflix.wishlistItems);
  const [movieQuantity, setMovieQuantity] = useState({});
  const dispatch = useDispatch();

  const handlePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OynzPSAgwRpikwcc3cRBOvcsZzFfrViPNvm4kLE7PQZOUXwE2c34B44pJNvf0t2qUynT75PXWmTqWbzK7ZkxxKj00OANCOhGq"
    );
  
    const body = {
      cartItems: cartItems.map((movie) => ({
        id: movie.id,
        name: movie.name,
        quantity: movieQuantity[movie.id] || 1, 
        price: movie.price || getDefaultPrice(movie.id),
      })),
      totalBill: getTotalBill().toFixed(2),
    };
  
    const headers = {
      "Content-Type": "application/json",
    };
  
    try {
      const response = await axios.post("http://localhost:5000/api/create-checkout", body, { headers });
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

  const getDefaultPrice = (movieId) => {
    return 10; 
  };
  
  const handleQuantityChange = (movieId, quantity) => {
    setMovieQuantity((prevQuantity) => ({
      ...prevQuantity,
      [movieId]: quantity,
    }));
  };

  const handleDeleteItem = (movieId) => {
    dispatch(removelist({ id: movieId }));
    
    setMovieQuantity((prevQuantity) => {
      const newQuantity = { ...prevQuantity };
      delete newQuantity[movieId];
      return newQuantity;
    });
  };

  const calculateMoviePrice = (movie) => {
    return (movie.price || getDefaultPrice(movie.id)) * (movieQuantity[movie.id] || 1);
  };

  const getTotalBill = () => {
    return cartItems.reduce((total, movie) => total + calculateMoviePrice(movie), 0);
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.heading}>Cart</div>
      <div className={styles.itemsContainer}>
        {cartItems.map((movie) => (
          <div key={movie.id} className={styles.movieItem}>
            <div className={styles.movieDetails}>
              <div className={styles.movieName}>{movie.name}</div>
              <div className={styles.moviePrice}>
                Price: ${calculateMoviePrice(movie).toFixed(2)}
              </div>
            </div>
            <div className={styles.controls}>
              <button
                className={styles.quantityBtn}
                onClick={() =>
                  handleQuantityChange(
                    movie.id,
                    (movieQuantity[movie.id] || 0) + 1
                  )
                }
              >
                <FaPlus />
              </button>
              <div className={styles.quantity}>
                {movieQuantity[movie.id] || 1} 
              </div>
              <button
                className={styles.quantityBtn}
                onClick={() =>
                  handleQuantityChange(
                    movie.id,
                    Math.max(0, (movieQuantity[movie.id] || 0) - 1)
                  )
                }
              >
                <FaMinus />
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteItem(movie.id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <>
          <div className={styles.totalBill}>
            Total Bill: ${getTotalBill().toFixed(2)}
          </div>
          <div className={styles.checkoutBtn}>
            <button onClick={handlePayment}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
