// ID GENERATOR
import { v4 as uuidv4 } from "uuid";

export default function tasksReducer(currentTasks, action) {

    switch (action.type) {
        case "addTask": {
            let newTasks = [
                ...(currentTasks || []),
                {
                    id: uuidv4(),
                    title: action.payload.title,
                    details: "",
                    completed: false
                }
            ];
            localStorage.setItem("tasks", JSON.stringify(newTasks))
            return newTasks;
        }
        case "deleteTask": {
            let newTasks = currentTasks.filter((task) => {
                return task.id !== action.payload.taskId;
            })
            localStorage.setItem("tasks", JSON.stringify(newTasks))
            return newTasks;
        }
        case "editTask": {
            let newTasksList = currentTasks.map((task) => {
                if (action.payload.task.id === task.id) {
                    return { ...task, title: action.payload.newTitle, details: action.payload.newDet };
                }
                return task;
            })
            localStorage.setItem("tasks", JSON.stringify(newTasksList))
            return newTasksList;
        }

        case "setStorageTasks": {
            return JSON.parse(localStorage.getItem("tasks")) || [];
        }

        case "editCheckTask": {
            let newTasks = currentTasks.map((task) => {
                if (task.id === action.payload.taskId) {
                    return { ...task, completed: !task.completed }
                }
                return task;
            })
            localStorage.setItem("tasks", JSON.stringify(newTasks))
            return newTasks;
        }
        default: {
            throw Error("Unknown Action " + action.type)
        }
    }
}