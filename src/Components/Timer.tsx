// @flow
import { useEffect, useMemo } from "react";
import { TimerStatus } from "../App";
import "./Timer.css";

type Props = {
  timerStatus: TimerStatus;
  countDown: () => void;
};


export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export const Timer = ({ timerStatus, countDown }: Props) => {
  const worker = useMemo(()=>new Worker('baseTimer.js'), [])

  useEffect(() => {
    if (timerStatus.initialTime === 0 && timerStatus.status === "active") {
      alert("Focus Time Completed!!!");
      return;
    }
    // const interval = setInterval(
    //   () =>
    //     timerStatus.status === "active" &&
    //     timerStatus.initialTime > 0 &&
    //     countDown(),
    //   1000
    // );
    worker.postMessage('start')

    return () => {
      worker.postMessage('stop')
    };
  }, [timerStatus, countDown, worker]);

  worker.onmessage = (event: MessageEvent) =>{
    if(event.data === 'tick') {
      timerStatus.status === "active" && timerStatus.initialTime > 0 && countDown()
    }
  }

  return (
    <p className={`timer ${timerStatus.status === "paused" ? "paused" : ""}`}>
      {formatTime(timerStatus.initialTime)}
    </p>
  );
};
