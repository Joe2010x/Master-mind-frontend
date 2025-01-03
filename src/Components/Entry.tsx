import { Holder } from "./Holder"
import { Ball } from "./Ball";
import { useEffect, useState } from "react";
import "./CSS/Entry.css";
import { Index } from "./Index";
import { Result, ResultDefault } from "./Result";

type EntryType = {
    list : string[],
    setEntry : (value: DefaultEntryType[]) => void,
    setDragData : (value : string) => void,
    dragData : string,
    confirm : boolean,
    setConfirm? : (value:boolean) => void,
    index:number,
    entireList : string[][],
    game:string[],
    resultColors: string[];
}

export interface DefaultEntryType {
    list : string[],
    confirm : boolean,
}

export const defaultEntry : DefaultEntryType = {
    list :["gray","gray","gray","gray"],
    confirm : false,
} 

export const Entry = ({list,game, setEntry, setDragData, dragData, confirm, setConfirm, index, entireList, resultColors}: EntryType) => {

    const handleConfirm = () => {
        if (!confirm) {
            if (list.findIndex(l => l === "gray") !== -1) return;  
            const {blacks, restList, restGame} = FindBlacks(game, list);
            const reds = FindReds (restGame, restList);
            let newEntireEntryList = entireList.map((el) => ({list: el,confirm: true,}));
            setEntry( [...newEntireEntryList]);
        }
      }

    return (
        <div className="Entry">
            <Index number = {index + 1} />
            <Result colors = {resultColors} width={4} height={4} />
            {list.map((l,i) => 
                <Holder key={i} 
                    entireList = {entireList}
                    colorList={list}
                    dragData = {dragData}
                    status = {confirm ? "confirmed" : "holder"}
                    index = {i}
                    setEntry = {setEntry}
                    />)}
            <button className="Confirm" style={{backgroundColor : confirm ? "gray" : "#00008B"}} onClick={handleConfirm}> {confirm ? "confirmed" : "confirm"}</button>
        </div>
    )
}

const FindBlacks = (game: string[], list: string[]) : {blacks: number, restList: string[], restGame: string[]}  => {
    let positions : number[] = [];
    for (let index = 0; index < list.length; index++) {
        const elementList = list[index];
        const elementGame = game[index];
        if (elementList === elementGame) {
            positions.push(index);
        }
    }
    let restList = list.filter((l,i)=> !positions.includes(i));
    let restGame = game.filter((l,i)=> !positions.includes(i));
    return {blacks:positions.length, restList:restList, restGame: restGame };
}

function FindReds(restGame: string[], restList: string[]) {
    var result = 0;
    for (let index = 0; index < restList.length; index++) {
        const element = restList[index];
        var ind = restGame.indexOf(element);
        if (ind === -1) continue;
        else {
            restGame.splice(ind,1);
            result++;
        }
    }
    return result;
}

