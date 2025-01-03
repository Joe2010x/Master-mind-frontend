import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Match from './Components/Match';
import { Login } from './Components/Login';
import { WinnerSet } from './Components/Winner';

export interface logInfo {
  name : string,
  logo : string,
  roomNum : string,
}

function App() {
  const [status, setStatus] = useState<string>("login");
  const [logInfo, setLogInfo] = useState<null|logInfo>(null);
  const setLogin = (props : logInfo) => {
    // console.log("set log information", props);
    setLogInfo(props);
    setStatus("match");
  }
  return (
    <div className="App">
      {/* <WinnerSet winSet = {[1,2,3,4]} size = {50}/> */}
      {status === "login" && <Login setLogin = {setLogin}/>}
      {status === "match" && <Match logInfo = {logInfo!}/>}
    </div>
  );
}

export default App;
