import { useState } from "react"
import { logInfo } from "../App"
import { Login } from "./Login"
import "./CSS/Header.css"

type HeaderPropsType = {
    logInfo : logInfo,
    setStatus : (value : string) => void
}

export const Header = ( {logInfo, setStatus}: HeaderPropsType) => {
    const [status, setHeaderStatus] = useState("Ready");
    const handleStatus = () => {  
        setHeaderStatus("In Game");
        setStatus("Ready");            
    }
    return (
        <div className="Header">
            <div className="Header-banner">Master Mind</div>
        </div>
    )
}