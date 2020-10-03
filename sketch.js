var sword, sword_image;
var alien, alien_image;
var fruits, fruit_image1, fruit_image2, fruit_image3, fruit_image4, fruitgroup;
var r;
var score = 0;
var gamestate = "play";
var gamestate = "end";
var gameover, gameoverimg, gameoversound;

function preload() {
  sword_image = loadImage("sword.png");

  alien_image = loadAnimation("alien1.png", "alien2.png");

  fruit_image1 = loadImage("fruit1.png");
  fruit_image2 = loadImage("fruit2.png");
  fruit_image3 = loadImage("fruit3.png");
  fruit_image4 = loadImage("fruit4.png");

  gameoverimg = loadImage("gameover.png");
  gameoversound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(1200, 800);
  sword = createSprite(width / 2, height - 35, 30, 30);
  sword.addImage(sword_image);
  sword.scale = 0.75;

  gameover = createSprite(width / 2, height / 2, 400, 50);
  gameover.addImage(gameoverimg);
  gameover.visible = false;

  fruitgroup = new Group();
  enemygroup = new Group();
}

function draw() {
  if ((gamestate = "play")) {
    background("Lavender");

    sword.y = World.mouseY;
    sword.x = World.mouseX;

    if (sword.isTouching(enemygroup)) {
      gamestate = "end";
    }

    makefruits();

    makefruits2();

    enemies();

    ScoreBoard();
  }

  if (gamestate == "end") {
    textSize(25);
    fill("red");
    text("You Lose", width / 2, height / 2);
    text("Your Total Score : " + score, width / 2, height / 2 + 50);
    enemygroup.destroyEach();
    fruitgroup.destroyEach();
    fruitgroup.setVelocityXEach(0);
    enemygroup.setVelocityXEach(0);
    score = 0;
    gameover.visible = true;
    gameoversound.play();
  }

  drawSprites();
}

function makefruits() {
  if (World.frameCount % 80 === 0) {
    fruits = createSprite(1200, 200, 20, 20);
    fruits.scale = 0.2;

    r = Math.round(random(1, 4));
    if (r == 1) {
      fruits.addImage(fruit_image1);
    }
    if (r == 2) {
      fruits.addImage(fruit_image2);
    }
    if (r == 3) {
      fruits.addImage(fruit_image3);
    } else {
      fruits.addImage(fruit_image4);
    }

    fruits.y = Math.round(random(50, 340));

    fruits.velocityX = -7;
    fruits.setLifetime = 100;

    fruitgroup.add(fruits);
  }
}

function makefruits2() {
  if (World.frameCount % 80 === 0) {
    fruits = createSprite(1200, 200, 20, 20);
    fruits.scale = 0.2;

    r = Math.round(random(1, 4));
    if (r == 1) {
      fruits.addImage(fruit_image1);
    }
    if (r == 2) {
      fruits.addImage(fruit_image2);
    }
    if (r == 3) {
      fruits.addImage(fruit_image3);
    } else {
      fruits.addImage(fruit_image4);
    }

    fruits.y = Math.round(random(50, 340));

    fruits.velocityX = -7;
    fruits.setLifetime = 100;

    fruitgroup.add(fruits);
  }
}

function enemies() {
  if (World.frameCount % 160 === 0) {
    alien = createSprite(1200, 200, 20, 20);
    alien.scale = 1;
    alien.addAnimation("animation", alien_image);
    alien.y = Math.round(random(50, 340));

    alien.velocityX = -7;
    alien.setLifetime = 100;

    enemygroup.add(alien);
  }
}

function ScoreBoard() {
  textSize(20);
  fill("Brown");
  if (sword.isTouching(fruitgroup)) {
    score = score + 1;
    fruitgroup.destroyEach();
  }
  text("Score : " + score, 10, 30);
}
