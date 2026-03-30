// constantes de configuracao
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;
const BALL_RADIUS = 15;
const INITIAL_SPEED_X = 2;
const INITIAL_SPEED_Y = 5;
const INITIAL_BALL_X = 400;
const INITIAL_BALL_Y = 200;
const RACKET_WIDTH = 10;
const RACKET_HEIGHT = 80;

// Crie uma classe para controlar a raquete, as raquestes sao 2 rentangulas que ficam próximo as extremidades da tela, uma de cada lado e se movem na vertical para tentar rebater a bola, se a bola passar por uma raquete, o jogador adversário ganha um ponto
class Raquete {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    // exibe a raquete na tela
    display() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }

    // move a raquete
    move(dy) {
        this.y += dy;
        // mantem a raquete dentro da tela
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > height - this.height) {
            this.y = height - this.height;
        }
    }
}


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

    // controla colisao com as raquetes
    checkRacketCollision(raquete) {
        // verifica se a bola esta na altura da raquete
        if (this.y - this.radius < raquete.y + raquete.height &&
            this.y + this.radius > raquete.y) {
            // verifica se a bola esta na posicao x da raquete
            if (this.x - this.radius < raquete.x + raquete.width &&
                this.x + this.radius > raquete.x) {
                // inverte a velocidade x da bola
                this.speedX *= -1;
            }
        }
    }
}

// instancia da bola
let bola = new Bola(INITIAL_BALL_X, INITIAL_BALL_Y, null, null, BALL_RADIUS);

// instancias das raquetes (uma para cada jogador)
let raqueteJogador = new Raquete(10, CANVAS_HEIGHT / 2 - RACKET_HEIGHT / 2, RACKET_WIDTH, RACKET_HEIGHT);
let raqueteOponente = new Raquete(CANVAS_WIDTH - RACKET_WIDTH - 10, CANVAS_HEIGHT / 2 - RACKET_HEIGHT / 2, RACKET_WIDTH, RACKET_HEIGHT);

// velocidade de movimento da raquete do oponente
let velocidadeOponente = 0;

// crie a funcao setup do p5js
function setup() {
    createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
    bola.randomizeSpeed();
}

// funcao de desenho do p5js
function draw() {
    background(0);
    
    // controla a raquete do jogador com o mouse
    raqueteJogador.y = mouseY - RACKET_HEIGHT / 2;
    // mantém a raquete dentro dos limites verticais
    if (raqueteJogador.y < 0) {
        raqueteJogador.y = 0;
    }
    if (raqueteJogador.y > height - RACKET_HEIGHT) {
        raqueteJogador.y = height - RACKET_HEIGHT;
    }
    
    // move a raquete do oponente de forma fluida, seguindo a bola
    let centroRaqueteOponente = raqueteOponente.y + RACKET_HEIGHT / 2;
    let diferenca = bola.y - centroRaqueteOponente;
    
    // acelera a raquete na direcao da bola
    if (Math.abs(diferenca) > 10) {
        velocidadeOponente = Math.sign(diferenca) * 2;
    } else {
        velocidadeOponente = 0;
    }
    
    raqueteOponente.y += velocidadeOponente;
    // mantém a raquete do oponente dentro dos limites verticais
    if (raqueteOponente.y < 0) {
        raqueteOponente.y = 0;
    }
    if (raqueteOponente.y > height - RACKET_HEIGHT) {
        raqueteOponente.y = height - RACKET_HEIGHT;
    }
    
    // exibe as raquetes
    raqueteJogador.display();
    raqueteOponente.display();
    
    // exibe e controla a bola
    bola.display();
    bola.move();
    bola.checkBoundaryCollision();
    bola.checkRacketCollision(raqueteJogador);
    bola.checkRacketCollision(raqueteOponente);
}