import React from 'react'
import styles from "./NotAvailable.module.css";
export default function NotAvailable() {
  return (
   <>
        <div className={styles.container}>
        <h1 className={styles.msg}>
            No Movies Available for Selected Genres.
    </h1>
    </div>
    </>
  )
}

