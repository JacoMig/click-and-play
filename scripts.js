const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let isMouseDown = false
let hue = 0;
const particlesArray = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ballsArray = [];


const mouse = {
    x: undefined,
    y: undefined
}



window.addEventListener("resize", function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

canvas.addEventListener("click", start);
canvas.addEventListener("touchstart", start);
/* document.addEventListener("mouseup", function() {
    isMouseDown = false
});

document.addEventListener("mousemove", move); */

// the center of the circle
//var circleCenterX = mouse.x;
//var circleCenterY = mouse.y;

// the radius and angle of the circle, we start at angle 0
//var radius = 100;
//var angle = 0;
const player =  new Audio('moby.wav');



let circleOut = false;
let seek = 0
let isAudioOff = true;
function start(event){
    isMouseDown = true
    mouse.x = event.x;
    mouse.y = event.y;
    //circleCenterX = e.x;
    // circleCenterY = e.y;
   /*  for(let i = 0; i < 20; i++){
        particlesArray.push(new Particle())
    } */
    for(let i = 0; i < ballsArray.length; i++){
        if (ctx.isPointInPath(ballsArray[i].circle, event.offsetX, event.offsetY)) {
            if(isAudioOff){
                // isAudioOff = false;
                // player.currentTime = seek;
                player.play();
                // setTimeout(() => {player.pause(); seek += 2; isAudioOff = true}, 2000)    
            }
            for(let i = 0; i < 100; i++){
                particlesArray.push(new Particle())
            }
            ballsArray.splice(i,1,new Ball())
             // i--
            // ballsArray.push(new Ball())
        }
    }
}


/* function move(e){
    mouse.x = e.x;
    mouse.y = e.y;
    if(isMouseDown){
       // for(let i = 0; i < 10; i++){
       //     particlesArray.push(new Particle())
       // }
    }
    
} */

class Particle {
    constructor(){
        this.x = mouse.x;
        this.y = mouse.y;
        this.size= Math.random() * 15 + 5;
        this.speedX = Math.random() * 5 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX * 2;
        this.y += this.speedY * 2;
        if(this.size > 0.3) this.size -= 0.2
    }
    draw() {
        ctx.fillStyle='hsl('+hue+', 100%, 50%)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
    }
}

class Ball {
    constructor(){
        this.x = Math.random() * (canvas.width - 50)
        this.y = canvas.height
        this.speedY = Math.random() * 2 + 1.5
        this.speedX = Math.random() * 2 - 1
        this.circle;
        this.size =  Math.random() * 15 + 20;
    }
    update(){
        this.y -= this.speedY;
       // this.x -= Math.random() * 2 - 1;
    }
    draw(){
        this.circle = new Path2D();
        this.circle.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = 'white';
        ctx.fill(this.circle);
       
    }
}

for(let i = 0; i < 15; i++){
    ballsArray.push(new Ball())
}

function handleBalls() {
    for(let i = 0; i < ballsArray.length; i++){
        ballsArray[i].update();
        ballsArray[i].draw();
        if(ballsArray[i].y < 10){
            ballsArray.splice(i, 1, new Ball());
            // ballsArray.push(new Ball())
            // i--
        }
    }
    
} 

function handleParticles() {
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        if(particlesArray[i].size < 0.3){
            particlesArray.splice(i, 1);
            i--;
        }
    }
    if(particlesArray.length <= 0){
        player.pause();
    }
} 


// console.log(particlesArray)
function animate () {
    /* ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);  */
    
    ctx.clearRect(0,0, canvas.width, canvas.height);
    handleBalls()
    
    if(particlesArray.length > 0)
    handleParticles()
    
    hue++
    requestAnimationFrame(animate);
}

animate()