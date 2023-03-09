// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import { TimerStatus } from "../App";
import "./Timer.css";

type Props = {
  timerStatus: TimerStatus;
  countDown: () => void;
};

function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const paddedHours = hours.toString().padStart(2, "0");
  const paddedMinutes = minutes.toString().padStart(2, "0");
  const paddedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
}

export const Timer = ({ timerStatus, countDown }: Props) => {
  useEffect(() => {
    if(timerStatus.initialTime===0 && timerStatus.status==="active"){
      alert("Focus Time Completed!!!");
      return;
    }
    const interval = setInterval(
      () => timerStatus.status === "active" && timerStatus.initialTime > 0 && countDown(),
      1000
    );

    return () => {
      clearInterval(interval);
    };
  }, [timerStatus, countDown]);

  return <p className="timer">{formatTime(timerStatus.initialTime)}</p>;
};