import { KeyboardEvent, useRef, useEffect, useContext } from "react";
import "./TaskBar.css";
import { CompletedTasksContext, defaultTask, TaskContext } from "../Context/TaskContext";
import { formatTime } from "./Timer";
import { appBasicContext } from "../Context/AppBasicContext";

interface Props {
  handleEditTask: () => void;
}

export default function TaskBar({ handleEditTask }: Props) {
  //   const [currentTask, setCurrentTask] = useState<TaskOnFocus>(defaultTask);
  const { currentTask, setCurrentTask } = useContext(TaskContext);
  const { completedTasks, setCompletedTasks} = useContext(CompletedTasksContext)
  const { appBasicStates, setAppBasicStates } = useContext(appBasicContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (currentTask.name) {
        setCurrentTask((t) => {
          return { ...t, isEditing: false, status: "onGoing" };
        });
      }
      if (inputRef.current) {
        inputRef.current.blur();
        setCurrentTask((t) => {
          return { ...t, isEditing: false };
        });
      }
    }
  };

  const handleTaskComplete = () => {
    setCompletedTasks(tasks => ({...tasks, currentTask}))
    setCurrentTask(defaultTask)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (appBasicStates.shortCuts.key_e_pressed) {
      setAppBasicStates((a) => ({ ...a, shortCuts: { key_e_pressed: false } }));
      return;
    }
    setCurrentTask((t) => {
      return { ...t, name: e.target.value };
    });
  };

  useEffect(() => {
    if (inputRef.current && currentTask.isEditing) {
      console.log("focusing to input");
      inputRef.current.focus();
    }
  }, [inputRef, currentTask.isEditing]);

  return (
    <div className="task-bar">
      {currentTask.isEditing ? (
        <input
          className="add-task-input"
          placeholder=""
          onKeyDown={handleAddTask}
          value={currentTask.name}
          onChange={handleInput}
          ref={inputRef}
        ></input>
      ) : currentTask.status === "onGoing" ? (
        <div className="task-area">
          <p className="task-attribute">{currentTask.name}</p>
          <p className="task-attribute">{formatTime(currentTask.timeSpent)}</p>
          <button className="task-complete-button" onClick={handleTaskComplete}>&#x2713;</button>
          <button
            className="task-edit-button material-symbols-outlined"
            onClick={handleEditTask}
          >
            edit
          </button>
        </div>
      ) : (
        <button
          className="add-task-button"
          onClick={() => {
            setCurrentTask((t) => {
              return { ...t, isEditing: true };
            });
          }}
        >
          +
        </button>
      )}
    </div>
  );
}
