// MUI COMPONENTS
import Button from '@mui/material/Button';

// CONTEXTS | CUSTOM HOOKS
import { useAlertContext } from "../Contexts/AlertContext";
import { useTasksContext } from "../Contexts/TasksContext";

export default function DeletePopup({ taskId, setIsOpen }) {

    let { dispatch } = useTasksContext();
    let alert = useAlertContext();

    return (
        // Container
        <div
            className="popup-container"
            onClick={(e) => {
                if (e.target.classList.contains("popup-container"))
                    setIsOpen(false);
            }}
        >
            {/*  Delete Card  */}
            <div
                style={{
                    padding: "10px",
                    background: "white",
                    boxShadow: "0px 0px 10px 2px gray",
                    width: "450px",
                    borderRadius: "4px",
                    border: "1.5px solid black",
                    margin: '30px'
                }}
                className='mb-ver-delelte'
            >
                <h2 style={{
                    fontSize: "20px",
                    fontFamily: "warning-font-Cairo",
                }}>
                    Are you sure you want to delete the task?</h2>
                <p
                    style={{
                        fontFamily: "warning-font-Cairo",
                        color: "#777",
                        textTransform: "none"
                    }}
                >You cannot undo the deletion if you press the (delete) button</p>
                <div style={{
                    textAlign: "end",
                    marginTop: "7px"
                }}>
                    <Button variant="text"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => {
                            setIsOpen(false)
                        }}
                    >
                        cancel
                    </Button>
                    <Button
                        variant="text"
                        style={{ textTransform: "capitalize" }}
                        onClick={() => {
                            dispatch({ type: 'deleteTask', payload: { taskId: taskId } })
                            setIsOpen(false)
                            alert.showMessage("The task was deleted successfully");
                        }}
                    >Delete</Button>
                </div>
            </div>
        </div>
    );
}