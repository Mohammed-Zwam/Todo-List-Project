// STYLING
import './App.css';

// COMPONENTS
import TodoList from './Todo-List/TodoList';

// OTHERS Packages 
import { useState, useRef, useEffect } from "react";
import { createTheme } from '@mui/material';
import { red } from "@mui/material/colors";
import { ThemeProvider } from '@emotion/react';

// PROVIDERS
import { AlertProvider } from './Contexts/AlertContext';
import { TasksProvider } from './Contexts/TasksContext';

// VIDEOS
import loadingIcon from './Videos/ToDoList.webm'

let theme = createTheme({
    palette: {
        primary: {
            main: red[900],
        },
    },
    typography: {
        fontFamily: "warning-font-Cairo"
    }
});

function App() {
    let [loading, setLoading] = useState(true);
    let loadingRef = useRef(null);
    let videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener("loadedmetadata", () => {
                setTimeout(() => {
                    loadingRef.current.style.opacity = "0";
                }, (videoRef.current.duration * 1000) - 500)
                setTimeout(() => {
                    setLoading(false);
                }, (videoRef.current.duration * 1000))
            })
        }
    }, [])



    return (
        <ThemeProvider theme={theme}>
            {loading && <div ref={loadingRef} className="loading">
                <video ref={videoRef} style={{ transform: "scale(0.65)" }} className='mb-ver-vid' src={loadingIcon} autoPlay muted />
            </div>}
            <TasksProvider>
                <AlertProvider>
                    <TodoList />
                </AlertProvider>
            </TasksProvider>

        </ThemeProvider>
    );
}

export default App;
