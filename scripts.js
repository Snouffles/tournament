//All variables must be declared
"use strict";

let players = [
    {seed: 0, name: "Lenny", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {seed: 1, name: "Patrick", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {seed: 2, name: "Elsa", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {seed: 3, name: "Linus", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {seed: 4, name: "Robert", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0}
   ];
    
   const createPairs = (items) => {
    if (items.length % 2) items.push(null);

    let groups = [];

    let n = items.length;
    let infinityPoint = items[0];

    let candidates = items.slice(1);


    for (let i = 0; i <= n - 2; i++) {
      let group = [];
      group.push([infinityPoint, candidates[i]]);

      for (let j = 1; j <= n / 2 - 1; j++) {
        let k = i + j;
        if (k > candidates.length - 1) {
          k = k % candidates.length;
        }
        let q = i - j;
        q = q < 0 ? q + candidates.length : q;
        let currentPair = [candidates[k], candidates[q]];
        group.push(currentPair);
      }

      groups.push(group);
    }

    return groups
  };

const people = ["ned", "jane", "sammi", "raj", "freddy"]

console.log(createPairs(players))
   
    let matches = [{}];
    let day = [];
    // if(day.some(e=> e.r.toUpperCase() === ("q").toUpperCase())){
    //    let id = day.findIndex(e=> e.r.toUpperCase() === ("q").toUpperCase());
    //     day[id].r += "a";
       
    // }
    // if(day.some(e=> e.r.includes("q"))){
    //    let id = day.findIndex(e=> e.r.includes("q"));
    //     day[id].r += "a";
       
    // }
    
  
   //Create all the possible match + the days.
        for(let x = 0; x < players.length; x++){   
           day.push({"id":x, "teamPlaying" : ""})
            for(let i = 0; i < players.length; i++){
                for(let y = 0; y < players.length; y++){
                    
                    if(i != y ){
                        if((!(matches.some(e=> e.id === (i.toString() + y.toString()))) && !(matches.some(e=> e.id === (y.toString() + i.toString())))) && !(matches.some(e=> e.id === (i.toString() + y.toString()))) && !(day[x].teamPlaying.includes(i.toString())) && !(day[x].teamPlaying.includes(y.toString()))){
                            day[x].teamPlaying += i.toString();
                            day[x].teamPlaying += y.toString();
                            let matchID = i.toString()+y.toString();
                            matches.push({id: matchID, day: x, score:{team1: "", team2: ""}})
                            console.log(matchID)
                            
                        }
                    }
                }
            }
        }
            
        

console.log(day)
console.log(matches)


document.getElementById("showMatch").addEventListener("click", e=>{
    let input = document.getElementById("showMatchBox");
    for(z = 0; z < matches.length; z++){
        if(matches[z].team1 === undefined){
        input.innerHTML += `<div>day ${matches[z].day} > ${matches[z].id}: <button>Match to Play</button></div> `
        }else{
        input.innerHTML += `<div> ${matches[z].id}: ${matches[z].matchID} - ${matches[z].team2}</div>`
        }
    }
})
  
document.getElementById("addPlayer").addEventListener("click", e=>{
    let newPlayer = document.getElementById("playerName");
    let playerList = document.getElementById("playerList");
    document.getElementById("addPlayer--Error").innerText = "";
    
    if(newPlayer.value != ""){
    //Check if name is already used.
        if(players.filter(e=> e.name.toUpperCase() === (newPlayer.value).toUpperCase()).length >0){
            newPlayer.style.border = "2px solid red";
            newPlayer.placeholder = "Enter a Name";
            newPlayer.value= "";
            document.getElementById("addPlayer--Error").innerText = "The name you have been entered is already used. Please use another name.";
            
        }else{
            players.push({seed: (players.length-1), name: newPlayer.value, goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0});
            playerList.innerText += `\n${players.length}: ${newPlayer.value}`;
        }

    }else{
        document.getElementById("addPlayer--Error").innerText = "Please enter a Name";
    }
    
           
})


document.getElementById("start").addEventListener("click", e =>{
    table();
    showMatches();
})

function showMatches(){
    if(players.length === 0){
        console.log("test")
    }else{
        for(let i = 0; i < players.length; i++){
            document.querySelector(".col-up").innerHTML += `<div class="name" data-id="${players[i].seed}"> ${players[i].name}</div>`
            document.querySelector(".row").innerHTML += `<div class="newRow${i} newRow" data-id="${players[i].seed}"> <div class="name">${players[i].name}</div></div>`
            for(let y = 0; y < players.length; y++){
                if(y===i){
                    document.querySelector(`.newRow${i}`).innerHTML += `<div class="square black"></div>` 
                }else{
                
                    let matchToPlay = `match${players[i].seed}${players[y].seed}`
                    document.querySelector(`.newRow${i}`).innerHTML += `<div class="square ${players[i].name}${players[i].seed}vs${players[y].seed}${players[y].name}" data-id="${matchToPlay}"></div>`
                }
            }
        }
    }

    let rowSize = ((players.length + 1) * 62 );
    document.querySelector(".row").style.width = `${rowSize}px`;
    document.querySelector(".array").style.width = `${rowSize}px`;
    document.querySelector(".col-up").style.width = `${rowSize}px`;

    //tableau
    document.querySelectorAll(".square").forEach(square =>{
        square.addEventListener("click", function(){
            if(square.innerText != ""){
                for(let i = 0; i < players.length; i++){
                    for(let y = 0; y < players.length; y++){
                        let  newMatchToPlay = `match${players[i].seed}${players[y].seed}`;
                        
                        if(this.dataset.id === newMatchToPlay){
                            let seedI = players[i].seed;
                            let seedY = players[y].seed;
                            showModalChange(seedI, seedY);
                        }
                    }
                }
            }
            if(square.innerText === ""){
                for(let i = 0; i < players.length; i++){
                    for(let y = 0; y < players.length; y++){

                        let  newMatchToPlay = `match${players[i].seed}${players[y].seed}`;
                        
                        if(this.dataset.id === newMatchToPlay){
                            let seedI = players[i].seed;
                            let seedY = players[y].seed;
                            showModal(seedI, seedY);
                                
                        }
                    }
                } 
            }  
        })
    })
}
  
  
 function showModal(i, y){
     let nameI, nameY, idI, idY, seedI, seedY;
    for(z = 0; z < players.length; z++){
         if(players[z].seed === i){
            nameI = players[z].name;  
            idI = z;
            seedI = players[z].seed;
         }
         if(players[z].seed === y){
            nameY = players[z].name;
            idY = z;
            seedY = players[z].seed;
         }
     }
     
    document.querySelector(".modal").innerHTML =
                 
    ` <div class="matchModal">
         <div>
             <p>${nameI}
             <input id="scoreI" type="number" value="0" min = "0"/>
         </div>
         <div>
             vs
         </div>
         <div>
             <p>${nameY}
             <input id="scoreY" type="number" value="0" min = "0"/>
         </div>
         <button>ok</button><button id="modalDelete">X</button>
     </div>
 `
 ;

     matchScore(seedI, seedY);


 document.getElementById("modalDelete").addEventListener("click", e=>{
     closeModal();
 })
}


function matchScore( i , y){
    
    document.querySelector(".matchModal button").addEventListener("click", e => {
        let iResult, yResult, idI, idY;
        for(z = 0; z < players.length; z++){
            if(players[z].seed === i){
                idI = z;
            }
            if(players[z].seed === y){
                idY = z;
            }
        }
        
        iResult = document.getElementById(`scoreI`).value;
        yResult = document.getElementById(`scoreY`).value;
      
        for(let x=0; x < matches.length; x++){
            if(matches[x].id === `${i}${y}`){
                    matches[x].score.team1 = iResult;
                    matches[x].score.team2 = yResult;
                }
            if(matches[x].id === `${i}${y}`){
                    matches[x].score.team1 = yResult;
                    matches[x].score.team2 = iResult;
            }
        }
      
        if(iResult === yResult){
            document.querySelector(`.${players[idI].name}${players[idI].seed}vs${players[idY].seed}${players[idY].name}`).innerHTML = `<p>Draw <br>${iResult} - ${yResult}<p>`;
            document.querySelector(`.${players[idY].name}${players[idY].seed}vs${players[idI].seed}${players[idI].name}`).innerHTML = `<p>Draw <br>${iResult} - ${yResult}<p>`;

            players[idY].draw = parseInt(players[idY].draw) + 1;
            players[idY].pts = parseInt(players[idY].victory * 3) + parseInt(players[idY].draw);
            players[idY].goal.for = parseInt(players[idY].goal.for) + parseInt(yResult);
            players[idY].goal.against = parseInt(players[idY].goal.against) + parseInt(iResult);
            players[idY].goal.difference = parseInt(players[idY].goal.for) - parseInt(players[idY].goal.against);

            players[idI].draw = parseInt(players[idI].draw) + 1;
            players[idI].pts = parseInt(players[idI].victory * 3) + parseInt(players[idI].draw);
            players[idI].goal.for = parseInt(players[idI].goal.for) + parseInt(iResult);
            players[idI].goal.against = parseInt(players[idI].goal.against) + parseInt(yResult);
            players[idI].goal.difference = parseInt(players[idI].goal.for) - parseInt(players[idI].goal.against);
       }

       if( iResult > yResult){
        
        document.querySelector(`.${players[idI].name}${players[idI].seed}vs${players[idY].seed}${players[idY].name}`).innerHTML = `<p>${players[idI].name} <br>${iResult} - ${yResult}<p>`;
        document.querySelector(`.${players[idY].name}${players[idY].seed}vs${players[idI].seed}${players[idI].name}`).innerHTML = `<p>${players[idI].name} <br>${yResult} - ${iResult}<p>`;
        
        players[idY].loose = parseInt(players[idY].loose) + 1;
        players[idY].pts = parseInt(players[idY].victory * 3) + parseInt(players[idY].draw);
        players[idY].goal.for = parseInt(players[idY].goal.for) + parseInt(yResult);
        players[idY].goal.against = parseInt(players[idY].goal.against) + parseInt(iResult);
        players[idY].goal.difference = parseInt(players[idY].goal.for) - parseInt(players[idY].goal.against);

        players[idI].victory = parseInt(players[idI].victory) + 1;
        players[idI].pts = parseInt(players[idI].victory * 3) + parseInt(players[idI].draw);
        players[idI].goal.for = parseInt(players[idI].goal.for) + parseInt(iResult);
        players[idI].goal.against = parseInt(players[idI].goal.against) + parseInt(yResult);
        players[idI].goal.difference = parseInt(players[idI].goal.for) - parseInt(players[idI].goal.against);
       }

       if( iResult < yResult){
        document.querySelector(`.${players[idI].name}${players[idI].seed}vs${players[idY].seed}${players[idY].name}`).innerHTML = `<p>${players[idY].name} <br>${iResult} - ${yResult}<p>`;
        document.querySelector(`.${players[idY].name}${players[idY].seed}vs${players[idI].seed}${players[idI].name}`).innerHTML = `<p>${players[idY].name} <br>${yResult} - ${iResult}<p>`;
        
        players[idY].victory = parseInt(players[idY].victory) + 1;
        players[idY].pts = parseInt(players[idY].victory * 3) + parseInt(players[idY].draw);
        players[idY].goal.for = parseInt(players[idY].goal.for) + parseInt(yResult);
        players[idY].goal.against = parseInt(players[idY].goal.against) + parseInt(iResult);
        players[idY].goal.difference = parseInt(players[idY].goal.for) - parseInt(players[idY].goal.against);

        players[idI].loose = parseInt(players[idI].loose) + 1;
        players[idI].pts = parseInt(players[idI].victory * 3) + parseInt(players[idI].draw);
        players[idI].goal.for = parseInt(players[idI].goal.for) + parseInt(iResult);
        players[idI].goal.against = parseInt(players[idI].goal.against) + parseInt(yResult);
        players[idI].goal.difference = parseInt(players[idI].goal.for) - parseInt(players[idI].goal.against);
       }

        table();
        closeModal();
            
        })
        
    }
    
function showModalChange(i, y){
    let namei, namey;
    for(z = 0; z < players.length; z++){
        if(players[z].seed === i){
            namei = players[z].name;
        }
        if(players[z].seed === y){
            namey = players[z].name;
        }
    }

    document.querySelector(".modal").innerHTML =
                
    ` <div class="matchModal">
        <div>
            <p> This games between ${namei} and ${namey} has already been played. Do you wish to change the result </p>
        <button id="showModalChangeYes">Yes</button><button id="showModalChangeNo">No</button>
        <button id="showModalChangeDelete">Delete</button>
    </div>
`
    modalChange(i, y);
}

function modalChange(i, y){
    
    let IDi, IDy, seedI, seedY;
    for(z = 0; z < players.length; z++){
        if(players[z].seed === i){
            IDi = z;
            seedI = players[z].seed;   
        }
        if(players[z].seed === y){
            IDy = z;
            seedY = players[z].seed;
        }
    }
    
    document.getElementById("showModalChangeYes").addEventListener("click", e=>{
        removeMatchScore(seedI, seedY);
        showModal(seedI, seedY);
    })

    document.getElementById("showModalChangeNo").addEventListener("click", e=>{
        closeModal();
    })

    document.getElementById("showModalChangeDelete").addEventListener("click", e=>{
        removeMatchScore(seedI, seedY)
        table();
        closeModal();
    })

}

function closeModal(){
    document.querySelector(".modal").innerHTML = "";
}

function updateScore(team, iResult, yResult){
players[team].pts = players[team].victory * 3 + players[team].draw;
players[team].goal.for =+ iResult;
players[team].goal.against =+ yResult;
players[team].goal.difference = players[team].goal.for - players[team].goal.against;
}
//delete the score of one game.
function removeMatchScore(i,y){

    let teami,teamii, teamyy, teamy;
        
    for(z = 0; z < players.length; z++){
        
        if(players[z].seed === i){
            
            teami = `${players[z].name}${players[z].seed}`;
            teamii =`${players[z].seed}${players[z].name}`;
        }
        if(players[z].seed === y){
            teamy = `${players[z].name}${players[z].seed}`;
            teamyy =`${players[z].seed}${players[z].name}`;
        }
        
        
    }
    
    document.querySelector(`.${teami}vs${teamyy}`).innerHTML = ``;
    document.querySelector(`.${teamy}vs${teamii}`).innerHTML = ``;
    let team1, team2;
    for(x = 0; x < matches.length; x++){
        if(matches[x].id === `${i}${y}`){
            team1 = matches[x].score.team1;
            team2 = matches[x].score.team2;
            for(z = 0; z < players.length; z++){
                if(players[z].seed === i){
                    teami = z ;
                }
                if(players[z].seed === y){
                    teamy = z;
                }
            }
        }
    }

    if(team1 === team2){
        
        players[teami].draw = parseInt(players[teami].draw) - 1;
        players[teami].goal.for = parseInt(players[teami].goal.for) - team1;
        players[teami].goal.against = parseInt(players[teami].goal.against) - team2;
        players[teami].pts = parseInt(players[teami].victory * 3 )+ parseInt(players[teami].draw);
        players[teami].goal.difference = parseInt(players[teami].goal.for) - parseInt(players[teami].goal.against);
        
        players[teamy].draw = parseInt(players[teamy].draw) - 1;
        players[teamy].goal.for = parseInt(players[teamy].goal.for) - team2;
        players[teamy].goal.against = parseInt(players[teamy].goal.against) - team1;
        players[teamy].pts = parseInt(players[teamy].victory * 3 ) + parseInt(players[teamy].draw);
        players[teamy].goal.difference = parseInt(players[teamy].goal.for) - parseInt(players[teamy].goal.against);
        
        
    }
    if(team1 > team2){
        
        players[teami].loose = parseInt(players[teami].loose) - 1;
        players[teami].goal.for = parseInt(players[teami].goal.for) - team2;
        players[teami].goal.against = parseInt(players[teami].goal.against) - team1;
        players[teami].pts = parseInt(players[teami].victory * 3 ) + parseInt(players[teami].draw);
        players[teami].goal.difference = parseInt(players[teami].goal.for) - parseInt(players[teami].goal.against);
        
        players[teamy].victory = parseInt(players[teamy].victory) - 1;
        players[teamy].goal.for = parseInt(players[teamy].goal.for) - team1;
        players[teamy].goal.against = parseInt(players[teamy].goal.against) - team2;
        players[teamy].pts = parseInt(players[teamy].victory * 3 ) + parseInt(players[teamy].draw);
        players[teamy].goal.difference = parseInt(players[teamy].goal.for) - parseInt(players[teamy].goal.against);

    }
    if(team1 < team2){

        players[teami].victory = parseInt(players[teami].victory) - 1;
        players[teami].goal.for = parseInt(players[teami].goal.for) - team2;
        players[teami].goal.against = parseInt(players[teami].goal.against) - team1;
        players[teami].pts = parseInt(players[teami].victory * 3 )+ parseInt(players[teami].draw);
        players[teami].goal.difference = parseInt(players[teami].goal.for) - parseInt(players[teami].goal.against);
        
        players[teamy].loose = parseInt(players[teamy].loose) - 1;
        players[teamy].goal.for = parseInt(players[teamy].goal.for) - team1;
        players[teamy].goal.against = parseInt(players[teamy].goal.against) - team2;
        players[teamy].pts = parseInt(players[teamy].victory * 3 ) + parseInt(players[teamy].draw);
        players[teamy].goal.difference = parseInt(players[teamy].goal.for) - parseInt(players[teamy].goal.against);
    }

    table();
}
    
 
//print the table of score
 function table(){
     if(players.length != 0){

        sortTable(players);
      
         document.querySelector(".ranking").innerHTML = `
      
        <div class="ranking__row">
            <div>Name</div>
            <div>V</div>
            <div>D</div>   
            <div>L</div>
            <div>GF</div>
            <div>GA</div>
            <div>GD</div>
            <div>Pts</div>
            </div>
            `;
            
            for(let i = 0; i < players.length; i++){
                let difference = players[i].goal.for - players[i].goal.against;
                document.querySelector(".ranking").innerHTML+=
                `<div class="ranking__row">
                <div class="rankingPlayer${i}--Name">${players[i].name}</div>
                <div class="rankingPlayer${i}--Victory">${players[i].victory}</div>
                <div class="rankingPlayer${i}--draw">${players[i].draw}</div>
                <div class="rankingPlayer${i}--loose">${players[i].loose}</div>
                <div class="rankingPlayer${i}--GA">${players[i].goal.for}</div>
                <div class="rankingPlayer${i}--GF">${players[i].goal.against}</div>
                <div class="rankingPlayer${i}--GD">${difference}</div>
                <div class="rankingPlayer${i}--Pts">${players[i].pts}</div>
                </div>`;
            }
            
        }
    }
    //sort the table from the most point, the most goal difference, the most goal
    //Will implement later the direct confrontation. 
function sortTable (table){
    
    table.sort(function(a,b){
        let keyA = a.pts;
        let keyB = b.pts;
        let drawA = a.goal.difference;
        let drawB = b.goal.difference;
        let mostGoalA = a.goal.for;
        let mostGoalB = b.goal.for;

    if(keyA < keyB) return 1;
    if(keyA > keyB) return -1;
    if(keyA === keyB){
        if(drawA < drawB) return 1;
        if(drawA > drawB) return 0;
        if(drawA === drawB){
            if(mostGoalA < mostGoalB) return 1;
            if(mostGoalA > mostGoalB ) return -1;
            return 0;
        }
        return 0;
    }
    return 0;
  });
}