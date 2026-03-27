// constantes de configuracao
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const BALL_RADIUS = 15;
const INITIAL_SPEED_X = 2;
const INITIAL_SPEED_Y = 5;
const INITIAL_BALL_X = 400;
const INITIAL_BALL_Y = 200;

// classe para controlar a bola
class Bola {
    constructor(x, y, speedX, speedY, radius) {
        this.x = x;
        this.y = y;
        this.speedX = speedX || 0;
        this.speedY = speedY || 0;
        this.radius = radius;
    }

    // randomiza as velocidades da bola
    randomizeSpeed() {
        this.speedX = random(-5, 5);
        this.speedY = random(-5, 5);
    }

    // exibe a bola na tela
    display() {
        fill(0, 0, 255);
        ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    }

    // move a bola
    move() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    // controla colisao com as bordas da tela
    checkBoundaryCollision() {
        // colisao com laterais direita ou esquerda
        if (this.x > width - this.radius || this.x < this.radius) {
            this.x = INITIAL_BALL_X;
            this.y = INITIAL_BALL_Y;
            this.randomizeSpeed();
        }
        // colisao com teto ou chao
        if (this.y > height - this.radius || this.y < this.radius) {
            this.speedY *= -1;
        }
    }
}

// instancia da bola
let bola = new Bola(INITIAL_BALL_X, INITIAL_BALL_Y, null, null, BALL_RADIUS);

// crie a funcao setup do p5js
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    bola.randomizeSpeed();
}

// funcao de desenho do p5js
function draw() {
    background(0);
    bola.display();
    bola.move();
    bola.checkBoundaryCollision();
}