// crie variaveis para controlarmos a posicao da bola e chame as variaveis de x e y
let x = 200;
let y = 200;

// deixe as velocidades aleatorias para a bola se mover
let speedX = 2;
let speedY = 5;

// crie a funcao setup do p5js
function setup() {
    createCanvas(400, 400);
}

// funcao de desenho do p5js
function draw() {
    background(0);
    ellipse(x, y, 50, 50);
    x += speedX;
    y += speedY;

    // controle de colisao com as bordas da tela
    if (x > width - 25 || x < 25) {
        speedX *= -1;
    }
    if (y > height - 25 || y < 25) {
        speedY *= -1;
    }
}