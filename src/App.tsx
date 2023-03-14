import React, {
  useState,
  useEffect,
  useContext,
  KeyboardEvent,
  useRef,
} from "react";
import "./App.css";
import TaskBar from "./Components/TaskBar";
import { Timer } from "./Components/Timer";
import { appBasicContext } from "./Context/AppBasicContext";
import { TaskContext } from "./Context/TaskContext";

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

  const { currentTask, setCurrentTask } = useContext(TaskContext);
  const { setAppBasicStates} = useContext(appBasicContext)
  const [inputTime, setInputTime] = useState("");
  const appRef = useRef<HTMLDivElement>(null);

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

  
  const handleEditTask = () => {
    setCurrentTask(t => ({...t, isEditing:true}))
  };

  const handleKeyEvent = (e: KeyboardEvent<HTMLDivElement>) => {
    console.log("key event?")
    if (e.key === "Enter" && !currentTask.isEditing && timerStatus.initialTime) {
      setTimerStatus((t) => {
        return { ...t, status: t.status === "paused" ? "active" : "paused" };
      });
    }

    if(e.key === 'e' && !currentTask.isEditing){
      setCurrentTask(t => ({...t, isEditing: !t.isEditing}))
      setAppBasicStates(a => ({...a, shortCuts:{key_e_pressed:true} }))
    }
  };

  const countDown = () => {
    setTimerStatus((t) => {
      return { ...t, initialTime: t.initialTime - 1 };
    });
    if (currentTask.status === "onGoing") {
      setCurrentTask((t) => {
        return { ...t, timeSpent: t.timeSpent + 1 };
      });
    }
  };

  useEffect(() => {
    if (timerStatus.initialTime === 0) {
      setTimerStatus((t) => {
        return { status: "paused", initialTime: timeToSeconds(inputTime) || 0 };
      });
    }
  }, [timerStatus.initialTime, inputTime]);

  useEffect(() => {
    if (appRef.current && !currentTask.isEditing) {
      appRef.current.focus();
    }
  }, [currentTask]);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.focus();
    }
  }, []);

  return (
    <div
      className="App"
      onKeyDown={handleKeyEvent}
      tabIndex={0}
      ref={appRef}
    >
      <input
        value={inputTime}
        className="timer-input"
        placeholder="type your focus time"
        onChange={handleInputTime}
      ></input>
      <Timer timerStatus={timerStatus} countDown={countDown}></Timer>
      <TaskBar handleEditTask={handleEditTask}></TaskBar>
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
