import "./CSS/Result.css";

interface ResultType {
    colors : string[]
}

// export const ResultDefault = ["yellow","yellow","yellow","yellow"];
// export const ResultDefault = ["black","black","black","black"];
export const ResultDefault = ["white","white","white","white"];

// black : right color right position, dark_orange : right color

export const Result = ({colors}:ResultType) => {
    console.log(colors);
    return (
        <div className="Result">
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