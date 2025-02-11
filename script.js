let body = document.querySelector("body");
let birdsBox = document.querySelector(".birdsCallHere");
const gunSound = new Audio("assets/sound/pubg-kar98k-45335.mp3");

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

let num = 1;
let gameRunning = true;

function numPlusPlus(){
    return num++;
}

function randomNumber(to,from){
    return Math.floor(Math.random() * (to-from) + from);
}

function stopGame() {
    gameRunning = false;
    alert("Game Over! Birds escaped.");
    location.reload();
}

setInterval(()=>{

    if (!gameRunning) return;

    let div = document.createElement("div");



    let input = document.createElement("input");
    input.type = "checkbox";
    input.id = `bird${num}`;
    input.classList.add("bird");
    // input.style.animation = `flyBird${num} 10s linear alternate`;


    let label = document.createElement("label");
    label.setAttribute("for" , `bird${num}`);
    label.classList.add("bird-label");
    label.style.animation = `flyBird${num} 10s linear`;


    let keyframe = `
        @keyframes flyBird${num} {
            0%{ top : ${randomNumber(80,10)}%; right : -10%}
            25%{ top : ${randomNumber(80,10)}%; right : 25%}
            50%{ top : ${randomNumber(80,10)}%; right : 50%}
            75%{ top : ${randomNumber(80,10)}%; right : 75%}
            100%{ top : ${randomNumber(80,10)}%; right : 110%}
        }
    `;

    let styleSheet = document.styleSheets[0];
    styleSheet.insertRule(keyframe, styleSheet.cssRules.length);


    div.append(input);
    div.append(label);
    birdsBox.append(div);



    setTimeout(() => {
        let computedStyle = window.getComputedStyle(label);
        let birdRight = parseInt(computedStyle.right);

        if (birdRight >= window.innerWidth) {
            stopGame();
        }
    }, 10000);

    numPlusPlus();
},3000); // every 3sec



birdsBox.addEventListener("click", (event) => {
    if (event.target.classList.contains("bird-label")) {
        let label = event.target;
        let input = label.previousElementSibling;
        input.checked = true;

        label.style.animation = "none";

        label.style.backgroundImage = "url('assets/img/dieEffect.png')";

        setTimeout(() => {
            label.parentElement.classList.add("finished");
        }, 1500);
    }
});
