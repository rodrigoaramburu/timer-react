import React, { createContext, ReactNode, useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import useInterval from "../hooks/useInterval";


interface TimerContextData {
    currentTimer: Timer,
    time: number,
    setCurrentTimer: Function;
    timerStatus: TimerState;
    listTimers: Timer[],
    startTimer: () => void;
    pauseTimer: () => void;
    unpauseTimer: () => void;
    stopAlarm: () => void;
    reset: () => void;
    novoTimer: () => void;
    saveTimer: () => void;
    removeTimer: (uuid: string) => void;
}
export const TimerContext = createContext({} as TimerContextData);

interface TimerProviderProps {
    children: ReactNode;
}

export enum TimerState {
    ready = 'ready',
    running = 'running',
    paused = 'paused',
    playing = 'playing_alarm',
    stop = 'stop'
}

export interface Timer {
    uuid: string;
    name: string;
    targetTime: number;
    soundAlarm: string;
    regressive: boolean;
}

export default function TimerProvider({ children }: TimerProviderProps) {

    const [currentTimer, setCurrentTimer] = useState<Timer>({
        uuid: uuid(),
        name: "",
        targetTime: 60,
        soundAlarm: 'emergency_nuclear',
        regressive: true
    });
    const [timerStatus, setTimerStatus] = useState<TimerState>(TimerState.ready);
    const [time, setTime] = useState<number>(0);
    const [audio, setAudio] = useState({} as HTMLAudioElement);

    const [listTimers, setListTimers] = useState<Timer[]>([]);

    const [lastTime, setLastTime] = useState(0);

    useEffect(() => {
        Notification.requestPermission();
        setListTimers(getAllTimers());
    }, []);

    useInterval(() => {
        process()
    }, 500);

    function process() {
            let newTime = time;
            if( lastTime !== 0){
                const nowTime = new Date().getTime();
                newTime = time + (nowTime - lastTime) / 1000;
                setLastTime(nowTime);
            }
            
            if (timerStatus == TimerState.running) {
                setTime(newTime);
            }
            if (newTime >= currentTimer.targetTime && timerStatus === TimerState.running) {
                setTimerStatus(TimerState.playing);
                setLastTime(0);
                audio.play();

                if (Notification.permission === 'granted') {
                    new Notification('Timer finalizado', {
                        body: `O Timer  "${currentTimer.name != '' ? currentTimer.name : 'Sem Titulo'}" terminou!`,
                        silent: true,
                        icon:'/icon-white.png'
                    });
                }
            }
    }

    function startTimer(): void {
        const newAudio = new Audio(`/alarms/${currentTimer.soundAlarm}.mp3`);
        newAudio.addEventListener('ended', () => {
            setTimerStatus(TimerState.stop);
        });
        setAudio(newAudio);
        setTimerStatus(TimerState.running);
        setLastTime( new Date().getTime() );
    }

    function pauseTimer(): void {
        setTimerStatus(TimerState.paused);
        setLastTime(0);
    }

    function unpauseTimer(): void {
        setTimerStatus(TimerState.running);
        setLastTime( new Date().getTime() );
    }

    function stopAlarm(): void {
        setTimerStatus(TimerState.stop);
        audio.pause();
        audio.currentTime = 0;
    }

    function reset(): void {
        setTimerStatus(TimerState.ready);
        setTime(0);
        setLastTime(0);
    }

    function novoTimer(): void {
        setCurrentTimer({
            uuid: uuid(),
            name: "",
            targetTime: 60,
            soundAlarm: 'emergency_nuclear',
            regressive: true
        });
    }



    function saveTimer(): void {
        if (currentTimer.name === '') {
            setCurrentTimer({
                ...currentTimer,
                name: 'Sem Título'
            });
        }
        let timeDataListStore = localStorage.getItem('timer-list');

        let timeDataList: Timer[] = timeDataListStore === null ? [] : JSON.parse(timeDataListStore);

        let pos = timeDataList.map(function (e: Timer) { return e.uuid; }).indexOf(currentTimer.uuid);
        if (pos === -1) {
            timeDataList.push(currentTimer);
        } else {
            timeDataList[pos].name = currentTimer.name;
            timeDataList[pos].targetTime = currentTimer.targetTime;
            timeDataList[pos].soundAlarm = currentTimer.soundAlarm;
        }

        localStorage.setItem('timer-list', JSON.stringify(timeDataList));
        setListTimers(timeDataList);
    }


    function getAllTimers(): Timer[] {
        let timerDataListStore = localStorage.getItem('timer-list');
        let timerDataList: Timer[] = timerDataListStore === null ? [] : JSON.parse(timerDataListStore);
        return timerDataList;
    }

    function removeTimer(uuid: string): void {
        let timerDataList = getAllTimers();
        let index = timerDataList.map(function (e: Timer) { return e.uuid; }).indexOf(uuid);
        timerDataList.splice(index, 1);
        localStorage.setItem('timer-list', JSON.stringify(timerDataList));
        setListTimers(timerDataList);
    }




    return (
        <TimerContext.Provider value={{
            currentTimer,
            time,
            timerStatus,
            listTimers,
            setCurrentTimer,
            startTimer,
            pauseTimer,
            unpauseTimer,
            stopAlarm,
            reset,
            novoTimer,
            saveTimer,
            removeTimer
        }}>
            {children}
        </TimerContext.Provider>
    );
}