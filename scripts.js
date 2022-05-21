//All variables must be declared
"use strict";

let players = [];
    players = [
    {seed: 0, name: "Lenny", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, defeat: 0, victory: 0, rankingPts: 0},
    {seed: 1, name: "Patrick", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, defeat: 0, victory: 0, rankingPts: 0},
    {seed: 2, name: "Elsa", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, defeat: 0, victory: 0, rankingPts: 0},
    {seed: 3, name: "Linus", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, defeat: 0, victory: 0, rankingPts: 0},
    {seed: 4, name: "Robert", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, defeat: 0, victory: 0, rankingPts: 0}
   ];
    

let matches = [{}];
let day = [];

//Players input on focus, if user press Enter, add a player
document.getElementById("playerName").addEventListener("focus", e =>{
    document.addEventListener("keyup", e=>{
        if(e.key === "Enter"){
           addPLayer();
        }
    })
} )

//addplayer when click on Add a player button
document.getElementById("addPlayer").addEventListener("click", e=>{
    
    addPLayer();
           
})
//click on start to show all the matches.
document.getElementById("start").addEventListener("click", e =>{
    table();
    print();
    for(let x = 0; x < matches.length; x++){
        console.log(matches[x]);
    }
})

function addPLayer(){
    
    //clear null element from players array
    // players = players.filter(e=> {return e !== null});
    if(players[players.length-1] === null){
        players.pop();
    }

    let newPlayer = document.getElementById("playerName");
    let playerList = document.getElementById("playerList");
    
    if(players[players.length] === null){
        players.remove(players.length);
        
    }
    
    document.getElementById("addPlayer--Error").innerText = "";
    
    if(newPlayer.value != ""){
    //Check if name is already used.
        if(players.filter(e=> e.name.toUpperCase() === (newPlayer.value).toUpperCase()).length > 0){
            newPlayer.style.border = "2px solid red";
            newPlayer.placeholder = "Enter a Name";
            newPlayer.value= "";
            document.getElementById("addPlayer--Error").innerText = "The name you have been entered is already used. Please use another name.";
            
        }else{
            players.push({seed: (players.length), name: newPlayer.value, goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, defeat: 0, victory: 0, rankingPts: 0});
            playerList.innerText += `\n${players.length}: ${newPlayer.value}`;
            //clean the input field after a player has been added
            document.getElementById("playerName").value = "";
        }

    }else{
        document.getElementById("addPlayer--Error").innerText = "Please enter a Name";
    }
}

function createPairs(items){
    
    //add a null object if the array is not even.
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

function print(){
    document.querySelector(".dayByDay").innerHTML = ""
    let array = createPairs(players);
   
    for(let i = 0; i < array.length; i++){
        let day = `day${i+1}`
        document.querySelector(".dayByDay").innerHTML +=
        `<div class="day" id="${day}" data-id="${day}">${day}
            <div></div>
        </div>`;
        for(let y = 0; y < array[i].length; y++){
            let player1, player2, id1, id2;
            if(array[i][y][0]){
                player1 = array[i][y][0].name
                id1 = array[i][y][0].seed;
            }else{
                player1 = "exempt";
            }
            if(array[i][y][1]){
                player2 = array[i][y][1].name
                id2 = array[i][y][1].seed;
            
               
            }else{
                player2 = "exempt";
            }
            if(player1 !== "exempt" && player2!== "exempt"){
                const match = matches.find(element => element.matchID === `${id1}${id2}`);
                const matchReverse = matches.find(element => element.matchesID === `${id2}${id1}`)               
                if(match){
                    document.querySelector(`#${day} div`).innerHTML += `<div id="Match${id1}${id2}">${player1} vs ${player2} : <span>${match.score1} - ${match.score2}</span> <button class="matchToPlay" data-id="${id1}${id2}">Play</button> </div>`
                }else if (matchReverse){
                    document.querySelector(`#${day} div`).innerHTML += `<div id="Match${id1}${id2}">${player1} vs ${player2} : <span>${match.score1} - ${match.score2}</span> <button class="matchToPlay" data-id="${id1}${id2}">Play</button> </div>`
                
                }else{
                    document.querySelector(`#${day} div`).innerHTML += `<div id="Match${id1}${id2}">${player1} vs ${player2} <span></span> <button class="matchToPlay" data-id="${id1}${id2}">Play</button> </div>`
                }
                // document.querySelector(`#${day} div`).style.display = "none";
            }
        }
    }


    document.querySelectorAll(".day").forEach(day => {
        day.addEventListener("click", function(e){
            e.preventDefault();
            e.stopPropagation();
            let btnDay = document.querySelector((`#${this.dataset.id} > div`));
            let displayBtn = window.getComputedStyle(btnDay).display;
            if(displayBtn !== "none"){
            document.querySelector(`#${this.dataset.id} > *`).style.display = "none";
            }else{
                document.querySelector(`#${this.dataset.id} > *`).style.display = "block";
            }
        })
    })
    document.querySelectorAll(".day div").forEach(e => {
        e.addEventListener("click", a => {
            a.stopPropagation();
        })
    })

    document.querySelectorAll(".matchToPlay").forEach(button => {
        button.addEventListener("click", function(){
            let idI, idY;
            idI = this.dataset.id.split("")[0];
            idY = this.dataset.id.split("")[1];
            const match = matches.find(element => element.matchID === `${idI}${idY}`)
            
            if(match){
                showModalChange(idI, idY);
            }else{

                showModal(idI, idY);
            }

        })
    })

}



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
     let nameI, nameY, seedI, seedY;
     
    for(let z = 0; z < players.length; z++){
        if(players[z] !==null){ 
          
            if(players[z].seed == i){
                nameI = players[z].name;  
                seedI = players[z].seed;
                
            }
            if(players[z].seed == y){
                nameY = players[z].name;
                seedY = players[z].seed;
            }
        }else{
            continue;
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
        for(let z = 0; z < players.length; z++){
            if(players[z] !== null){    
                if(players[z].seed === i){
                    idI = z;
                }
                if(players[z].seed === y){
                    idY = z;
                }
            }
        }
        
        iResult = document.getElementById(`scoreI`).value;
        yResult = document.getElementById(`scoreY`).value;
        matches.push({matchID: i+""+y, score1: iResult, score2: yResult })
        
        console.log(i + " " + y)
      
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
        document.querySelector(`#Match${i}${y} span`).innerHTML = `: ${iResult} - ${yResult}`;
      
        if(iResult === yResult){
            // document.querySelector(`.${players[idI].name}${players[idI].seed}vs${players[idY].seed}${players[idY].name}`).innerHTML = `<p>Draw <br>${iResult} - ${yResult}<p>`;
            // document.querySelector(`.${players[idY].name}${players[idY].seed}vs${players[idI].seed}${players[idI].name}`).innerHTML = `<p>Draw <br>${iResult} - ${yResult}<p>`;
            
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
        
        // document.querySelector(`.${players[idI].name}${players[idI].seed}vs${players[idY].seed}${players[idY].name}`).innerHTML = `<p>${players[idI].name} <br>${iResult} - ${yResult}<p>`;
        // document.querySelector(`.${players[idY].name}${players[idY].seed}vs${players[idI].seed}${players[idI].name}`).innerHTML = `<p>${players[idI].name} <br>${yResult} - ${iResult}<p>`;
        
        players[idY].defeat = parseInt(players[idY].defeat) + 1;
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
        // document.querySelector(`.${players[idI].name}${players[idI].seed}vs${players[idY].seed}${players[idY].name}`).innerHTML = `<p>${players[idY].name} <br>${iResult} - ${yResult}<p>`;
        // document.querySelector(`.${players[idY].name}${players[idY].seed}vs${players[idI].seed}${players[idI].name}`).innerHTML = `<p>${players[idY].name} <br>${yResult} - ${iResult}<p>`;
        
        players[idY].victory = parseInt(players[idY].victory) + 1;
        players[idY].pts = parseInt(players[idY].victory * 3) + parseInt(players[idY].draw);
        players[idY].goal.for = parseInt(players[idY].goal.for) + parseInt(yResult);
        players[idY].goal.against = parseInt(players[idY].goal.against) + parseInt(iResult);
        players[idY].goal.difference = parseInt(players[idY].goal.for) - parseInt(players[idY].goal.against);

        players[idI].defeat = parseInt(players[idI].defeat) + 1;
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
    console.log(i + " " + y)
    for(let z = 0; z < players.length; z++){
        if(players[z] !== null){
            if(players[z].seed == i){
                namei = players[z].name;
            }
            if(players[z].seed == y){
                namey = players[z].name;
            }
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
    for(let z = 0; z < players.length; z++){
        if(players[z] !== null){
            if(players[z].seed == i){
                IDi = z;
                seedI = players[z].seed;   
            }
            if(players[z].seed == y){
                IDy = z;
                seedY = players[z].seed;
            }
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
        
    for(let z = 0; z < players.length; z++){
        if(players[z] !== null){
            if(players[z].seed === i){
                
                teami = `${players[z].name}${players[z].seed}`;
                teamii =`${players[z].seed}${players[z].name}`;
            }
            if(players[z].seed === y){
                teamy = `${players[z].name}${players[z].seed}`;
                teamyy =`${players[z].seed}${players[z].name}`;
            }
        }
    }
    document.querySelector(`#Match${i}${y} span`).innerHTML = "";
    // document.querySelector(`.${teami}vs${teamyy}`).innerHTML = ``;
    // document.querySelector(`.${teamy}vs${teamii}`).innerHTML = ``;
    let team1, team2;
    for(let x = 0; x < matches.length; x++){
        console.log(matches[x].matchID + " " + i + " " + y)
        if(matches[x].matchID === `${i}${y}`){
            team1 = matches[x].score1;
            team2 = matches[x].score2;
            for(let z = 0; z < players.length; z++){
               if(players[z] !== null) {    
                    if(players[z].seed == i){
                        teami = z ;
                    }
                    if(players[z].seed == y){
                        teamy = z;
                    }    
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
        
        players[teami].defeat = parseInt(players[teami].defeat) - 1;
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
        
        players[teamy].defeat = parseInt(players[teamy].defeat) - 1;
        players[teamy].goal.for = parseInt(players[teamy].goal.for) - team1;
        players[teamy].goal.against = parseInt(players[teamy].goal.against) - team2;
        players[teamy].pts = parseInt(players[teamy].victory * 3 ) + parseInt(players[teamy].draw);
        players[teamy].goal.difference = parseInt(players[teamy].goal.for) - parseInt(players[teamy].goal.against);
    }

    table();
    
 
}
    
//print the table of score
 function table(){
    players = players.filter(e=> {return e !== null});
    sortTable(players);
     if(players.length != 0){
      
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
                <div class="rankingPlayer${i}--defeat">${players[i].defeat}</div>
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
        let keyA, keyB, drawA, drawB, mostGoalA, mostGoalB;
            keyA = a.pts;
            keyB = b.pts;
            drawA = a.goal.difference;
            drawB = b.goal.difference;
            mostGoalA = a.goal.for;
            mostGoalB = b.goal.for;

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