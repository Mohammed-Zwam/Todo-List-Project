// HOOKS 
import { createContext, useContext, useState } from "react";

// MUI COMPONENTS
import Alert from '@mui/material/Alert';

export const AlertContext = createContext({ show: false, message: "", setAlertInfo: null })

export const useAlertContext = () => {
    return useContext(AlertContext);
}



export const AlertProvider = ({ children }) => {
    let [alertInfo, setAlertInfo] = useState({ show: false, message: "" });
    function controlTheAlert(mess) {
        setAlertInfo({ show: true, message: mess });
        setTimeout(() => {
            setAlertInfo({ show: false, message: mess });
        }, 1500)
    }
    return (
        <AlertContext.Provider value={{ showMessage: controlTheAlert }}>
            {/* ============ Alert ============ */}
            <Alert variant="filled"
                style={{
                    position: "absolute",
                    bottom: "20px",
                    left: "20px",
                    transition: "0.3s",
                    opacity: alertInfo.show ? "1" : "0",
                }}
            >
                <div style={{ fontFamily: "warning-font-Cairo" }}>{alertInfo.message}</div>
            </Alert>
            {/* ============ Alert ============ */}
            {children}
        </AlertContext.Provider>
    );
}


