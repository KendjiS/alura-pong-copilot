// crie variaveis para controlarmos a posicao da bola e chame as variaveis de x e y
let x = 200;
let y = 200;

// variaveis para controlar a velocidade da bola
let speedX = 5;
let speedY = 5;

// crie a funcao setup do p5js
function setup() {
    createCanvas(400, 400);
}

// funcao de desenho do p5js
function draw() {
    background(0);
    fill(255);
    ellipse(x, y, 50, 50);
    x += speedX;
    y += speedY;
}