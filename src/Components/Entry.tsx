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
    game:string[]
}

export interface DefaultEntryType {
    list : string[],
    confirm : boolean,
}

export const defaultEntry : DefaultEntryType = {
    list :["gray","gray","gray","gray"],
    confirm : false,
} 

export const Entry = ({list,game, setEntry, setDragData, dragData, confirm, setConfirm, index, entireList}: EntryType) => {

    console.log("entry refreshed ", game,entireList);

    const [resultColors, setResultColors] = useState<string[]>(ResultDefault);

    const handleConfirm = () => {
        console.log("click confirm");
        if (!confirm) {
            if (list.findIndex(l => l === "gray") !== -1) return;  
            
            const {blacks, restList, restGame} = FindBlacks(game, list);
            console.log("after confirm",game,blacks,restList, restGame);
            const reds = FindReds (restGame, restList);
            console.log("reds ", reds);
            setResultColors([...Array(blacks).fill("black"),...Array(reds).fill("red"),...Array(4-blacks-reds).fill("white")]);
            //setConfirm(true);
            if (blacks === 4) alert("you won!");
            // create a new row;
            else {
                // let newEntireEntryList  = entireList.map((el)=> {list: el; confirm: true});
                let newEntireEntryList = entireList.map((el) => ({list: el,confirm: true,}));
                setEntry([...newEntireEntryList,defaultEntry]);
            }
        }
      }

    return (
        <div className="Entry">
            <Index number = {index + 1} />
            <Result colors = {resultColors}/>
            {list.map((l,i) => 
                <Holder key={i} 
                    entireList = {entireList}
                    colorList={list}
                    dragData = {dragData}
                    status = {confirm ? "confirmed" : "holder"}
                    index = {i}
                    setEntry = {setEntry}
                    />)}
            <button className="Confirm" style={{backgroundColor : confirm ? "gray" : "#00008B"}} onClick={handleConfirm}> confirm</button>
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
            console.log("Find ", index);
        }
    }
    let restList = list.filter((l,i)=> !positions.includes(i));
    let restGame = game.filter((l,i)=> !positions.includes(i));
    console.log(positions, restList);
    return {blacks:positions.length, restList:restList, restGame: restGame };
}

function FindReds(restGame: string[], restList: string[]) {
    var result = 0;
    for (let index = 0; index < restList.length; index++) {
        const element = restList[index];
        var ind = restGame.indexOf(element);
        if (ind === -1) continue;
        else {
            //remove restGame by index
            restGame.splice(ind,1);
            //result ++
            result++;
        }
    }
    return result;
}

