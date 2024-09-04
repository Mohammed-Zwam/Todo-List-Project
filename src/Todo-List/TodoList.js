// STYLING
import "./style.css"


// MUI COMPONENTS
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';


// COMPONENTS
import EditPopup from "./EditPopup";
import DeletePopup from "./DeletePopup";
import Todo from "./Todo";


// HOOKS 
import { useState, useLayoutEffect, useMemo } from "react";



// CONTEXTS | CUSTOM HOOKS
import { useAlertContext } from "../Contexts/AlertContext";
import { useTasksContext } from "../Contexts/TasksContext";



export default function TodoList() {

    // Tasks Context (Reducer)
    let { tasks, dispatch } = useTasksContext();

    // Filter State
    let [tasksFilter, setTasksFilter] = useState('all');

    // Task Name State (Add Task)
    let [taskName, setTaskName] = useState("")

    // Popup States (Control the appearance)
    let [isOpenEditPopup, setIsOpenEditPopup] = useState(false)
    let [isOpenDeletePopup, setIsOpenDeletePopup] = useState(false)


    // Task For Operations & Context for updating
    let [taskSelected, setTaskSelected] = useState({})


    // Alert Context
    let alert = useAlertContext();



    useLayoutEffect(() => {
        dispatch({ type: 'setStorageTasks' })
    }, [dispatch])

    let tasksAfterFilteration = tasks;

    tasksAfterFilteration = useMemo(() => {
        return tasks.filter((task) => {
            return ((tasksFilter === "completed" && task.completed) ||
                (tasksFilter === "incompleted" && !task.completed) ||
                tasksFilter === "all");
        })
    }, [tasks, tasksFilter]);

    let tasksElementUI = [];
    tasksElementUI = tasksAfterFilteration.map((task) => {
        return <Todo key={task.id} task={task} operations={{ setEdit: setIsOpenEditPopup, setDelete: setIsOpenDeletePopup, setTask: setTaskSelected }} />
    });




    let toggleButtonStyle = {
        fontSize: "15px",
        fontWeight: "bold",
        textTransform: "capitalize",
        padding: "6px 8px",
    };



    return (
        // Container
        <div className="todolist-container">

            {/*****************************************************************************************************************************/}
            {/* ============ Todo-List Card ============*/}
            <div
                style={{
                    background: "white",
                    borderRadius: "3.8px",
                    boxShadow: "0px 0px 5px 1.5px rgb(0, 0, 200)",
                    width: "550px",
                    minHeight: "fit-content",
                    maxHeight: "80vh",
                    margin: "10px"
                }}
            >


                {/*****************************************************************************************************************************/}
                {/* ============ Title ============ */}
                <h2
                    style={{
                        fontFamily: "second-font-Playwrite-NG-Modern",
                        fontWeight: "bold",
                        textAlign: "center",
                        background: "darkblue",
                        padding: "8px",
                        color: "white",
                        borderRadius: "3px 3px 0px 0px",
                        marginBottom: "10px",
                        fontSize: "25px"
                    }}
                    className="mb-ver-title"
                >Todo list</h2>
                {/* ============ Title ============ */}
                {/*****************************************************************************************************************************/}



                {/*****************************************************************************************************************************/}
                {/* ============ Tasks Container ============ */}
                <div style={{ padding: "8px" }}>
                    {/* ============  Filter Tasks  ============ */}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                    }}>
                        <ToggleButtonGroup
                            color="primary"
                            value={tasksFilter}
                            exclusive
                            onChange={(newtasksFilter) => {
                                setTasksFilter(newtasksFilter.target.value);
                            }}
                        >
                            <ToggleButton value="all" style={toggleButtonStyle} className="mb-ver-filter">all</ToggleButton>
                            <ToggleButton value="completed" style={toggleButtonStyle} className="mb-ver-filter">Completed</ToggleButton>
                            <ToggleButton value="incompleted" style={toggleButtonStyle} className="mb-ver-filter">incompleted</ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                    {/* ============  Filter Tasks  ============ */}
                    {/*****************************************************************************************************************************/}
                    {/* ============ Tasks ============ */}
                    <ul style={{ overflow: "auto", maxHeight: "51vh", padding: "10px 0", margin: "20px 0" }}>
                        {tasksElementUI.length === 0 ?
                            <div
                                style={{ color: "darkred", fontSize: "25px", margin: "10px 15px", fontWeight: "bold", textAlign: "center" }}
                            >Empty !!</div> :
                            tasksElementUI}
                    </ul>
                    {/* ============ Tasks ============ */}
                    {/*****************************************************************************************************************************/}
                    {/* ============ Add Task ============ */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <TextField id="outlined-basic" label="Task Title" variant="outlined" size="small" fullWidth value={taskName}
                            onChange={(e) => {
                                setTaskName(e.target.value)
                            }}
                            className="mb-ver-txt-inp"
                        />
                        <Button
                            size="large"
                            variant="contained"
                            style={{ width: "120px", fontWeight: "bold", marginLeft: "8px" }}
                            className="mb-ver-btn"
                            onClick={() => {
                                dispatch({ type: 'addTask', payload: { title: taskName } });
                                alert.showMessage("The task was added successfully");
                                setTaskName("");
                            }}
                            disabled={/^\s*$/.test(taskName)}
                        >
                            Add
                        </Button>
                    </div>
                    {/* ============ Add Task ============ */}
                </div>
                {/* ============ Tasks Container ============ */}
            </div>
            {/* ============ Todo-List Card ============*/}
            {/*****************************************************************************************************************************/}




            {/* Popups */}
            <div>
                {/*****************************************************************************************************************************/}
                {/* ============ Edit Popup ============ */}
                <div style={{
                    display: isOpenEditPopup ? "block" : "none",
                }}>
                    <EditPopup task={taskSelected} setIsOpen={setIsOpenEditPopup} dispatch={dispatch} />
                </div>
                {/* ============ Edit Popup ============ */}
                {/*****************************************************************************************************************************/}
                {/* ============ Delete Popup ============ */}
                <div style={{
                    display: isOpenDeletePopup ? "block" : "none",
                }}>
                    <DeletePopup taskId={taskSelected.id} setIsOpen={setIsOpenDeletePopup} dispatch={dispatch} />
                </div>
                {/* ============ Delete Popup ============ */}
                {/*****************************************************************************************************************************/}
            </div>
        </div>
    );
}
