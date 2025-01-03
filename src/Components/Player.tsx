import { Result } from "./Result"
import "./CSS/Player.css"

export interface PlayerInfo {
    name : string,
    icon : string,
    colors : string[],
    index : number,
}

interface PlayerPropsType {
    player : PlayerInfo
}

export const Player = ( {player} : PlayerPropsType) => {
    return (
        <div className="Player">
            <span className="Player-name">{player.name}</span>
            <span className="circle">{player.index}</span>
            <Result colors={player.colors} width= {8} height={2} /> 
        </div>
    )
}