import React from 'react'
import { formatTime } from './Timer'
import "./Timer.css";
interface TimeDisplayProp{
    status: "paused" | "active",
    time:number
}

export default function TimeDisplay({status, time}:TimeDisplayProp) {
  return (
    <p className={`timer ${status === "paused" ? "paused" : ""}`}>
      {formatTime(time)}
    </p>
  )
}
