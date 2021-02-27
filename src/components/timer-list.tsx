import React, { useContext } from 'react';
import { TimerContext, Timer } from '../contexts/TimerContext';

import styles from '../styles/components/timer-list.module.css';

export default function TimerList() {

    const { listTimers, removeTimer, setCurrentTimer } = useContext(TimerContext);

    function formatSeconds(sec: number) {
        if (sec < 0) sec = 0;
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor(sec / 60 % 60);
        const seconds = sec % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        <>
            {listTimers.length > 0 && (
                <div className={styles.timerListContainer}>
                    {listTimers.map((timer: Timer) => (
                        <div className={styles.timerListItem} key={timer.uuid}>
                            <h4>{timer.name}</h4>
                            <time>{formatSeconds(timer.targetTime)}</time>
                            <div>
                                <button onClick={() => setCurrentTimer(timer)} title="Carregar Timer">
                                    <img className={styles.carregarTimerButton} src="/icons/load.svg" width="24" alt="Carregar Timer" />
                                </button>

                                <button onClick={() => removeTimer(timer.uuid)} title="Remover Timer">
                                    <img src="/icons/trash.svg" width="24" alt="Deletar" />
                                </button>
                            </div>
                        </div>
                    ))}
                    <small>* os dados são salvos no navegador, se os dados forem limpos ou se estiver utilizando uma aba anônima eles serão perdidos.</small>
                </div>
            )}

            {listTimers.length === 0 && (
                <div className={styles.timerListEmpty}>
                    <img src="/icons/cancel.svg" width="64" alt="Icone de Vazio" />
                    Nenhum Timer Salvo!
                </div>
            )}
        </>
    );
}

