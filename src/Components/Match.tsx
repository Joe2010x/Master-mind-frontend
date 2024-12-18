import { useEffect, useMemo, useState } from 'react';
import {Ball, BallType, ballCollections, ballGenerate} from './Ball';
import { Holder } from './Holder';
import "./CSS/Match.css";
import { defaultEntry, DefaultEntryType, Entry } from './Entry';

const Match = () => {
    const [dragData, setDragData] = useState<string>("");
    const [showGame, setShowGame] = useState<boolean>(false);
    const [entryList, setEntryList] = useState<DefaultEntryType[]>([defaultEntry]);
    const numOfValuesInGame = 4;
    const game = useMemo(()=>ballGenerate(numOfValuesInGame), [numOfValuesInGame]);
    let gameBalls = game.map(ele => ({backgroundColor: "gray", core:ele})) ;
    return (
        <div>
            <div onClick={()=>setShowGame(!showGame)}>This is Match</div>
            {showGame && <div className='BallCollection'>
                {gameBalls.map((b,index) => 
                        <Ball key = {index} ball = {b} index = {index} setDragData = {setDragData} status = "Selectable"/> )}

            </div> }
            <div className='BallCollection'>
                {ballCollections.map((b,index) => 
                    <Ball key = {index} ball = {b} index = {index} setDragData = {setDragData} status = "Selectable"/> )}
            </div>
            <div className='EntryCollection'>
                {entryList.map((entry, index) =>
                    <Entry key = {index} game = {game} entireList={entryList.map(e=>e.list)} list={entry.list} setEntry={setEntryList} setDragData ={setDragData} dragData = {dragData} confirm = {entry.confirm} index={index}/>
                )}
            </div>
        </div>
    )
}

export default Match;