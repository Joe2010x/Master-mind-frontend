import "./CSS/Ball.css";

export interface BallType {
    backgroundColor : string;
    core :string
}

export const ballGenerate = (num : number) => {
    let result : string[] = [];
    for (let index = 0; index < num; index++) {
        let position = Math.floor(Math.random() * ballCollections.length);
        result = [...result, ballCollections[position].core];
    }
    return result;
}

export const ColorList : string[] = [
    "Maroon", "#ba8e23","Orange", "Green","Teal","Blue","Navy","Purple",
]

export const ballCollections : BallType[] = [
    {
        backgroundColor :  "lightgray",
        core : ColorList[0]
    },
    {
        backgroundColor :  "lightgray",
        core : ColorList[1]
    },
    {
        backgroundColor :  "lightgray",
        core : ColorList[2]
    },
    {
        backgroundColor :  "lightgray",
        core : ColorList[3]
    },
    {
        backgroundColor :  "lightgray",
        core : ColorList[4]
    },
    {
        backgroundColor :  "lightgray",
        core : ColorList[5]
    },
    {
        backgroundColor :  "lightgray",
        core : ColorList[6]
    },
    {
        backgroundColor :  "lightgray",
        core : ColorList[7]
    },
]

interface propsType 
{
    ball : BallType;
    size? : number;
    index? : number;
    status? : string;
    setDragData? : (value : string) => void;
}

export const Ball = ({ball, size, setDragData, index, status} : propsType ) => {
    const handleOnDrag = (e: React.DragEvent, color : string) => 
    {
        e.dataTransfer.setData("color", color);
        if (setDragData!== undefined) setDragData(color);
    }


    return (
        <div className="BallBackground" 
            style={{backgroundColor : ball.backgroundColor, width : size, height : size} }
            // onDrop = {handleOnDrop}
            onDragOver={(e)=> e.preventDefault()}
            >
            <div className="BallCore" 
                style={{backgroundColor : ball.core } }
                draggable
                onDragStart={(e)=>handleOnDrag(e, ball.core)}
                >
            </div>
        </div>
    )
}
