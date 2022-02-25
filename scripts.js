let players = [
    {id: 0, seed: 1, name: "Lenny", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {id: 1, seed: 2, name: "Patrick", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {id: 2, seed: 3, name: "Elsa", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {id: 3, seed: 4, name: "Linus", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0},
    {id: 4, seed: 5, name: "Robert", goal:{for: 0, against:0, difference:0}, pts: 0, draw: 0, loose: 0, victory: 0, rankingPts: 0} ];

    let matches = [];



Table();



for(let i = 0; i < players.length; i++){
    document.querySelector(".col-up").innerHTML += `<div class="name" data-id="${players[i].id}"> ${players[i].name}</div>`
    document.querySelector(".row").innerHTML += `<div class="newRow${i} newRow" data-id="${players[i].id}"> <div class="name">${players[i].name}</div></div>`
    for(let y = 0; y < players.length; y++){

        if(y===i){
            document.querySelector(`.newRow${i}`).innerHTML += `<div class="square black"></div>`  
        }else{
            let matchToPlay = `match${players[i].id}${players[y].id}`
            document.querySelector(`.newRow${i}`).innerHTML += `<div class="square ${players[i].name}${players[i].id}vs${players[y].id}${players[y].name}" data-id="${matchToPlay}"></div>`
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
      
        for(let i = 0; i < players.length; i++){
            for(let y = 0; y < players.length; y++){
               let  newMatchToPlay = `match${players[i].id}${players[y].id}`;
                
                if(this.dataset.id === newMatchToPlay){

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

                    document.querySelector(".matchModal button").addEventListener("click", e => {
                    
                            
                       
                        let iResult = document.getElementById(`score${players[i].id}`).value;
                        
                        let yResult = document.getElementById(`score${players[y].id}`).value;
                        

                        if(iResult === yResult){

                            document.querySelector(`.${players[i].name}${players[i].id}vs${players[y].id}${players[y].name}`).innerHTML = `<p>Draw <br>${iResult} - ${yResult}<p>`;
                            players[i].draw  += 1;
                            players[i].pts = players[i].victory * 3 + players[i].draw;
                            players[i].goal.for =+ iResult;
                            players[i].goal.against =+ yResult;
                       
                            document.querySelector(`.${players[y].name}${players[y].id}vs${players[i].id}${players[i].name}`).innerHTML = `<p>Draw <br>${yResult} - ${iResult}</p>`;
                            players[y].draw += 1;
                            players[y].pts = players[y].victory * 3 + players[y].draw;
                            players[y].goal.for =+ yResult;
                            players[y].goal.against =+ iResult;
                            players[i].goal.difference = players[i].goal.for - players[i].goal.against;
                            players[y].goal.difference = players[y].goal.for - players[y].goal.against;
                          

                        }else if(iResult > yResult){

                            document.querySelector(`.${players[i].name}${players[i].id}vs${players[y].id}${players[y].name}`).innerHTML = `<p>${players[i].name} <br>${iResult} - ${yResult}<p>`;
                            document.querySelector(`.${players[y].name}${players[y].id}vs${players[i].id}${players[i].name}`).innerHTML = `<p>${players[i].name} <br>${yResult} - ${iResult}</p>`;
                            players[i].victory += 1;
                            players[y].defeat += 1;
                            players[i].pts =  players[i].victory * 3 + players[i].draw;
                            players[i].goal.for =+ iResult;
                            players[i].goal.against =+ yResult;
                            players[y].goal.for =+ yResult;
                            players[y].goal.against =+ iResult;

                            players[i].goal.difference = players[i].goal.for - players[i].goal.against;
                            players[y].goal.difference = players[y].goal.for - players[y].goal.against;
                            
                        }else{

                            document.querySelector(`.${players[i].name}${players[i].id}vs${players[y].id}${players[y].name}`).innerHTML = `<p>${players[y].name} <br>${iResult} - ${yResult}<p>`;
                            document.querySelector(`.${players[y].name}${players[y].id}vs${players[i].id}${players[i].name}`).innerHTML = `<p>${players[y].name} <br>${yResult} - ${iResult}</p>`;
                            players[y].victory +=1;
                            players[i].defeat +=1;
                            console.log("victory" + players[i].victory);
                            players[y].pts = players[y].victory * 3 + players[y].draw; 
                            players[y].goal.for =+ yResult;
                            players[y].goal.against =+ iResult;
                            players[i].goal.for =+ iResult;
                            players[i].goal.against =+ yResult;
                            players[i].goal.difference = players[i].goal.for - players[i].goal.against;
                            players[y].goal.difference = players[y].goal.for - players[y].goal.against;
                            
                          
                        }
                        Table();     
                        document.querySelector(".modal").innerHTML = "";
                    })
                
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



function Table(){

  
    
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
        let pts = (players[i].victory * 3) + players[i].draw;
        console.log(players[i].victory );
        
            
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



for(i=0; i < players.length; i++){
    for(y=0; y < players.length;y++){
        let player1 = players[i].id;
        let player2 = players[y].id;
        let matchId = `${player1}vs${player2}`
        let matchReturnId = `${player2}vs${player1}`
        if(player1 != player2 && (!(matches.includes(matchId)) && !(matchId.includes(matchReturnId)))){
            matches.push(matchId);
            matches.push(matchReturnId);
    }
    console.log("test: " + players[i].id);
    }
}




for(i=0; i < matches.length; i++){
    console.log("match " + matches[i]);
}