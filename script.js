const selectBox = document.querySelector(".box"),
selectXbutn = selectBox.querySelector(".play1"),
selectObutn = selectBox.querySelector(".play2"),
playBoard = document.querySelector(".board"),
allbox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result"),
wonMenseger = resultBox.querySelector(".won"),
replaytButn = resultBox.querySelector("button");

window.onload = ()=>{
    for (let i = 0; i < allbox.length; i++) {
        allbox[i].setAttribute("onclick","clickedBox(this)");
    }

    selectXbutn.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    }
    selectObutn.onclick = ()=>{
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class","players active player");
    }
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else{
        playerSign = "X";
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    chooseWinner();
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000)+ 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    },randomDelayTime);
}

function bot(runBot){
    if(runBot){
    let array = [];
    playerSign = "O";
    for(let i = 0; i < allbox.length; i++){
        if(allbox[i].childElementCount == 0){
            array.push(i);
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)];
    if(array.length > 0){
        if(players.classList.contains("player")){
            playerSign = "X";
            allbox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
            players.classList.add("active");
            allbox[randomBox].setAttribute("id", playerSign);
        }else{
            allbox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
            players.classList.remove("active");
            allbox[randomBox].setAttribute("id", playerSign);
        }
        chooseWinner();
    }
    allbox[randomBox].style.pointerEvents = "none";
}
}

function getClass(idname){
    return document.querySelector(".box"+ idname).id;
}

function checkClass(val1,val2,val3,sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}

function chooseWinner(){
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)){
        runBot = false;
        bot(runBot);
        setTimeout(()=>{
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        },700);
        wonMenseger.innerHTML = `Player <p>${playerSign}</p> won!!`;
    }else{
        if(getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != ""  ){
            runBot = false;
            bot(runBot);
            setTimeout(()=>{
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            },700);
            wonMenseger.textContent = `Draw!`;
        }
    }
}

replaytButn.onclick = ()=>{
    window.location.reload();
}