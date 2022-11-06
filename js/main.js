import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";

function differenceInDays(timeStart) {
  var  timeEnd = new Date();
   
  if (timeEnd > timeStart)
  {
       var diff = timeEnd.getTime() - timeStart.getTime();
        return parseInt(diff/(1000 * 60 * 60 * 24)+1)
  }  
}

let difference_In_Days = differenceInDays(new Date("2022-10-22"));

window.onload = function () {
  document.getElementById(
    "gamenumber"
  ).innerText = difference_In_Days.toString();
  document.getElementById("back-icon").innerHTML = folder + leftArrow;
};

let game = {
  guesses: [],
  solution: {},
  players: [],
  leagues: []
};

function getSolution(players,sArray, diffinDays){
  let id = sArray[diffinDays-1].id
  let jug = players["id"]
  let player = players.filter(r=>r.id==id)[0]
  return player
}

Promise.all([fetchJSON("json/fullplayers.json"), fetchJSON("json/solution.json")]).then(
  (values) => {

    let solution;
    
    [game.players, solution] = values;

    game.solution = getSolution(game.players, solution, difference_In_Days);
    
    console.log(game.solution);

    document.getElementById(
      "mistery"
    ).src = `https://playfootball.games/media/players/${
      game.solution.id % 32
    }/${game.solution.id}.png`;
  
  }
);
