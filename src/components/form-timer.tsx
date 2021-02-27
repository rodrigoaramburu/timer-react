import React, { useContext } from 'react';
import { TimerContext, TimerState } from '../contexts/TimerContext';
import styles from '../styles/components/form-timer.module.css';


export default function FormTimer() {
    const { currentTimer, setCurrentTimer, timerStatus, novoTimer, saveTimer } = useContext(TimerContext);

    function nomeHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentTimer({
            ...currentTimer,
            name: event.currentTarget.value
        });
    }

    function timeHandler(event: React.ChangeEvent<HTMLInputElement>): void {
        let time = event.currentTarget.value;
        if (time.length < 8) time += ":00"

        const arrTime: Array<string> = time.split(":");
        let hours = parseInt(arrTime[0]);
        let minutes = parseInt(arrTime[1]);
        let seconds = parseInt(arrTime[2]);

        const target = hours * 3600 + minutes * 60 + seconds;

        setCurrentTimer({
            ...currentTimer,
            targetTime: target
        });
    }

    function alarmHandler(event: React.ChangeEvent<HTMLSelectElement>) {
        const alarms = [
            'emergency_alarm_1',
            'emergency_alarm_2',
            'emergency_bell',
            'emergency_nuclear',
            'science_fiction_alarm',
            'digital_beeps_2',
            'digital_beeps_1',
            'harsh'
        ];

        if (!alarms.includes(event.currentTarget.value)) {
            alert('Alarme não encontrado');
            return;
        }

        setCurrentTimer({
            ...currentTimer,
            soundAlarm: event.currentTarget.value
        });
    }

    function regressiveHandler(event: React.ChangeEvent<HTMLInputElement>) {
        setCurrentTimer({
            ...currentTimer,
            regressive: !currentTimer.regressive
        });
    }


    function formatSeconds(sec: number) {
        if (sec < 0) sec = 0;
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor(sec / 60 % 60);
        const seconds = sec % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }




    return (
        <form className={styles.formTimerContainer}>
            <div className={styles.formTimerTitulo}>
                <label htmlFor="titulo" className={styles.srOnly}>Titulo para o timer</label>
                <input
                    type="text"
                    id="titulo"
                    value={currentTimer.name}
                    onChange={nomeHandler}
                    disabled={timerStatus !== TimerState.ready}
                    placeholder="Título do Timer"
                    title="Titulo para o timer" />

            </div>
            <div className={styles.formTimerTime}>
                <label htmlFor="time" className={styles.srOnly}>Tempo do Timer/Crônometro</label>
                <input
                    type="time"
                    id="time"
                    step="1"
                    value={formatSeconds(currentTimer.targetTime)}
                    onChange={timeHandler}
                    disabled={timerStatus !== TimerState.ready}
                    title="Tempo do Timer/Crônometro" />
            </div>
            <div className={styles.formTimerAlarm}>

            <label htmlFor="alarm" className={styles.srOnly}>Som de Alarme</label>
            <select
                id="alarm"
                value={currentTimer.soundAlarm}
                onChange={alarmHandler}
                disabled={timerStatus !== TimerState.ready}>
                <option value="emergency_alarm_1">Emergency Alarm 1</option>
                <option value="emergency_alarm_2">Emergency Alarm 2</option>
                <option value="emergency_bell">Emergency Bell</option>
                <option value="emergency_nuclear">Emergency Nuclear</option>
                <option value="digital_beeps_1">Digital Beeps 1</option>
                <option value="digital_beeps_2">Digital Beeps 2</option>
                <option value="science_fiction_alarm">Science Fiction Alarm</option>
                <option value="harsh">Harsh</option>

            </select>
                    </div>

            <div className={styles.formTimerRegressiveCheck}>
                <input
                    id="regressive"
                    type="checkbox"
                    checked={currentTimer.regressive}
                    onChange={regressiveHandler}
                    disabled={timerStatus !== TimerState.ready} />
                <label htmlFor="regressive">Contagem Regressiva</label>
            </div>

            <div className={styles.formTimerButtonsContainer}>
                <button
                    type="button"
                    onClick={novoTimer}
                    disabled={timerStatus !== TimerState.ready}
                    className={styles.formTimerButtonNew}
                    title="Criar um novo timer"
                    >Novo</button>

                <button
                    type="button"
                    onClick={saveTimer}
                    disabled={timerStatus !== TimerState.ready}
                    className={styles.formTimerButtonSave}
                    title="Salvar o timer como favorito"
                    >Salvar</button>
            </div>
        </form>
    );
}