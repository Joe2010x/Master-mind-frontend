

import { logInfo } from '../../App';
import { defaultEntry, DefaultEntryType } from '../Entry';

export type JoinGameDto = {
  id : string,
  name : string,
}

export type requestDto = {
    gameId : string,
    userName : string,
    roundIndex : number,
    entrySet : number[] | undefined
}

export type statusDto = {
    winner : string;
    userNames : string[],
    sets : string[][],
    roundIndex : number[],
    wins : number[],
    gameStatus : number,
    winSet : number[],
}

// export const baseUrl = "http://localhost:5000/Game/";
export const baseUrl = "http://192.168.1.30:5000/Game/";
export const createGameUrl = "CreateGame";
export const joinGameUrl = "JoinGame";
export const updateUrl = "UpdateGame";
export const statusUrl = "Status";
export const restartUrl = "Reset";
export const defaultResultColor = ["white", "white", "white", "white"];


export const createGame = async (name : string, setMessage : (value : string) => void, newGame : (id : string, name : string) => void) => 
  {
    if (!name) {
      setMessage("Please enter a user name.");
      return;
    }
    try {
      const response = await fetch(`${baseUrl+createGameUrl}?name=${name}`);
      if (response.ok) {
        const data : JoinGameDto = await response.json(); 
        // game created successfully.
        newGame(data.id, data.name);
        setMessage(`Game created successfully with ID: ${data.id} and Username: ${data.name}`);
      } else {
        const error = await response.text();
        setMessage(`Error: ${error}`);
      }
    } catch (error) {
      const err = error as Error;
      setMessage(`Failed to create game: ${err.message}`);
    }
  };

// Join Game
export const joinGame = async (name : string, room : string, setMessage : (value : string) => void, newGame :(id: string, name : string) =>void,) => {
      if (!name || !room) {
        setMessage("Please enter a valid player name and select a game to join.");
        return;
      }
      try {
        const response = await fetch(`${baseUrl+joinGameUrl}?id=${room}&name=${name}`);
        if (response.ok) {
          const data : JoinGameDto = await response.json(); 
          newGame(data.id, data.name);
          setMessage(`Join game successfully with ID: ${data.id} and Username: ${data.name}`);

        } else {
          const error = await response.text();
          setMessage(`Error: ${error}`);
        }
      } catch (error) {
        let err = error as Error;
        setMessage(`Failed to join game: ${err.message}`);
      }
    };

export const fetchData = async (setStatus : (value: statusDto) => void, setWinner : (value : string) => void, handleWinner : () => void, logInfo : logInfo, entryList : DefaultEntryType[], setColorList : Function, setWinnerSet : Function ) => {
  try {
    const response = await fetch(`${baseUrl+statusUrl}?id=${logInfo.roomNum}&ri=${entryList.length}`); // Replace with your endpoint
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    const result = await response.json() as statusDto;
    // console.log("fetched data ", result);
    // console.log(entryList.length,"inside fetch");
    setStatus(result);
  
    if (result.winner.length !== 0) {
      setWinner(result.winner);
      setWinnerSet(result.winSet);
      handleWinner();
    }
  } catch (err) {
      console.log("Error from status fetch", err);
  }
};

export const restart = async (room : string, name : string) => {
  try {
      const response = await fetch (`${baseUrl + restartUrl}?id=${room}&name=${name}`);

      if (!response.ok) {
          throw new Error(`Failed to send DTO: ${response.statusText}`);
        }
      
  } catch (error) {
      let err = error as Error;
      console.log("Restart game.", err.message);
  }
}

export const updateDTO = async (update : requestDto, setResultList : Function, setColorList : Function) => {
        try {
            const response = await fetch (baseUrl + updateUrl, {
                method: "POST",
                headers : {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(update),
            });

            if (!response.ok) {
                throw new Error(`Failed to send DTO: ${response.statusText}`);
              }
        
              const data = await response.json() as string[];
              setResultList((pre: any) => [...pre,data]);
              if (data.filter(d => d === "black").length !== 4)
              {
                setColorList((pre: any) => [...pre, defaultEntry]);
              }
            
        } catch (error) {
            let err = error as Error;
            console.log("Error sending DTO", err.message);
            
        }
    }