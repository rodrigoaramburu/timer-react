import React, { useContext, useEffect } from 'react';
import { TimerContext, TimerState } from '../contexts/TimerContext';
import styles from '../styles/components/countdown.module.css';



export default function Countdown() {

    const {
        startTimer,
        currentTimer,
        time,
        timerStatus,
        pauseTimer,
        unpauseTimer,
        stopAlarm,
        reset
    } = useContext(TimerContext);

    let timeDisplay = time;
    if (currentTimer.regressive) {
        timeDisplay = currentTimer.targetTime - Math.floor(time);
    }

    const hours = Math.floor(timeDisplay / 3600).toString().padStart(2, '0');
    const minutes = Math.floor(timeDisplay % 3600 / 60).toString().padStart(2, '0');
    const seconds = Math.floor(timeDisplay % 60).toString().padStart(2, '0');

    const percentProgress = time * 100 / currentTimer.targetTime;

    useEffect(() => {
        const title = document.querySelector('title');
        if (title != null && timerStatus !== TimerState.ready) {
            title.innerText = hours + ":" + minutes + ":" + seconds;
        }
        
    }, [time]);

    return (
        <div className={styles.countdownContainer}>

            { timerStatus !== TimerState.ready && (
                <button className={styles.coutdownButtonResetTop} onClick={reset} title="Reiniciar o timer">
                    <img src="/icons/reset-black.svg" width={32} height={32} alt="reset" />
                </button>
            )}

            <div className={styles.countdownTime}>{hours}:{minutes}:{seconds}</div>

            <div className={styles.countdownProgressBar}>
                <div style={{ width: percentProgress + '%' }}></div>
            </div>
            { timerStatus === TimerState.ready && (
                <button className={styles.countdownButton} onClick={startTimer}>
                    <img src="/icons/play.svg" width={32} height={32} alt="play" />
                    <span>Iniciar</span>
                </button>
            )}
            { timerStatus === TimerState.running && (
                <button className={styles.countdownButton} onClick={pauseTimer}>
                    <img src="/icons/pause.svg" width={32} height={32} alt="pause" />
                    <span>Pause</span>
                </button>
            )}

            { timerStatus === TimerState.paused && (
                <button className={styles.countdownButton} onClick={unpauseTimer}>
                    <img src="/icons/play.svg" width={32} height={32} alt="play" />
                    <span>Continuar</span>
                </button>
            )}
            { timerStatus === TimerState.playing && (
                <button className={styles.countdownButton} onClick={stopAlarm}>
                    <img src="/icons/stop.svg" width={32} height={32} alt="stop" />
                    <span>Parar</span>
                </button>
            )}
            { timerStatus === TimerState.stop && (
                <button className={styles.countdownButton} onClick={reset}>
                    <img src="/icons/reset.svg" width="32" height="32" alt="reset" />
                    <span>Reiniciar</span>
                </button>
            )}
        </div>
    );
}