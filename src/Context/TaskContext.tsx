import { createContext, useState } from "react";
import { TaskOnFocus } from "../Components/Types";

export const defaultTask: TaskOnFocus = {
  name: "",
  timeSpent: 0,
  status: null,
  isEditing: false,
};

interface TaskContextType {
  currentTask: TaskOnFocus;
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskOnFocus>>;
}

interface CompletedTasksContextType {
  completedTasks: TaskOnFocus[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<TaskOnFocus[]>>;
}
export const TaskContext = createContext<TaskContextType>({
  currentTask: defaultTask,
  setCurrentTask: () => {},
});

export const CompletedTasksContext = createContext<CompletedTasksContextType>({
  completedTasks: [],
  setCompletedTasks: () => {},
});

export default function TaskContextProvider(
  props: React.PropsWithChildren<{}>
) {
  const [currentTask, setCurrentTask] = useState<TaskOnFocus>(defaultTask);
  const [completedTasks, setCompletedTasks] = useState<TaskOnFocus[]>([]);

  return (
    <CompletedTasksContext.Provider
      value={{ completedTasks, setCompletedTasks }}
    >
      <TaskContext.Provider
        value={{ currentTask, setCurrentTask }}
        {...props}
      />
    </CompletedTasksContext.Provider>
  );
}
