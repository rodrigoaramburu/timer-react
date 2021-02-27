import React from "react"
import styles from '../styles/components/header.module.css';
import AdBanner from "./ad-banner";

const Header = () => (
  <header className={styles.headerContainer}>

    <h1>Timer/Cronômetro Online</h1>
    <p>Timer/Cronômetro Online para contagem regressiva de tempo com diversos som de alarme para escolher.</p>
 
    <AdBanner />
  
  </header>
);

export default Header
