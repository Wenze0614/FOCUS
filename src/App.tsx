import React, { useState, useEffect } from "react";
import "./App.css";
import { Timer } from "./Components/Timer";

export interface TimerStatus {
  status: "active" | "paused";
  initialTime: number;
}

function timeToSeconds(time: string) {
  let seconds = 0;
  const regex = /^(\d+(\.\d+)?)(h|m|s)$/;

  if (regex.test(time)) {
    const matches = time.match(regex);
    if (matches) {
      const value = parseFloat(matches[1]);
      const unit = matches[3];

      switch (unit) {
        case "h":
          seconds = Math.round(value * 60 * 60);
          break;
        case "m":
          seconds = Math.round(value * 60);
          break;
        case "s":
          seconds = Math.round(value);
          break;
        default:
          break;
      }
    }

    return seconds;
  }
}

function App() {
  const [timerStatus, setTimerStatus] = useState<TimerStatus>({
    status: "paused",
    initialTime: 0,
  });
  const [inputTime, setInputTime] = useState("");

  const handleInputTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seconds = timeToSeconds(e.target.value);

    if (timerStatus.status === "active") {
      setTimerStatus((t) => {
        return { ...t, status: "paused" };
      });
    }

    if (seconds || timerStatus.status === "paused") {
      setInputTime(e.target.value);
      setTimerStatus((t) => {
        return { ...t, initialTime: seconds || 0 };
      });
    }
  };

  const countDown = () => {
    setTimerStatus((t) => {
      return { ...t, initialTime: t.initialTime - 1 };
    });
  };

  useEffect(() => {
    if (timerStatus.initialTime === 0) {
      setTimerStatus((t) => {
        return { status: "paused", initialTime: timeToSeconds(inputTime) || 0 };
      });
    }
  }, [timerStatus.initialTime, inputTime]);

  return (
    <div className="App">
      <input
        value={inputTime}
        className="timer-input"
        placeholder="type your focus time"
        onChange={handleInputTime}
      ></input>
      <Timer timerStatus={timerStatus} countDown={countDown}></Timer>
      <div className="timer-controls">
        <button
          className={`timerButton ${
            timerStatus.status === "paused" ? "active" : ""
          }`}
          onClick={() =>
            setTimerStatus((t) => {
              return { ...t, status: "active" };
            })
          }
        >
          Start
        </button>
        <button
          className={`timerButton ${
            timerStatus.status === "active" ? "active" : ""
          }`}
          onClick={() =>
            setTimerStatus((t) => {
              return { ...t, status: "paused" };
            })
          }
        >
          Pause
        </button>
      </div>
    </div>
  );
}

export default App;
