
import { logInfo } from "../App";
import { Player, PlayerInfo } from "./Player";
import { Rank, RankInfo } from "./Rank";
import { statusDto } from "./Services/GameApi";

interface PlayerList {
    status : statusDto,
    logInfo : logInfo
}

export const PlayerList = ({status, logInfo} : PlayerList) => {
    if (status.userNames === undefined) return;
    let players = status.userNames.map((n, index) => ({ 
        name : n,
        icon : "",
        colors : status.sets[index],
        index : status.roundIndex[index]
    }));

    let ranks = status.userNames.map((n, index) => ({
        name : n,
        icon : "",
        wins : status.wins[index],
    }));
    ranks = [...ranks].sort((a,b) => b.wins - a.wins).slice(0,5);
    let ps = players as PlayerInfo[];
    let rs = ranks as RankInfo[];
    return (
        <div className="PlayerList">
            <div  className="Room-info">
                <div className="Winner">Room Info</div>
                <div className="info">
                    <span className="suffix">Game:</span> 
                    <span className="suffix">{logInfo.roomNum}</span> 
                </div>
                <div className="info">
                    <span className="suffix">Username:</span>
                    <span className="suffix">{logInfo.name}</span> 
                </div>
            </div>
            
            <div className="Status-info">
                <div className="Winner">{status.winner.length === 0 ? "Game in progress" : `Winner is ${status.winner}` }</div>
                {ps && ps.map((p, index) => (<Player key = {index} player = {p} />))}
            </div>
            <div className="Rank-info">
                <div className="Winner">Rank</div>
                {rs && rs.map((r, index) => <Rank key = {index} rank = {r} index = {index + 1}/>)}
            </div>
        </div>
    )
}