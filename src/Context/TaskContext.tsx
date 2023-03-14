import {createContext, useState} from 'react'
import { TaskOnFocus } from '../Components/Types'

const defaultTask: TaskOnFocus = {
    name: "",
    timeSpent: 0,
    status: null,
    isEditing: false
  };


interface TaskContextType {
  currentTask: TaskOnFocus,
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskOnFocus>>
}
export const TaskContext = createContext<TaskContextType>({currentTask: defaultTask, setCurrentTask: ()=> {}});



export default function TaskContextProvider(props: React.PropsWithChildren<{}>) {
  const [currentTask, setCurrentTask] = useState<TaskOnFocus>(defaultTask)

  return <TaskContext.Provider value={{currentTask, setCurrentTask}} {...props}/>
}
