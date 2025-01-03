import { useState } from "react";
import "./CSS/Holder.css";
import { Ball, BallType } from "./Ball";
import { DefaultEntryType } from "./Entry";

interface HolderType {
    colorList : string[];
    index : number;
    setEntry? : (value:DefaultEntryType[]) => void;
    status : string;
    dragData : string;
    entireList : string[][]
}
export const Holder = ({colorList, index, setEntry, dragData, status, entireList} : HolderType) =>
{
    let color = colorList[index];
    const [ballColor, setBallColor] = useState<string>("");
    const handleEnter = (e: React.DragEvent) => {
        e.preventDefault();
      };

    const handleLeave = (e: React.DragEvent) => {
        e.preventDefault();
    }

    const Dropped = (e: React.DragEvent) => {
        e.preventDefault();
        if (status !== "holder") return;
        
        let newList = [...colorList];
        newList[index] = dragData;

        const newEntryList = [
            ...entireList.slice(0, entireList.length - 1),
            newList];
            
        if (setEntry !== undefined) setEntry(newEntryList.map((el, i) => ({list: el,confirm: i === newEntryList.length - 1 ? false : true,})));
    }

    let ball : BallType = 
    {
        backgroundColor: "white", 
        core : color
    }


    return (
        <div className="Holder"

            onDragEnter = {handleEnter}
            onDragLeave = {handleLeave}
            onDrop={Dropped}
            onDragOver={(e) => e.preventDefault()}
        >
            <div className="HolderBackground" style={{backgroundColor : ball.backgroundColor } }>
                <div className="HolderCore" style={{backgroundColor : ball.core } }/>
            </div>
        </div>
    )
}