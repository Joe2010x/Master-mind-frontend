import { useState } from "react"
import "./CSS/Login.css"
import { logInfo } from "../App";
// import {createGame }
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { createGame, joinGame } from "./Services/GameApi";

interface loginPropstype {
    setLogin : (value : logInfo) => void
}

export const Login = ({setLogin} : loginPropstype) => {
    const [name, setValue] = useState<string> ("");
    const [room, setRoom] = useState<string> ("");
    const [status, setStatus] = useState<string> ("join");
    const [nameRule, setNameRule] = useState(false);
    const [roomRule, setRoomRule] = useState(false);
    const [message, setMessage] = useState('');


    const newGame = (gameId: string, userName : string) =>
    {
        setLogin({
            name : userName,
            logo : "",
            roomNum : gameId,
        })
    }
  
    const handleJoin = () => {
        console.log("Join Game");
        setStatus("join");
        if (status === "join") joinGame(name, room, setMessage, newGame);
    }
    
    const handleCreateRoom = () => {
        console.log("create a room");
        createGame(name, setMessage, newGame);

    }
    function showNameRule(): void {
        setNameRule(!nameRule);
    }
    function showRoomRule(): void {
        setRoomRule(!roomRule);
    }

    return (
        <div>
            <div className="Login">
                <div className="LoginField">
                    <span>Name</span>
                    <input value={name} onChange={(e) => setValue(e.target.value)} />
                    <AiOutlineExclamationCircle onClick={showNameRule}/>
                </div>
                {nameRule && <div style={{color : "black"}}>Name contains 1-10 charactors</div>}
                {status === "join" && 
                <div className="LoginField">
                    <span>Room </span>
                    <input value={room} onChange={(e) => setRoom(e.target.value)} onClick={handleJoin}/>
                    <AiOutlineExclamationCircle onClick = {showRoomRule} />
                </div>}
                {roomRule && <div> Correct room has 5 charactors </div>}
                {status !== "join" && <button  onClick= {handleCreateRoom}>Create a room</button>}
                <button onClick={handleJoin}>Enter Room</button>
            </div>
            <div className="ErrorMessage">
                <p>{message}</p>
            </div>
        </div>
    )
}