import "./CSS/Index.css";

interface IndexType {
    number : number
}
export const Index = ({number}:IndexType) => {
    return (
        <div className="Index">
            <div className="IndexInner">{number }</div>
        </div>
    )
}