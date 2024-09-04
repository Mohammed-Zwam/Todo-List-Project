// MUI COMPONENTS
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// HOOKS
import { useState, useEffect } from 'react';

// CONTEXTS | CUSTOM HOOKS
import { useAlertContext } from "../Contexts/AlertContext";
import { useTasksContext } from "../Contexts/TasksContext";
export default function EditPopup({ task, setIsOpen }) {

    let { dispatch } = useTasksContext();
    let [taskTitleOfEdit, setTaskTitleOfEdit] = useState("");
    let [taskDetailsOfEdit, setTaskDetailsOfEdit] = useState("");
    let alert = useAlertContext();

    useEffect(() => {
        setTaskTitleOfEdit(task.title || "");
        setTaskDetailsOfEdit(task.details || "");
    }, [task.title, task.details]);

    return (
        // Container
        <div
            className="popup-container"
            onClick={(e) => {
                if (e.target.classList.contains("popup-container"))
                    setIsOpen(false);
            }}
        >
            {/*  Edit Card  */}
            <div
                style={{
                    padding: "10px 10px 5px",
                    background: "white",
                    boxShadow: "0px 0px 10px 2px gray",
                    width: "450px",
                    borderRadius: "4px",
                    border: "1.5px solid black",
                }}
                className='mb-ver-edit'
            >
                <h2 style={{
                    fontSize: "20px",
                }}>Edit The Task</h2>
                <TextField
                    id="standard-basic"
                    label="Task Title"
                    variant="standard"
                    style={{
                        display: "block",
                    }}
                    sx={{
                        '& .MuiFormLabel-root': {
                            fontSize: '17px',
                        },
                    }}
                    size='small'
                    fullWidth
                    inputProps={{ style: { fontSize: 15, fontFamily: "warning-font-Cairo", fontWeight: "600" } }}
                    value={taskTitleOfEdit}
                    onChange={(e) => {
                        setTaskTitleOfEdit(e.target.value)
                    }}
                />
                <TextField
                    id="standard-basic"
                    label="Task Details"
                    variant="standard"
                    style={{
                        display: "block",
                        margin: "10px 0px",
                    }}
                    sx={{
                        '& .MuiFormLabel-root': {
                            fontSize: '17px',
                        },
                    }}
                    size='small'
                    fullWidth
                    inputProps={{ style: { fontSize: 15, fontFamily: "warning-font-Cairo", fontWeight: "600" } }}
                    value={taskDetailsOfEdit}
                    onChange={(e) => {
                        setTaskDetailsOfEdit(e.target.value)
                    }}
                />
                <div style={{
                    marginTop: "20px",
                    textAlign: "end"
                }}>
                    <Button variant="text"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => {
                            setIsOpen(false)
                        }}
                    >cancel</Button>
                    <Button
                        color='primary'
                        variant="text"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => {
                            dispatch({ type: "editTask", payload: { task: task, newTitle: taskTitleOfEdit, newDet: taskDetailsOfEdit } });
                            setIsOpen(false)
                            alert.showMessage("The task was edited successfully");
                        }}
                    >save</Button>
                </div>
            </div>
        </div>
    );
}