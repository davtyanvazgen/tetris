let board = document.getElementsByClassName("board")[0];
let nextBoard = document.getElementsByClassName("next")[0];
let row = document.getElementsByClassName("row");
let colors = ["purple", "red", "orange", "blue", "yellow", "green"];
let bottom = [ 170, 171, 172, 173, 174, 175, 176, 177, 178, 179 ];
let posision = "1";
let counter = 0;
let block;
let score = 0;
let speed = 800;
let level = 1;
let currentShape;
let currentObj = {};
let nextShape;
let nextObj = {};
let pause = true;
let gameover = true
let J = {
    name: "J",
    posisions: {
      "1": [4, 14, 15, 16],  "2": [5, 6, 15, 25], 
      "3": [14, 15, 16, 26], "4": [5, 15, 24, 25] 
    } 
};

let L = {
    name: "L",
    posisions: {
        "1": [6, 14, 15, 16], "2": [5, 15, 25, 26],
        "3": [14, 15, 16,24], "4": [4, 5, 15, 25]
    }
};

let T = {
    name: "T",
    posisions: {
        "1": [5, 14, 15, 16],  "2": [5, 15, 16, 25],
        "3": [14, 15, 16, 25], "4": [5, 14, 15, 25]
    }
};

let Z = {
    name: "Z",
    posisions: {
        "1": [4, 5, 15, 16], "2": [5, 14, 15, 24]
    }
};

let S = {
    name: "S",
    posisions: {
        "1": [5, 6, 14, 15], "2": [4, 14, 15, 25],
    }
};

let I = {
    name: "I",
    posisions: {
        "1": [5, 15, 25, 35], "2": [14, 15, 16, 17],
        "3": [5, 15, 25, 35], "4": [13, 14, 15, 16]
    }
};

let O = {
    name: "O",
    posisions: { "1": [4, 5, 14, 15] }
};
let getShape = [J, L, S, Z, I, T, O];
document.onkeydown = (e) => {
    if (e.keyCode == '40') { 
        moveDown();   
    }
    else if (e.keyCode == '37') { 
        moveLeft();
    }
    else if (e.keyCode == '39') {
        moveRight()
    }
    else if(e.keyCode == '38'){
        rotate()
    }
    else if(e.keyCode == '32'){
        stop(); 
    }
}

function stop(){
    if(pause==true){
        clearInterval(play);
        pause = false;
        document.getElementById("pause").style.color = "rgba(255, 0, 0, 0.712)";      
    }else if(pause==false){
        play = setInterval(moveDown, speed)
        pause = true;
        document.getElementById("pause").style.color = "yellowgreen"
    }
}
document.getElementById("pause").addEventListener("click",stop)
//////////////////////////////////// Move ////////////////////////////////////////
function moveLeft() {
    let checkLeft = () => {
        for(let i = 0; i < bottom.length; i++) {
            for(let j = 0; j < currentShape.length; j++) {
                if(bottom[i] == currentShape[j]-1){
                    return true
                }
            }    
        }
    }
    if(!checkLeft() && pause && gameover){
        let $0 = Number(currentShape[0].toString().slice(-1));
        let $1 = Number(currentShape[1].toString().slice(-1));
        let $2 = Number(currentShape[2].toString().slice(-1));
        let $3 = Number(currentShape[3].toString().slice(-1))
        if($0 !== 0 && $1 !== 0 && $2 !== 0 && $3 !== 0){
            clearShape(createdShape)
        }else{
            return false
        }
        let allPosisions = currentObj.posisions;
        for(let key in allPosisions){
                for(let i = 0; i < allPosisions[key].length; i++){
                    allPosisions[key][i]--
            }
        }
        drowShape(currentShape);
    }
}

function moveRight() {
    let checkRight = () => {
        for(let i = 0; i < bottom.length; i++) {
            for(let j = 0; j < currentShape.length; j++) {
                if(bottom[i] == currentShape[j]+1){
                    return true
                }
            }    
        }
    }
    if(!checkRight() && pause && gameover) {
        let $0 = Number(currentShape[0].toString().slice(-1));
        let $1 = Number(currentShape[1].toString().slice(-1));
        let $2 = Number(currentShape[2].toString().slice(-1));
        let $3 = Number(currentShape[3].toString().slice(-1))
        if($0 !== 9 && $1 !== 9 && $2 !== 9 && $3 !== 9){
            clearShape(createdShape)
        }else{
            return false
        }
        let allPosisions = currentObj.posisions;
        for(let key in allPosisions){
                for(let i = 0; i < allPosisions[key].length; i++){
                    allPosisions[key][i]++
            }
        }
        drowShape(currentShape);
    }    
}

function moveDown() {
    if(checkBottom() === 0 && pause && gameover) {
       clearShape(createdShape)
       let allPosisions = currentObj.posisions;
       for(let key in allPosisions){
            for(let i = 0; i < allPosisions[key].length; i++){
                allPosisions[key][i] +=10
            }
        }
       drowShape(currentShape);
   } else {
       if(pause){
        changePosisionsColor()
        currentShape = [];
        currentObj = nextObj;
        currentShape = nextObj.posisions[1]// nextShape;
        drowShape(currentShape);
        createNextShape();
        gameOver();
        posision = "1";
        clearLine()
        return false
       }  
   } 
}

function gameOver(){
    let gameOver;
    for(let i = 0; i < bottom.length; i++){
        for(let j = 0; j < currentShape.length; j++){
            if(bottom[i] === currentShape[j]){
                gameOver = true
            }
        }
    }
    if(gameOver){
        gameover = false
        for(let i = 0; i < block.length; i++){
            block[i].style.backgroundColor = "yellowgreen"
        }
        for(let i = 0; i < bottom.length; i++){
            block[bottom[i]].style.backgroundColor = "rgba(255, 0, 0, 0.712)"
        }
        currentShape = [];
        document.getElementById("score").style.color = "red"
        document.getElementById("score").innerHTML = "Game Over. Score: " + score;
        clearInterval(play)
    }
}

function changePosisionsColor (){
    for(let i = 0; i < bottom.length; i++){
        block[bottom[i]].style.backgroundColor = "gray"
    }
}

let checkBottom = () => {
    let $0 = currentShape[0];
    let $1 = currentShape[1];
    let $2 = currentShape[2];
    let $3 = currentShape[3];
    let check = 0;
    for(let i = 0; i < bottom.length; i++) {
        for(let j = 0; j < currentShape.length; j++) {
            if(bottom[i] == currentShape[j] + 10){
                check++
            }
        }    
    }
    if(check > 0){
        bottom.push($0);
        bottom.push($1);
        bottom.push($2);
        bottom.push($3);
    }
    bottom.sort(function(a, b){return a - b})
    return check
}

function clearLine() {
    for(let i = 0; i < row.length-1; i++){
        let blockColor = row[i].childNodes
        if(
            blockColor[0].style.backgroundColor == "gray" && 
            blockColor[1].style.backgroundColor == "gray" &&
            blockColor[2].style.backgroundColor == "gray" && 
            blockColor[3].style.backgroundColor == "gray" &&
            blockColor[4].style.backgroundColor == "gray" && 
            blockColor[5].style.backgroundColor == "gray" &&
            blockColor[6].style.backgroundColor == "gray" && 
            blockColor[7].style.backgroundColor == "gray" &&
            blockColor[8].style.backgroundColor == "gray" && 
            blockColor[9].style.backgroundColor == "gray"      
        ){ 
            let to = Number(row[i].dataset.row + 0)            
            for(let b = 0; b < 10; b++){
                let index = Number(row[i].childNodes[b].dataset.index);
                row[i].childNodes[b].style.backgroundColor = "";      
                bottom = bottom.filter(function(item) { 
                return item !== index }); 
            }
            for(let n = 0; n < bottom.length; n++){
                if(bottom[n] < to){
                    block[bottom[n]].style.backgroundColor = ""
                    bottom[n] += 10;
                    changePosisionsColor()
                }
            }
            score += 15;
            document.getElementById("score").innerHTML = "Level:" + level + " Score:" + score;
            if(score === 300){
                clearInterval(play);
                level = 2;
                document.getElementById("score").innerHTML = "Level:" + level + " Score:" + score;
                speed = speed-300
                play = setInterval(moveDown, speed)
            }else if(score === 600) {
                clearInterval(play);
                level = 3;
                speed = speed-250
                document.getElementById("score").innerHTML = "Level:" + level + " Score:" + score;
                play = setInterval(moveDown, speed)
            }
        }
    }
}

// function clearLine(){
//     let count = 0;
//     for(let i = 0; i < row.length-1; i++){
//         for(let j = 0; j < 10; j++){
//             let blockColor = row[i].childNodes[j].style.backgroundColor;
//             if(blockColor == "gray"){
//                 count++;
//                 if(count === 10){
//                     let to = Number(row[i].dataset.row + 0)
//                     // console.log(to)
//                     let index;
//                     for(let b = 0; b < 10; b++){
//                         index = Number(row[i].childNodes[b].dataset.index);
//                         row[i].childNodes[b].style.backgroundColor = "";      
//                         bottom = bottom.filter(function(item) { 
//                         return item !== index }); 
//                     }
//                     // console.log(to)
//                     for(let n = 0; n < bottom.length; n++){
//                         if(bottom[n] < to){
//                             block[bottom[n]].style.backgroundColor = ""
//                             bottom[n] += 10;
//                             changePosisionsColor()
//                         }
//                     }
//                     // console.log(bottom)
//                     count = 0;
//                 }                           
//             } else { count = 0; }
//         }  
//     }
// }


// function clearLine(){
//     let count = 0;
    
//     for(let i = 0; i < row.length-1; i++){
//         for(let j = 0; j < 10; j++){
//             let blockColor = row[i].childNodes[j].style.backgroundColor;
//             if(blockColor == "gray"){
//                 count++;
//                 if(count === 10){
//                     let downTo = Number(row[i].childNodes[j].dataset.index) + 1;
//                     alert(row[i].childNodes[j].dataset.index)
//                     let index;
//                     for(let b = 0; b < 10; b++){
//                         index = Number(row[i].childNodes[b].dataset.index)
//                         row[i].childNodes[b].style.backgroundColor = ""
                        
//                         bottom = bottom.filter(function(item) { 
//                         return item !== index });
//                     }
//                     count = 0;
                    
//                     for(let i = 0; i < bottom.length; i++){
//                         if(bottom[i] < downTo){
//                             block[bottom[i]].style.backgroundColor = ""
//                             bottom[i] += 10
//                             changePosisionsColor()
//                         }
//                     }
                    
//                     console.log(downTo)
//                     downTo = ""
//                 } 
//             }else{
//                 count = 0;
                
//             }
//         }
//     }
     
// }


//////////////////////////////////////////////  Rotate all shapes/////////////////////////////////////////



function rotate() {
    let check = canRotateTLJ();
    // Rotate Z S
    if(pause && gameover){
    if( (currentObj.name === "Z" || currentObj.name === "S") && canRotateZS() ){
        if(posision === "1"){
            let $0 = currentObj.posisions['2'][0];
            let $1 = currentObj.posisions['2'][1];
            let $2 = currentObj.posisions['2'][2];
            let $3 = currentObj.posisions['2'][3];
            for(let i = 0; i < bottom.length; i++){
                if(bottom[i] === $0 || bottom[i] === $1 || bottom[i] === $2 || bottom[i] === $3){
                    return false
                } 
            }
            clearShape(currentShape);
            currentShape = currentObj.posisions['2'];
            drowShape(currentShape)
            posision = "2"  
        } else if(posision === "2") {
            let $0 = currentObj.posisions['1'][0];
            let $1 = currentObj.posisions['1'][1];
            let $2 = currentObj.posisions['1'][2];
            let $3 = currentObj.posisions['1'][3];
            for(let i = 0; i < bottom.length; i++){
                if(bottom[i] === $0 || bottom[i] === $1 || bottom[i] === $2 || bottom[i] === $3){
                    return false
                } 
            }
            clearShape(currentShape);
            currentShape = currentObj.posisions['1'];
            drowShape(currentShape)
            posision = "1";
       } 
    }  
    // Rotate T L J
    else if(( currentObj.name === "L" || currentObj.name === "J" || currentObj.name === "T" ) && check !== 3){
        if(posision === "1"){
            let $0 = currentObj.posisions['2'][0];
            let $1 = currentObj.posisions['2'][1];
            let $2 = currentObj.posisions['2'][2];
            let $3 = currentObj.posisions['2'][3];
            for(let i = 0; i < bottom.length; i++){
                if(bottom[i] === $0 || bottom[i] === $1 || bottom[i] === $2 || bottom[i] === $3){
                    return false
                } 
            }
            clearShape(currentShape);
            currentShape = currentObj.posisions['2'];
            drowShape(currentShape)
            return posision = "2"  
        } else if(posision === "2") {
            let $0 = currentObj.posisions['3'][0];
            let $1 = currentObj.posisions['3'][1];
            let $2 = currentObj.posisions['3'][2];
            let $3 = currentObj.posisions['3'][3];
            for(let i = 0; i < bottom.length; i++){
                if(bottom[i] === $0 || bottom[i] === $1 || bottom[i] === $2 || bottom[i] === $3){
                    return false
                } 
            }
            clearShape(currentShape);
            currentShape = currentObj.posisions['3'];
            drowShape(currentShape)
            return posision = "3";
        } else if(posision === "3") {
            let $0 = currentObj.posisions['4'][0];
            let $1 = currentObj.posisions['4'][1];
            let $2 = currentObj.posisions['4'][2];
            let $3 = currentObj.posisions['4'][3];
            for(let i = 0; i < bottom.length; i++){
                if(bottom[i] === $0 || bottom[i] === $1 || bottom[i] === $2 || bottom[i] === $3){
                    return false
                } 
            }
            clearShape(currentShape);
            currentShape = currentObj.posisions['4'];
            drowShape(currentShape)
            return posision = "4";
        } else if(posision === "4") {
            let $0 = currentObj.posisions['1'][0];
            let $1 = currentObj.posisions['1'][1];
            let $2 = currentObj.posisions['1'][2];
            let $3 = currentObj.posisions['1'][3];
            for(let i = 0; i < bottom.length; i++){
                if(bottom[i] === $0 || bottom[i] === $1 || bottom[i] === $2 || bottom[i] === $3){
                    return false
                } 
            }
            clearShape(currentShape);
            currentShape = currentObj.posisions['1'];
            drowShape(currentShape)
            return posision = "1";
        } 
   } 
   // Rotate I
   else if(currentObj.name === "I"){    
        if(posision === "1" && canRotateI() && changePosisionI() !== "8888"){
            let $0 = currentObj.posisions['2'][0];
            let $1 = currentObj.posisions['2'][1];
            let $2 = currentObj.posisions['2'][2];
            let $3 = currentObj.posisions['2'][3];
            for(let i = 0; i < bottom.length; i++){
                if(bottom[i] === $0 || bottom[i] === $1 || bottom[i] === $2 || bottom[i] === $3){
                    return false
                } 
            }
            clearShape(currentShape);
            currentShape = currentObj.posisions['2'];
            drowShape(currentShape)
            return posision = "2"  
        } else if(posision === "2" && canRotateI() && changePosisionI() !== "8888") {
            let $0 = currentObj.posisions['1'][0];
            let $1 = currentObj.posisions['1'][1];
            let $2 = currentObj.posisions['1'][2];
            let $3 = currentObj.posisions['1'][3];
            for(let i = 0; i < bottom.length; i++){
                if(bottom[i] === $0 || bottom[i] === $1 || bottom[i] === $2 || bottom[i] === $3){
                    return false
                } 
            }
            clearShape(currentShape);
            currentShape = currentObj.posisions['1'];
            drowShape(currentShape)
            return posision = "1";
        } else if(posision === "1" && canRotateI() && changePosisionI() === "8888") {
            let $0 = currentObj.posisions['4'][0];
            let $1 = currentObj.posisions['4'][1];
            let $2 = currentObj.posisions['4'][2];
            let $3 = currentObj.posisions['4'][3];
            for(let i = 0; i < bottom.length; i++){
                if(bottom[i] === $0 || bottom[i] === $1 || bottom[i] === $2 || bottom[i] === $3){
                    return false
                } 
            }
            clearShape(currentShape);
            currentShape = currentObj.posisions['4'];
            drowShape(currentShape);
            return posision = "2"  
        }
   }  
   else { return false }
 }
}
// can T L J
function canRotateTLJ(){
    let can = 0;
    for(let i = 0; i < currentShape.length; i++){
        let num = currentShape[i];
        if(num.toString().slice(-1) === "9" || num.toString().slice(-1) === "0"){
            can++;
        } 
    } return can
}
// can Z S
function canRotateZS(){
    let can = "";
    for(let i = 0; i < currentShape.length; i++){
        let num = currentShape[i];
        if(num.toString().slice(-1) === "9" || num.toString().slice(-1) === "0"){
            can += num.toString().slice(-1);  
        }
    }
    if(can === "99" || can === "00"){
        return false
    }else{ return true }
}
// can I
function changePosisionI() {
    let can = "";
    for(let i = 0; i < currentShape.length; i++){
        let num = currentShape[i];
        let check = num.toString().slice(-1);
        can += num.toString().slice(-1);     
    } return can
}
function canRotateI() {
    let can = "";
    for(let i = 0; i < currentShape.length; i++){
        let num = currentShape[i];
        if(num.toString().slice(-1) === "9" || num.toString().slice(-1) === "0"){
            can += num.toString().slice(-1);  
        }
    }
    if(can === "9999" || can === "0000"){
        return false
    }else{ return true }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function miniBoard(width, height){
    let counter = 4;
    for(let i = 0; i < height; i++){
        let miniRow = document.createElement("div");
        miniRow.className = "miniRow";
        for(let j = 0; j < width; j++){
            let miniBlock = document.createElement("div");
            miniBlock.className = "miniBlock";
            miniBlock.dataset.b = counter;
            // miniBlock.innerHTML = counter;
            miniRow.appendChild(miniBlock);
            counter++;
            if(counter == 7 || counter == 17){
                counter += 7
            }
            if(counter == 7 || counter == 17){
                counter += 7
            }
        }   
    nextBoard.appendChild(miniRow);
    }      
}
miniBoard(3, 3);

let miniblock = document.querySelectorAll('[data-b]');

function createNextShape() {
    if(gameover){
        let random = Math.floor(Math.random() * 7);
        let objForCloning = getShape[random]
        nextObj = JSON.parse(JSON.stringify(objForCloning));
        nextShape = nextObj.posisions["1"];
    }
}
createNextShape();

function drowNextShape() {
    if(gameover){
    for(let x = 0; x < miniblock.length; x++){
        miniblock[x].style.backgroundColor = "black"
    }   
    for(let i = 0; i < miniblock.length; i++) {
        for(let j = 0; j < nextShape.length; j++){
            if(miniblock[i].dataset.b == nextShape[j].toString()){
                miniblock[i].style.backgroundColor = "yellowgreen"
            }
        }
    }
    }
}

//drow board
function drowBoard(width, height){
    this.width = width;
    this.height = height
    for (let y = 0; y < height; y++) {
        let row = document.createElement("div");
        row.className = "row";
        row.dataset.row = y;
        if(y == 17){
            row.style.display = "none";
        }
        for (let x = 0; x < width; x++) {
            let block = document.createElement("div");
            block.className = "block";
            block.dataset.index = counter;
            // block.innerHTML = counter;
            row.appendChild(block);
            counter++;
        }       
        board.appendChild(row);
    }
}
drowBoard(10, 18);

block = document.querySelectorAll('[data-index]');
//create shape
function createShape() {
    let random = Math.floor(Math.random() * 7);
    let objForCloning = getShape[random]
    currentObj = JSON.parse(JSON.stringify(objForCloning));
    currentShape = currentObj.posisions["1"];

}

//drow shape
function drowShape(createdShape) {
    this.createdShape = currentShape;
    drowNextShape()
    // document.getElementsByClassName("miniRow")[0].innerHTML = nextObj.name
    let randomColor = Math.floor(Math.random() * colors.length);    

    for(let i = 0; i < block.length; i++) {
        for(let j = 0; j < createdShape.length; j++){
            if(block[i].dataset.index == createdShape[j].toString()){
                block[i].style.backgroundColor = colors[randomColor ]
            }
        }
    }
}

//clear current shape
function clearShape(createdShape) {
    this.createdShape = currentShape
    for(let i = 0; i < block.length; i++) {
        for(let j = 0; j < createdShape.length; j++){
            if(block[i].dataset.index == createdShape[j].toString()){
                block[i].style.backgroundColor = ""
            }
        }
    }
}
/////
function startNewGame(){
    gameover = true;
    score = 0;
    clearInterval(play);
    speed = 800;
    play = setInterval(moveDown, speed);
    level = 1;
    pause = true;
    document.getElementById("pause").style.color = "yellowgreen"
    document.getElementById("score").innerHTML = "Level:" + level + " Score:" + score; 
    document.getElementById("score").style.color = "yellowgreen"
    bottom = [ 170, 171, 172, 173, 174, 175, 176, 177, 178, 179 ];
    createShape();
    drowShape(currentShape);
    for(let i = 0; i < block.length; i++){
        block[i].style.backgroundColor = ""
    } 
}
document.getElementById("start").addEventListener("click", startNewGame);
createShape();
drowShape(currentShape);
let play = setInterval(moveDown, speed);