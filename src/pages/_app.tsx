import Header from '../components/header';
import Footer from '../components/footer';

import styles from '../styles/pages/app.module.css';
import '../styles/global.css'
import Head from 'next/head';
import { useEffect, useState } from 'react';
import DarkModeCheck from '../components/dark-mode-check';

function MyApp({ Component, pageProps }) {

  const [isDarkMode, setIsDarkMode] = useState(false);

  function themeChange(){
    localStorage.setItem('isDarkMode', String(!isDarkMode) );
    setIsDarkMode( !isDarkMode);
  }

  useEffect(() =>{
    setIsDarkMode( localStorage.getItem('isDarkMode') === 'true');
  },[]);

  return (
    <div className={`${isDarkMode? styles.dark : styles.light} ${styles.themeContainer}`}>
      
      <div>
        <DarkModeCheck 
          isDarkMode={isDarkMode}
          themeChange={themeChange}
        />
      </div>

      <div className={`${styles.container}`}>
        <Head>
          <title>Timer/Cronômetro  Online</title>

          <meta name="description" content="Timer/Temporizador - Cronômetro Online para contagem regressiva de tempo com diversos sons de alarme para escolher." />
          <meta property="og:title" content="Timer/Cronômetro Online" />
          <meta property="og:description" content="Timer/Temporizador - Cronômetro Online para contagem regressiva de tempo com diversos sons de alarme para escolher" />
          <meta property="website:section" content="Timer" />

          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://timer.botecodigital.dev.br/" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta property="og:locale" content="pt_BR" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://timer.botecodigital.dev.br/" />
          <meta property="og:site_name" content="Timer/Temporizador - Cronômetro Online" />


          <meta property="og:image" content="https://timer.botecodigital.dev.br/logo512.png" />
          <meta property="og:image:type" content="image/png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />

          <meta property="website:tag" content="timer" />
          <meta property="website:tag" content="temporizador" />
          <meta property="website:tag" content="cronometro" />
          <meta property="website:tag" content="alarme" />
          <meta property="website:tag" content="tempo" />
        </Head>
        <Header />


        <Component {...pageProps} />

        <Footer />
      </div>
    </div>
  );
}

export default MyApp
