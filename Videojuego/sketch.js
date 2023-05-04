// Define una clase padre para todos los objetos del juego
class GameObject {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  // Metodo que dibuja el objeto en la pantalla
  draw() {
    // Este va a ser sobreescrito por las clases hijo
  }

  // Metodo que actualiza la posicion del objeto
  update() {
    // Este va a ser sobreescrito por las clases hijo
  }

  // Metodo donde el objeto choca con otros objetos
  collidesWith(other) {
    let distance = dist(this.x, this.y, other.x, other.y);
    return distance < this.size / 2 + other.size / 2;
  }
}

// Define una clase hijo para el jugador
class Player extends GameObject {
  constructor(x, y, size) {
    super(x, y, size);
    this.speed = 5;
  }

  // Sobreescribe el metodo draw del padre para dibujar un circulo para el jugador
  draw() {
    fill(255, 0, 0);
    circle(this.x, this.y, this.size);
  }

  // Controles del juego
  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }

    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    } else if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }

    // El jugador no se sale de la pantalla
    this.x = constrain(this.x, this.size / 2, width - this.size / 2);
    this.y = constrain(this.y, this.size / 2, height - this.size / 2);
  }
}

// Define una clase hijo para los enemigos
class Enemy extends GameObject {
  constructor(x, y, size) {
    super(x, y, size);
    this.speed = random(1, 3);
  }

  // Dibuja un rectangulo para el enemigo
  draw() {
    fill(0, 0, 255);
    rect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }

  // Hace que el enemigo caiga hacia abajo
  update() {
    this.y += this.speed;

    // Hace respawn del enemigo en localizaciones aleatorias
    if (this.y > height + this.size / 2) {
      this.x = random(this.size / 2, width - this.size / 2);
      this.y = random(-height / 2, -this.size / 2);
      this.speed = random(1, 3);
    }
  }
}

// Crear un array para guardar todos los objetos del juego
let objects = [];

// Crear una variable para guardar el jugador
let player;

function setup() {
  createCanvas(400, 400);

  // Crear un nuevo objeto jugador y agregarlo al array de objetos
  player = new Player(width / 2, height - 50, 30);
  objects.push(player);

  // Crea  enemigos y los agrega al array de objetos
  for (let i = 0; i < 5; i++) {
    let enemy = new Enemy(random(width), random(-height / 2, 0), 40);
    objects.push(enemy);
  }
}

function draw() {

  // fondo
  background(220);

  // actualiza todos los objetos
  for (let object of objects) {
    object.update();
    object.draw();
  }

  // Verifica si el jugador choca con un enemigo
  for (let object of objects) {
    if (object instanceof Enemy && object.collidesWith(player)) {
      noLoop();
      alert("Perdiste");
      alert ("Vuelve a intentarlo");
      location.reload();
  }
    }
  }


