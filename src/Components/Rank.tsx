import "./CSS/Rank.css"

export interface RankInfo {
    name : string,
    icon : string,
    wins : number,
}

interface RankPropsType {
    rank : RankInfo
    index : number
}
export const Rank = ({rank, index}: RankPropsType) => {

    return (
        <div className="Rank">
            <span className="Rank-name">{rank.name}</span>
            <StartNumber num = {index} />
            <span className="Rank-wins">{rank.wins}</span>
            <span className="Rank-prefix" >wins</span>
        </div>
    )
}

const StartNumber = ({num} : {num : number}) => {
    return (
        <div className="star-number">
            <div className="star">
                <div className="number">{num}</div>
            </div>
        </div>
    )
}