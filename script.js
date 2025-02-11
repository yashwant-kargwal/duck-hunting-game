let body = document.querySelector("body");
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

function numPlusPlus(){
    return num++;
}

setInterval(()=>{
    let div = document.createElement("div");
},200000); // every 2sec
