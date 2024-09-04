// HOOKS
import { useReducer, createContext, useContext } from "react";

// REDUCER FUNCTION 
import tasksReducer from "../Reducers/tasksReducer";

let TasksContext = createContext([]);

export let TasksProvider = ({ children }) => {
    let [tasks, tasksDispatch] = useReducer(tasksReducer, []);
    return (
        <TasksContext.Provider value={{ tasks: tasks, dispatch: tasksDispatch }}>
            {children}
        </TasksContext.Provider >
    );
}

export let useTasksContext = () => {
    return useContext(TasksContext);
}