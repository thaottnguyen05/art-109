
let canvas;
let xPos = 0;
let yPos = 0;
let easing = .5;

function setup(){
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0, 0);
    canvas.style("z-index", -2);
    // background(125);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
}

function draw(){
    clear();

    xPos = xPos + ((mouseX - xPos) * easing);
    yPos = yPos + ((mouseY - yPos) * easing);

    drawThing(xPos, yPos);
}


function drawThing(_x, _y){
    // draw petals
    fill(255); 
    for(let i = 0; i < 5; i++) { 
        let angle = TWO_PI / 5 * i; //5 petals
        let petalX = _x + cos(angle) * 10; 
        let petalY = _y + sin(angle) * 10; 
        ellipse(petalX, petalY, 20, 20); 
    }

    // draw center
    fill(253, 253, 150); // yellow center
    ellipse(_x, _y, 15, 15);
}