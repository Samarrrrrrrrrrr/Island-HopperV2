var PLAY = 1;
var END = 0;
var gameState = PLAY;
var floatyGroup, float1, float2


var score = 0;

var gameOver, restart;

function preload() {

  bg = loadImage("Images/Background-1.png")

  mcRunning = loadAnimation("Images/mcV2.1.png", "Images/mcV2.2.png", "Images/mcV2.3.png", "Images/mcV2.4.png");

  Gro = loadImage("Images/Ground.png")

  float1 = loadImage("Images/Float-2.1.png")
  float2 = loadImage("Images/Float-3.png")

  shipAni = loadImage("Images/Ship-2.1.png")


  GameOver = loadImage("Images/gameOver.png")

}

function setup() {

  createCanvas(1200, 500);

  mc = createSprite(50, 100, 20, 50);
  mc.addAnimation("running", mcRunning);
  mc.scale = 0.5

  ground = createSprite(200, 450, 400, 20);
  ground.addImage(Gro)
  ground.x = ground.width / 2;
  ground.velocityX = -(6 + 3 * score / 100);

  gameOver = createSprite(300, 100);
  gameOver.addImage(GameOver);
  gameOver.scale = 3;
  gameOver.visible = false;

  invisibleGround = createSprite(200, 450, 400, 10);
  invisibleGround.visible = false;

  floatyGroup = new Group();

  ship = createSprite(700, 150, 200, 200);
  ship.addImage(shipAni);
  ship.scale = 0.5;
  //mc.debug=true
  mc.setCollider("rectangle", 0, 0, 40, 180)
  score = 0;

}

function draw() {

  background(bg);
  textSize(35)
  stroke("white")
  text("Score: " + score, camera.position.x + 410, camera.position.y - 200);

  camera.position.x = mc.x + 300




  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -(6 + 3 * score / 100);

    if (keyDown("space") && mc.y >= 400) {
      mc.velocityY = -20;
    }

    if (mc.velocityX == 50) {
      gameOver.visible = true;
    }

    mc.velocityY = mc.velocityY + 0.8

    spawnFloaty()

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    mc.collide(invisibleGround);
    mc.collide(floatyGroup);

    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (floatyGroup.isTouching(mc)) {
      mc.setVelocity(0, 0)
      gameState = END;
    }
  }
  else if (gameState === END) {
    console.log(END)
    ground.velocityX = 0;
    mc.velocityY = 0;
    gameOver.visible = true;


    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    rand = Math.round(random(100, 200))
    rand2 = Math.round(random(20, 50))

    //if (frameCount % 50 === 0) {

      //object = new object(200, rand)
    //}


  }




  drawSprites()
}

function display() {

  ship.display()



}

function spawnFloaty() {
  if (frameCount % 60 === 0) {
    rand = Math.round(random(400))
    var floaty = createSprite(1200, rand, 10, 40);
    floaty.velocityX = -(6 + 3 * score / 100);
    //floaty.debug=true
    floaty.setCollider("rectangle", 0, 0, 320, 230)
    var rand2 = Math.round(random(1, 2));
    switch (rand2) {
      case 1: floaty.addImage(float1);
        break;
      case 2: floaty.addImage(float2);
        break;
      default: break;
    }
    floaty.scale = 0.3;
    floaty.lifetime = 1500;
    floatyGroup.add(floaty);
  }
}
