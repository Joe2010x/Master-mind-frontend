import { Ball, ballCollections } from "./Ball";
import { Holder } from "./Holder";

type WinnerPropsType = {
    winner : string,
    name : string,
    restart : () => void,
    winSet : number[],
}

export type WinnerSetType = {
    winSet : number[],
    size : number,
}

export const Winner = ({winner, name, restart, winSet} : WinnerPropsType) => {

    const handleRestart = () => {
        restart();
    }
    return (
        <div className="overlay">
            <div className="overlay-content">
                {winner === name && <PlayerBanner />}
                {winner !== name && <WinnerBanner winner = {winner} />}
                <WinnerSet winSet = {winSet} size = {50} />
                <button onClick={handleRestart}>Restart Game</button> 
            </div>
        </div>
    )
}

const PlayerBanner = () => 
{
    return (
        <div>
            <h1>Congratulations !!!</h1>
        <h1>You are the Winner!</h1>
    </div>
    )
}

const WinnerBanner = ({winner} : {winner : string}) => {
    return (
        <div>
            <h1>Winner is {winner}</h1>
        </div>
    )
}

export const WinnerSet = ( {winSet, size} : WinnerSetType ) => {
    return (
        <div>
            <br />
            <h2>Winning set</h2>
            <div className="winner-set">
                {winSet.map((b,index) => <Ball key = {index} ball = {ballCollections[b]} size = {size} />)}
            </div>
        </div>
    )
}