import Head from 'next/head'

import styles from '../styles/components/index.module.css';
import FormTimer from '../components/form-timer';
import TimerProvider from "../contexts/TimerContext";
import TimerList from "../components/timer-list";
import Countdown from '../components/countdown';

export default function Home() {
  return (
    <TimerProvider>
    <section className={styles.indexContainer}>
      <div>
        <FormTimer />
        <Countdown />
      </div>
      <div>
        <TimerList />
      </div>
    </section>
  </TimerProvider>
  )
}
