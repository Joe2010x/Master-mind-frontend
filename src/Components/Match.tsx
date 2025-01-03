import { useEffect, useMemo, useRef, useState } from 'react';
import {Ball, BallType, ColorList, ballCollections, ballGenerate} from './Ball';
import { Holder } from './Holder';
import "./CSS/Match.css";
import { defaultEntry, DefaultEntryType, Entry } from './Entry';
import { Player } from './Player';
import { logInfo } from '../App';
import { Header } from './Header';
import { PlayerList } from './PlayerList';
import { Winner } from './Winner';
import { defaultResultColor, fetchData, restart, statusDto, updateDTO } from './Services/GameApi';

type Matchtype = {
    logInfo : logInfo
}

const Match = ({logInfo} : Matchtype) => {
    const [dragData, setDragData] = useState<string>("");
    const [showGame, setShowGame] = useState<boolean>(false);
    const [entryList, setColorList] = useState<DefaultEntryType[]>([defaultEntry]);
    const [resultColorList, setResultList] = useState<string[][]>([]);
    const [status, setStatus] = useState<statusDto|null>(null); 
    const [isFrozen, setIsFrozen] = useState(false);
    const [winner, setWinner] = useState("");
    const [winnerSet, setWinnerSet] = useState([-1,-1,-1,-1]);
    const numOfValuesInGame = 4;
    const game = useMemo(()=>ballGenerate(numOfValuesInGame), [numOfValuesInGame]);
    let gameBalls = game.map(ele => ({backgroundColor: "gray", core:ele})) ;

    const setPlayerStatus = (value : string ) => {
        console.log("received player status from header");
    }

    console.log("entrylist count",entryList.length);
    if (entryList.length === 0 && status?.gameStatus === 0) {
        setColorList([defaultEntry]);
      }
    const restartGame = () => {
        console.log("restartGame from match");
        // reset in front end
        // reset colorlist
        setColorList([]);
        // reset entrylist
        setResultList([]);
        // request backend to reset in game
        restart(logInfo.roomNum, logInfo.name);
        // quit frozen
        setIsFrozen(false);
    }
  
    useEffect(() => {
        if (isFrozen) return;
        // Fetch data every 2 second
        const interval = setInterval(() => {
        fetchData(setStatus, setWinner, handleWinner, logInfo, entryList, setColorList, setWinnerSet);
        }, 2000);
  
        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [isFrozen]);
  
    
    const setEntryList = (value: DefaultEntryType[]) => {
        setColorList (value);
        let colorList = value.findLast(v => v.confirm)?.list.map(c => ColorList.findIndex(cl => cl === c));
        let roundIndex = value.filter(v => v.confirm).length;
        let request = {
            gameId : logInfo.roomNum,
            userName : logInfo.name,
            roundIndex : roundIndex,
            entrySet : colorList
        }
        if (colorList !== undefined) updateDTO(request, setResultList, setColorList);
    }

    const handleWinner = () => {
        setIsFrozen(true);
      };
    
      useEffect(() => {
        if (isFrozen) {
          document.body.classList.add('frozen');
        } else {
          document.body.classList.remove('frozen');
        }
      }, [isFrozen]);

    return (
        <div>
            <div className='Match'>
                <Header logInfo={logInfo} setStatus = {setPlayerStatus}/> 

                {showGame && <div className='BallCollection'>
                    {gameBalls.map((b,index) => 
                            <Ball key = {index} ball = {b} index = {index} setDragData = {setDragData} status = "Selectable"/> )}

                </div> }
                <div className='GameSet'>
                    <div className='BallCollection'>
                        {ballCollections.map((b,index) => 
                            <Ball key = {index} ball = {b} index = {index} setDragData = {setDragData} status = "Selectable"/> )}
                    </div>
                    <div className='EntryCollection'>
                        {entryList.map((entry, index) =>
                            <Entry key = {index} game = {game} entireList={entryList.map(e=>e.list)} list={entry.list} setEntry={setEntryList} setDragData ={setDragData} dragData = {dragData} confirm = {entry.confirm} index={index} resultColors ={resultColorList[index] ?? defaultResultColor}/>
                        )}
                    </div>
                    <div className='PlayerCollection'>
                        {status &&<PlayerList status = {status} logInfo={logInfo} />}
                    </div>
                </div>
            </div>
            {isFrozen && (
                <Winner winner = {winner} name = {logInfo.name} restart = {restartGame} winSet = {winnerSet} />
            )}

        </div>
    )
}

export default Match;

