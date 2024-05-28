import React from 'react'
import Cardslider from './cardslider'
import styles from "./slider.module.css";
export default function Slider({movies}) {

const getMoviesFromRange=(from,to)=>{
    return movies.slice(from,to);
}




  return (
    <div className={styles.container}>
      <h1>Trending Now</h1>
        <Cardslider title="trending Now" data={getMoviesFromRange(0,10)}/>
        <h1>New Releases</h1>
        <Cardslider title="New Releases" data={getMoviesFromRange(10,20)}/>
        <h1>Blockbuster</h1>
        <Cardslider title="Blockbuster" data={getMoviesFromRange(20,30)}/>
        <h1>Popular on Netflix</h1>
        <Cardslider title="Popular on Netflix" data={getMoviesFromRange(30,40)}/>
        <h1>Action</h1>
        <Cardslider title="Action" data={getMoviesFromRange(40,50)}/>
        <h1>Epics</h1>
        <Cardslider title="Epics" data={getMoviesFromRange(50,60)}/>
    </div>
  )
}
