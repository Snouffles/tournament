let players = [
    {id: 0, seed: 0, name: "Lenny", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {id: 1, seed: 1, name: "Patrick", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {id: 2, seed: 2, name: "Elsa", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {id: 3, seed: 3, name: "Linus", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {id: 4, seed: 4, name: "Robert", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0} ];
   
    
    let matches = [{}];
   
    for(i = 0; i < players.length; i++){
        for(y = 0; y < players.length; y++){
            if(i != y){
                matchID = i.toString()+y.toString();
                matches.push({id: matchID, score:{team1: "", team2: ""}})
            }
        }
    }

 
  
 table();
  
  
  
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
                        console.log("click : " +  newMatchToPlay)
                       
                        showModalChange(players[i].seed, players[y].seed);

                    }
                }
            }
        }
        if(square.innerText === ""){
            for(let i = 0; i < players.length; i++){
                for(let y = 0; y < players.length; y++){

                    let  newMatchToPlay = `match${players[i].seed}${players[y].seed}`;
                  
                    if(this.dataset.id === newMatchToPlay){
                        
                        showModal(i,y)
                        matchScore(i,y);
                          
                    }
                }
            } 
        }  
    })
 })
  
  
  
 //Print the Table
  
 //sort table by point, goal difference, goal for.
 //need to implement direct oppenent system.
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
  
 function showModal(i, y){
    document.querySelector(".modal").innerHTML =
                 
    ` <div class="matchModal">
         <div>
             <p>${players[i].name}
             <input id="score${players[i].id}" type="number" value="0" min = "0"/>
         </div>
         <div>
             vs
         </div>
         <div>
             <p>${players[y].name}
             <input id="score${players[y].id}" type="number" value="0" min = "0"/>
         </div>
         <button>ok</button>
     </div>
 `
 ;
 }
  
 function showModalChange(i, y){
    console.log("ShowModalChange " + i + " " + y);
    document.querySelector(".modal").innerHTML =
                 
    ` <div class="matchModal">
         <div>
             <p> This games between ${players[i].name} and ${players[y].name} has already been played. Do you wish to change the result </p>
         <button id="showModalChangeYes">Yes</button><button id="showModalChangeNo">No</button>
         <button id="showModalChangeDelete">Delete</button>
     </div>
 `
    modalChange(i, y);
 }
  
 function modalChange(i, y){
     
    document.getElementById("showModalChangeYes").addEventListener("click", e=>{
        removeMatchScore(i,y);
        showModal(i, y);
        matchScore(i, y);
    })
    document.getElementById("showModalChangeNo").addEventListener("click", e=>{
        closeModal();
    })
    document.getElementById("showModalChangeDelete").addEventListener("click", e=>{
        document.querySelector(`.${players[i].name}${players[i].id}vs${players[y].id}${players[y].name}`).innerHTML = ``;
        document.querySelector(`.${players[y].name}${players[y].id}vs${players[i].id}${players[i].name}`).innerHTML = ``;
        console.log(`.${players[i].name}${players[i].id}vs${players[y].id}${players[y].name} attends .${players[y].name}${players[y].id}vs${players[i].id}${players[i].name}`);
        
        let compareId =  `${i}${y}`;
       
        console.log("compareID = " + compareId);

        for(x=0; x < matches.length; x++){
            
            if(matches[x].id === `${i}${y}`){
                
                let team1 = matches[x].score.team1;
                let team2 = matches[x].score.team2;
                console.log("but i: " + team1 + ". y:" + team2)
               
                if(team1 === team2){
                  
                    players[i].draw -=1;
                    players[i].goal.for -= team1;
                    players[i].goal.against -= team2;
                    players[i].pts = players[i].victory * 3 + players[i].draw;
                    players[i].goal.difference = players[i].goal.for - players[i].goal.against;
                    
                    players[y].draw -=1;
                    players[y].goal.for -= team2;
                    players[y].goal.against -= team1;
                    players[y].pts = players[y].victory * 3 + players[y].draw;
                    players[y].goal.difference = players[y].goal.for - players[y].goal.against;
                    
                    
                }else if(team1 > team2){
                   
                    console.log("team1 win")
                    players[i].victory -=1;
                    players[i].goal.for -= team1;
                    players[i].goal.against -= team2;
                    players[i].pts = players[i].victory * 3 + players[i].draw;
                    players[i].goal.difference = players[i].goal.for - players[i].goal.against;
                    
                    players[y].loose -=1;
                    players[y].goal.for -= team2;
                    players[y].goal.against -= team1;
                    players[y].pts = players[y].victory * 3 + players[y].draw;
                    players[y].goal.difference = players[y].goal.for - players[y].goal.against;
                }
                table();
               
            }
        }

        closeModal();
    })
  
 }
  
 function closeModal(){
    document.querySelector(".modal").innerHTML = "";
 }
  
  
 function matchScore(i,y){
    
    
    document.querySelector(".matchModal button").addEventListener("click", e => {
        let iResult, yResult;
        
        for( let z = 0; i < players.length; z++){
            console.log(players[1].seed)
            // if(players[z].seed === i ){
            //     iResult = document.getElementById(`score${players[z].seed}`).value;
            //     continue;
            // }
            // if(players[z].seed === y ){
            //     iResult = document.getElementById(`score${players[z].seed}`).value;

            // }
            
        } 
    
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
  
            document.querySelector(`.${players[i].name}${players[i].seed}vs${players[y].seed}${players[y].name}`).innerHTML = `<p>Draw <br>${iResult} - ${yResult}<p>`;
            players[i].draw  += 1;
            players[i].pts = players[i].victory * 3 + players[i].draw;
            players[i].goal.for =+ yResult;
            players[i].goal.against =+ iResult;
            players[i].goal.difference = players[i].goal.for - players[i].goal.against;
        
      
            document.querySelector(`.${players[y].name}${players[y].id}vs${players[i].id}${players[i].name}`).innerHTML = `<p>Draw <br>${yResult} - ${iResult}</p>`;
            players[y].draw += 1;
            players[y].pts = players[y].victory * 3 + players[y].draw;
            players[y].goal.for =+ yResult;
            players[y].goal.against =+ iResult;
            players[y].goal.difference = players[y].goal.for - players[y].goal.against;
         
  
        }else if(iResult > yResult){
  
            document.querySelector(`.${players[i].name}${players[i].id}vs${players[y].id}${players[y].name}`).innerHTML = `<p>${players[i].name} <br>${iResult} - ${yResult}<p>`;
            document.querySelector(`.${players[y].name}${players[y].id}vs${players[i].id}${players[i].name}`).innerHTML = `<p>${players[i].name} <br>${yResult} - ${iResult}</p>`;
            
            players[i].victory += 1;
            players[i].pts =  players[i].victory * 3 + players[i].draw;
            players[i].goal.for =+ iResult;
            players[i].goal.against =+ yResult;
            players[i].goal.difference = players[i].goal.for - players[i].goal.against;
            
            players[y].loose += 1;
            players[y].goal.for =+ yResult;
            players[y].goal.against =+ iResult;
            players[y].pts =  players[y].victory * 3 + players[y].draw;
            players[y].goal.difference = players[y].goal.for - players[y].goal.against;
           
        }else{
  
            document.querySelector(`.${players[i].name}${players[i].id}vs${players[y].id}${players[y].name}`).innerHTML = `<p>${players[y].name} <br>${iResult} - ${yResult}<p>`;
            document.querySelector(`.${players[y].name}${players[y].id}vs${players[i].id}${players[i].name}`).innerHTML = `<p>${players[y].name} <br>${yResult} - ${iResult}</p>`;
            
            players[i].loose += 1;
            players[i].pts =  players[i].victory * 3 + players[i].draw;
            players[i].goal.for =+ iResult;
            players[i].goal.against =+ yResult;
            players[i].goal.difference = players[i].goal.for - players[i].goal.against;
            
            players[y].victory += 1;
            players[y].goal.for =+ yResult;
            players[y].goal.against =+ iResult;
            players[y].pts =  players[y].victory * 3 + players[y].draw;
            players[y].goal.difference = players[y].goal.for - players[y].goal.against;
           
           
         
        }
        table();
        closeModal();
        
    })
   
 }

 function updateScore(team, iResult, yResult){
    players[team].pts = players[team].victory * 3 + players[team].draw;
    players[team].goal.for =+ iResult;
    players[team].goal.against =+ yResult;
    players[team].goal.difference = players[team].goal.for - players[team].goal.against;
 }
   
 function removeMatchScore(i,y){
    
    for(x = 1; x < matches.length; x++){
        let goali, goaly;
        
        
        if(matches[x].id === i.toString() + y.toString()){
            
            goali = matches[x].score.team1;
            goaly = matches[x].score.team2;
            console.log("test3: " + matches[x].id + ", " + matches[x].score.team1 + " " + matches[x].score.team2)
       
            
            if(goali === goaly){
                players[y].draw -= 1;
                players[i].draw -= 1;
                players[i].goal.for -= goali;
                players[i].goal.against -= goaly;
                players[y].goal.for -= goaly;
                players[y].goal.against -= goaly;
                players[y].pts = players[y].victory * 3 + players[y].draw;
                players[i].pts = players[i].victory * 3 + players[i].draw;
                
            }
            if(goali > goaly){
                players[y].loose -= 1;
                players[i].victory -= 1;
                players[i].goal.for -= goali;
                players[i].goal.against -= goaly;
                players[y].goal.for -= goaly;
                players[y].goal.against -= goaly;
                players[y].pts = players[y].victory * 3 + players[y].draw;
                players[i].pts = players[i].victory * 3 + players[i].draw;
            }
           
        }
        



    }
    table();
    
 }
  
 function table(){
  
    
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
        // let pts = (players[i].victory * 3) + players[i].draw;
      
       
           
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
  
  
 function printAllMatches(){
    for(i= 0; i < matches.length; i++){
        console.log(matches[i]);
    }
}