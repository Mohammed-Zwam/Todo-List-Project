// MUI Components
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { IconButton } from "@mui/material";


// CONTEXTS | CUSTOM HOOKS
import { useAlertContext } from "../Contexts/AlertContext";
import { useTasksContext } from "../Contexts/TasksContext";

export default function Todo({ task, operations }) {

    // Tasks List State Context
    let { dispatch } = useTasksContext();
    let alert = useAlertContext();


    return (
        <li className="task" key={task.id}>
            <span>
                <h2 style={{ fontSize: "22px", textDecoration: task.completed ? "line-through" : "none", fontFamily: '' }} className='mb-ver-todo-title'>{task.title}</h2>
                <p style={{ fontSize: "16px", textDecoration: task.completed ? "line-through" : "none" }} className='mb-ver-todo-det'>{task.details}</p>
            </span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <IconButton
                    style={{
                        color: task.completed ? "white" : "green",
                        borderColor: "green",
                        boxShadow: "0px 0px 5px 2px green",
                        background: task.completed ? "green" : "white",
                        border: " 1.5px solid green",
                    }}
                    className={task.completed ? "" : "icon-effect"}
                    onClick={() => {
                        dispatch({ type: 'editCheckTask', payload: { taskId: task.id } });
                        alert.showMessage("The task was edited successfully");
                    }}
                >
                    <CheckOutlinedIcon className='mb-ver-icon' />
                </IconButton>
                <IconButton
                    style={{
                        color: "blue",
                        borderColor: "blue",
                        boxShadow: "0px 0px 5px 2px blue",
                        background: "white",
                        border: " 1.5px solid blue",
                    }}
                    className="icon-effect"
                    onClick={() => {
                        operations.setTask(task)
                        operations.setEdit(true)
                    }}
                >
                    <CreateOutlinedIcon className='mb-ver-icon' />
                </IconButton>

                <IconButton
                    style={{
                        color: "red",
                        borderColor: "red",
                        boxShadow: "0px 0px 5px 2px red",
                        background: "white",
                        border: " 1.5px solid red",
                    }}
                    className="icon-effect"
                    onClick={() => {
                        operations.setTask(task)
                        operations.setDelete(true)
                    }}
                >
                    <DeleteOutlineOutlinedIcon className='mb-ver-icon'/>
                </IconButton>
            </div>
        </li >
    );
}

