import "./CSS/Result.css";

interface ResultType {
    colors : string[],
    width : number,
    height : number,
}

export const ResultDefault = ["white","white","white","white"];

export const Result = ({colors, width, height}:ResultType) => {
    let style = {
        width : width + "rem",
        height : height + "rem"
    }
    
    return (
        <div className="Result" style={style}>
            {colors.map((c,index) => 
            <div className="IndividualResultOutter" 
                key={index} 
                style={{backgroundColor : c }}
                >
                    <div className="IndividualResultInner" 
                        key={index} 
                        style={{backgroundColor : "white" }}>
                    </div>
            </div>)}
        </div>
    )
}