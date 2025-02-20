// Access Html Tags
let body = document.querySelector("body");
let birdsBox = document.querySelector(".birdsCallHere");
const gunSound = new Audio("assets/sound/pubg-kar98k-45335.mp3");
let score = document.querySelector(".score");
let hiSc = document.querySelector(".hiSc");


// body click on/off
body.addEventListener("click", () => {
    if(!gunSound.play()){
        return;
    }
    body.classList.add("disabled");
    document.documentElement.classList.add("waiting");
    
    gunSound.play();

    gunSound.onended = () =>{
        body.classList.remove("disabled");
        document.documentElement.classList.remove("waiting");
    };
});


// Game Logic Start Here
let num = 1;
let gameRunning = true;
let scoreVal = 0;
let highScore = hiSc.innerText;


// function to get numberwise birds
function numPlusPlus(){
    return num++;
}

// function to get random number 
function randomNumber(to,from){
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

// function to stop the game
function stopGame() {
    gameRunning = false;
    alert("Game Over! Birds escaped.");
    location.reload();
}

// function to save high score 
function saveScore(){
    if(highScore < scoreVal){
        localStorage.setItem("hiScore",scoreVal);
    }
}

// function to get High Score 
function getScore(){
    let highscore = localStorage.getItem("hiScore")
    return highscore;
}

// High Score Update after load window
window.addEventListener("load", ()=>{
    highScore = getScore();
    hiSc.innerText = highScore;
})


// Birds and Animation
setInterval(()=>{

    if (!gameRunning) return;

    let birdDir = randomNumber(2,1);

    if(birdDir == 1){
        // bird tag
        let div = document.createElement("div");
    
    
        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = `bird${num}`;
        input.classList.add("bird");
    
    
        let label = document.createElement("label");
        label.setAttribute("for" , `bird${num}`);
        label.classList.add("bird-label");
        label.classList.add("bird1");
        label.style.animation = `flyBird${num} 10s linear`;
    
    
        // genrate random keyframes for every birds
        let keyframe = `
            @keyframes flyBird${num} {
                0%{ top : ${randomNumber(80,10)}%; right : -10%}
                25%{ top : ${randomNumber(80,10)}%; right : 25%}
                50%{ top : ${randomNumber(80,10)}%; right : 50%}
                75%{ top : ${randomNumber(80,10)}%; right : 75%}
                100%{ top : ${randomNumber(80,10)}%; right : 110%}
            }
        `;
    
    
        // insert keyframes in css Stylesheet
        let styleSheet = document.styleSheets[0];
        styleSheet.insertRule(keyframe, styleSheet.cssRules.length);
    
    
        // append all created element in html
        div.append(input);
        div.append(label);
        birdsBox.append(div);

        
        // check if bird came out from screen
        setTimeout(() => {
        let computedStyle = window.getComputedStyle(label);
        let birdRight = parseInt(computedStyle.right);

        if (birdRight >= window.innerWidth) {
            stopGame();
        }
        }, 10000);


    }
    else{
        // bird tag
        let div = document.createElement("div");


        let input = document.createElement("input");
        input.type = "checkbox";
        input.id = `bird${num}`;
        input.classList.add("bird");


        let label = document.createElement("label");
        label.setAttribute("for" , `bird${num}`);
        label.classList.add("bird-label");
        label.classList.add("bird2");
        label.style.animation = `flyBird${num} 10s linear`;


        // genrate random keyframes for every birds
        let keyframe = `
            @keyframes flyBird${num} {
                0%{ top : ${randomNumber(80,10)}%; left : -10%}
                25%{ top : ${randomNumber(80,10)}%; left : 25%}
                50%{ top : ${randomNumber(80,10)}%; left : 50%}
                75%{ top : ${randomNumber(80,10)}%; left : 75%}
                100%{ top : ${randomNumber(80,10)}%; left : 110%}
            }
        `;


        // insert keyframes in css Stylesheet
        let styleSheet = document.styleSheets[0];
        styleSheet.insertRule(keyframe, styleSheet.cssRules.length);


        // append all created element in html
        div.append(input);
        div.append(label);
        birdsBox.append(div);


        // check if bird came out from screen
        setTimeout(() => {
        let computedStyle = window.getComputedStyle(label);
        let birdLeft = parseInt(computedStyle.left);

        if (birdLeft >= window.innerWidth) {
            stopGame();
        }
        }, 10000);

    }


    console.log(birdDir);
    numPlusPlus();
},5000); // every 5sec


// bird kill effect and update scores
birdsBox.addEventListener("click", (event) => {
    if (event.target.classList.contains("bird-label")) {
        let label = event.target;
        let input = label.previousElementSibling;
        input.checked = true;

        label.style.left = `${event.clientX}px`;
        label.style.top = `${event.clientY}px`;
        label.style.transform = "translate(-50%,-50%)";

        label.style.animation = "none";

        label.style.backgroundImage = "url('assets/img/dieEffect.png')";
        
        scoreVal++;
        score.innerText = scoreVal;
        saveScore();


        setTimeout(() => {
            label.parentElement.classList.add("finished");
        }, 1500);
    }
    // else{
    //     console.log("Miss");
    // }
});