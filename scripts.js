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
                        console.log("click : " +  newMatchToPlay)
                        showModal(players[i].seed, players[y].seed)
                        // matchScore(players[i].seed, players[y].seed);
                          
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
     let nameI, nameY, idI, idY;
    for(z = 0; z < players.length; z++){
         if(players[z].seed === i){
            nameI = players[z].name;  
            idI = players[z].id;
         }
         if(players[z].seed === y){
            nameY = players[z].name;
            idY = players[z].id;
         }
     }

     console.log("showModal: \nnameI : " + nameI + "\nnamey : " + nameY +"\nidi : " + idI +"\nidY : " + idY )
    document.querySelector(".modal").innerHTML =
                 
    ` <div class="matchModal">
         <div>
             <p>${nameI}
             <input id="score${idI}" type="number" value="0" min = "0"/>
         </div>
         <div>
             vs
         </div>
         <div>
             <p>${nameY}
             <input id="score${idY}" type="number" value="0" min = "0"/>
         </div>
         <button>ok</button><button id="modalDelete">X</button>
     </div>
 `
 ;

     matchScore(idI, idY);


 document.getElementById("modalDelete").addEventListener("click", e=>{
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
    let IDi, IDy;
    for(z = 0; z < players.length; z++){
        console.log(z)
        if(players[z].seed === i){
            IDi = players[z].id;   
        }
        if(players[z].seed === y){
            IDy = players[z].id;
        }
    }
    
    document.getElementById("showModalChangeYes").addEventListener("click", e=>{
        removeMatchScore(i,y);
        showModal(i, y);
        matchScore(i, y);
    })
    document.getElementById("showModalChangeNo").addEventListener("click", e=>{
        closeModal();
    })
    document.getElementById("showModalChangeDelete").addEventListener("click", e=>{
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
       
        for(x = 0; x < matches.length; x++){
            
            if(matches[x].id === `${i}${y}`){
                
                let team1 = matches[x].score.team1;
                let team2 = matches[x].score.team2;
                for(z = 0; z < players.length; z++){
                  
                    if(players[z].seed === i){
                        teami = players[z].id ;
                    }
                    if(players[z].seed === y){
                        teamy = players[z].id;
                    }
                }

                if(team1 === team2){
                    
                    players[IDi].draw -=1;
                    players[IDi].goal.for -= team1;
                    players[IDi].goal.against -= team2;
                    players[IDi].pts = players[IDi].victory * 3 + players[IDi].draw;
                    players[IDi].goal.difference = players[IDi].goal.for - players[IDi].goal.against;
                    
                    players[IDy].draw -=1;
                    players[IDy].goal.for -= team2;
                    players[IDy].goal.against -= team1;
                    players[IDy].pts = players[IDy].victory * 3 + players[IDy].draw;
                    players[IDy].goal.difference = players[IDy].goal.for - players[IDy].goal.against;
                    
                    
                }else if(team1 > team2){
                   
                    players[teami].victory -=1;
                    players[teami].goal.for -= team1;
                    players[teami].goal.against -= team2;
                    players[teami].pts = players[i].victory * 3 + players[i].draw;
                    players[teami].goal.difference = players[i].goal.for - players[i].goal.against;
                    
                    players[teamy].loose -=1;
                    players[teamy].goal.for -= team2;
                    players[teamy].goal.against -= team1;
                    players[teamy].pts = players[y].victory * 3 + players[y].draw;
                    players[teamy].goal.difference = players[y].goal.for - players[y].goal.against;

                }else{

                    players[teami].loose -=1;
                    players[teami].goal.for -= team1;
                    players[teami].goal.against -= team2;
                    players[teami].pts = players[i].victory * 3 + players[i].draw;
                    players[teami].goal.difference = players[i].goal.for - players[i].goal.against;
                    
                    players[teamy].victory -=1;
                    players[teamy].goal.for -= team2;
                    players[teamy].goal.against -= team1;
                    players[teamy].pts = players[y].victory * 3 + players[y].draw;
                    players[teamy].goal.difference = players[y].goal.for - players[y].goal.against;

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
    
    console.log("matchScore : " + i + " " + y);
    document.querySelector(".matchModal button").addEventListener("click", e => {
        let iResult, yResult;
        
  
                iResult = document.getElementById(`score${players[i].id}`).value;
                yResult = document.getElementById(`score${players[y].id}`).value;
                if(iResult === null){
                    iResult = 0;
                }
                if(yResult === null){
                    yResult = 0;
                }

                console.log(players[i].name + " " +  iResult + "\n" + players[y].name + " " +  yResult);
                

            
            if(iResult > yResult){
                players[i].victory += 1;
                players[i].pts = (players[i].victory * 3) + players[i].draw;
            }
        
    
        // for(let x=0; x < matches.length; x++){
        //     if(matches[x].id === `${i}${y}`){
        //         matches[x].score.team1 = iResult;
        //         matches[x].score.team2 = yResult;

               
        //     }
        //     if(matches[x].id === `${i}${y}`){
        //         matches[x].score.team1 = yResult;
        //         matches[x].score.team2 = iResult;
       
        //     }
        // }
  
        // if(iResult === yResult){
        //     document.querySelector(`.${players[i].name}${players[i].seed}vs${players[y].seed}${players[y].name}`).innerHTML = `<p>Draw <br>${iResult} - ${yResult}<p>`;
        //     document.querySelector(`.${players[y].name}${players[y].id}vs${players[i].id}${players[i].name}`).innerHTML = `<p>Draw <br>${yResult} - ${iResult}</p>`;
            
        //     for(z = 0; z < players.length; z++){
        //         if(players[z].seed === i ){
                    
        //             players[z].draw = parseInt(players[z].draw) + 1;
        //             players[z].pts = parseInt(players[z].victory) * 3 + parseInt(players[z].draw);
        //             players[z].goal.for = parseInt(players[z].goal.for) + parseInt(iResult);
        //             players[z].goal.against = parseInt(players[z].goal.against) + parseInt(yResult);
        //             players[z].goal.difference = players[i].goal.for - players[i].goal.against;
        //         }
        //         if(players[z].seed === y){

        //             players[z].draw = parseInt(players[z].draw) + 1;
        //             players[z].pts = parseInt(players[z].victory) * 3 + parseInt(players[z].draw);
        //             players[z].goal.for = parseInt(players[z].goal.for) + parseInt(yResult);
        //             players[z].goal.against = parseInt(players[z].goal.against) + parseInt(iResult);
        //             players[z].goal.difference = players[y].goal.for - players[y].goal.against;
                 
        //         }
        //     }
            
           
  
        // }else if(iResult > yResult){
  
        //     document.querySelector(`.${players[i].name}${players[i].seed}vs${players[y].seed}${players[y].name}`).innerHTML = `<p>${players[i].name} <br>${iResult} - ${yResult}<p>`;
        //     document.querySelector(`.${players[y].name}${players[y].seed}vs${players[i].seed}${players[i].name}`).innerHTML = `<p>${players[i].name} <br>${yResult} - ${iResult}</p>`;
            
        //     for( let z = 0; z < players.length; z++){
        //         if(players[z].seed === y ){
        //             console.log(players[z].goal.for + " " + iResult)
        //             players[z].loose =+ 1;
        //             players[z].pts = parseInt(players[z].victory) * 3 + parseInt(players[z].draw);
        //             players[z].goal.for = parseInt(players[z].goal.for) + parseInt(yResult);
        //             players[z].goal.against = parseInt(players[z].goal.against) + parseInt(iResult);
        //             players[z].goal.difference = players[i].goal.for - players[i].goal.against;
                   
        //         }
        //         if(players[z].seed === i ){
        //             console.log(players[z].goal.for + " " + yResult)
        //             players[z].victory =+ 1;
        //             players[z].pts = parseInt(players[z].victory) * 3 + parseInt(players[z].draw);
        //             players[z].goal.for = parseInt(players[z].goal.for) + parseInt(iResult);
        //             players[z].goal.against = parseInt(players[z].goal.against) + parseInt(yResult);
        //             players[z].goal.difference = players[y].goal.for - players[y].goal.against;
        //         }
        //     }
            
           
        // }else if(iResult < yResult){
  
        //     document.querySelector(`.${players[i].name}${players[i].seed}vs${players[y].seed}${players[y].name}`).innerHTML = `<p>${players[y].name} <br>${iResult} - ${yResult}<p>`;
        //     document.querySelector(`.${players[y].name}${players[y].seed}vs${players[i].seed}${players[i].name}`).innerHTML = `<p>${players[y].name} <br>${yResult} - ${iResult}</p>`;
        //     for( let z = 0; z < players.length; z++){
        //         if(players[z].seed === i ){
        //             console.log(players[z].goal.for + " " + iResult)
        //             players[z].loose = parseInt(players[z].loose) + 1;
        //             players[z].pts = parseInt(players[z].victory) * 3 + parseInt(players[z].draw);                    players[z].goal.for = parseInt(players[z].goal.for) + parseInt(iResult);
        //             players[z].goal.against = parseInt(players[z].goal.against) + parseInt(yResult);
        //             players[z].goal.difference = players[i].goal.for - players[i].goal.against;
        //         }
         
        //         if(players[z].seed === y ){
        //             console.log(players[z].goal.for + " " + yResult)
        //             players[z].victory = parseInt(players[z].victory) + 1;;
        //             players[z].pts = parseInt(players[z].victory) * 3 + parseInt(players[z].draw);
        //             players[z].goal.for = parseInt(players[z].goal.for) + parseInt(yResult);
        //             players[z].goal.against = parseInt(players[z].goal.against) + parseInt(iResult);
        //             players[z].goal.difference = players[y].goal.for - players[y].goal.against;
        //         }
        //     }
           
           
         
        // }
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