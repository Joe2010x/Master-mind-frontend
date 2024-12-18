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

export const ballCollections : BallType[] = [
    {
        backgroundColor :  "lightgray",
        core : "#194D33"
    },
    {
        backgroundColor :  "lightgray",
        core : "#3F51B5"
    },
    {
        backgroundColor :  "lightgray",
        core : "#673AB7"
    },
    {
        backgroundColor :  "lightgray",
        core : "#9C27B0"
    },
    {
        backgroundColor :  "lightgray",
        core : "#E91E63"
    },
    {
        backgroundColor :  "lightgray",
        core : "#F44336"
    },
    {
        backgroundColor :  "lightgray",
        core : "#795548"
    },
]

interface propsType 
{
    ball : BallType;
    size? : number;
    index : number;
    status : string;
    setDragData : (value : string) => void;
    // setDropIndex? : (value : number) => void  ;
}

export const Ball = ({ball, size, setDragData, index, status} : propsType ) => {
    //console.log("ball refreshed ",setDropIndex);
    const handleOnDrag = (e: React.DragEvent, color : string) => 
    {
        e.dataTransfer.setData("color", color);
        console.log("draged color,",color);
        setDragData(color);
    }

    // const handleOnDrop = (e: React.DragEvent) => {
    //     e.preventDefault();
    //     console.log("dropped", status, index);
    //     if (status === "confirmed") return;
    //     if (setDropIndex != undefined) setDropIndex(index);
    //     else console.log("dropIndex not operated");
    // }

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
