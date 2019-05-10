let canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let canvasContext = canvas.getContext("2d");

let bird = new Image();
bird.src = "img/bird.png";

let background = new Image();
background.src = "images/backg.png";

let floor = new Image();
floor.src = "img/f.png";

let pipeTop = new Image();
pipeTop.src = "images/pipeB.png";

let pipeD = new Image();
pipeD.src = "images/pipeT.png";

let playAgain = document.createElement('span');
playAgain.className = "playAgain";

let fly = new Audio();
fly.src = "sounds/fly.mp3";

let scor = new Audio();
scor.src = "sounds/score.mp3";

let gap = 200;
let constant;
let birdX = 200;
let birdY = 150;
let gravity = 4;
let score = 0;

document.addEventListener("keydown", function(e){
    if (e.keyCode == "32") {
        bird.src = "img/birdUp.png";
        birdY -= 60;  
        fly.play();
    };
});
document.addEventListener("keyup", function(e){
    bird.src = "img/bird.png";
});

let pipe = [];
pipe[0] = {
    x : window.innerWidth,
    y : 0
};

(function draw(){
    canvasContext.drawImage(background, 0, 0, window.innerWidth, window.innerHeight);

    for(let i = 0; i < pipe.length; i++){    
        constant = pipeTop.height + gap;
        canvasContext.drawImage(pipeTop, pipe[i].x , pipe[i].y);
        canvasContext.drawImage(pipeD, pipe[i].x , pipe[i].y + constant);     
        pipe[i].x -= 7;

        if( pipe[i].x == 600 ){
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random() * pipeTop.height) - pipeTop.height
            }); 
        };
        
        if( birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + pipeTop.width && (birdY <= pipe[i].y + pipeTop.height || birdY + bird.height >= pipe[i].y + constant) || birdY + bird.height >= canvas.height - 15){
            location.replace("playAgain.html");
        };

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }; 
    };

    canvasContext.drawImage(floor, 0,canvas.height - 15);    
    canvasContext.drawImage(bird, birdX, birdY);
    birdY += gravity;
    
    canvasContext.fillStyle = "#000";
    canvasContext.font = "20px Verdana";
    canvasContext.fillText("Score : " + score, 10,50);
    
    requestAnimationFrame(draw,);      
})();
























