
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0
var ground,groundImage,monkeyImage
var gameState
var PLAY  = 0;
var END = 1;
var gameOver,gameOverImage
gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("246-2465504_ground-clipart-illustration-removebg-preview.png")
  
  
  

 
}



function setup() {
  createCanvas(600,300);
  monkey = createSprite(50,230,10,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.15;
  
  invisibleGround = createSprite(300,280,600,10);
  
  invisibleGround.visible = false;
  
  ground = createSprite(300,630,600,40);
  ground.addImage(groundImage);

 ground.scale = 3;
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  

  
}


function draw() {
  background("aqua");
  
  if(gameState === PLAY){
      ground.velocityX = -3;
    invisibleGround.velocityX = -3;
  if(invisibleGround.x<0){
    invisibleGround.x = invisibleGround.width/2;
   
  }
  if(ground.x<0){
    ground.x = ground.width/2
  }
  if(keyDown("space")&&monkey.y>160){
    monkey.velocityY = -5;
   
  }
     spawnBananas();
  spawnObstacles();
 
   monkey.velocityY = monkey.velocityY + 0.2;
 
    score = score + Math.round(getFrameRate()/60);
    if(monkey.isTouching(FoodGroup)){
      FoodGroup[0].destroy();
     
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
  }
  if(gameState ===  END){
    invisibleGround.velocityX = 0;
    ground.velocityX = 0;
    
    
    textSize(15);
    fill("red");
    text("GAME OVER!!",300,100);
    text("Press R to restart",240,130);
    
    obstacleGroup.setVelocityEach(0);
    FoodGroup.setVelocityEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
    if(keyDown("r")){
      reset();
    }
  }
   monkey.collide(invisibleGround);
 
  
drawSprites();
  textSize(15);
  fill("red");
  text("score = "+ score,30,30)
  
 

}
function spawnBananas(){
  if(frameCount%60==0){
    banana = createSprite(600,20,10,10);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.y = Math.round(random(40,150));
    monkey.depth = banana.depth;
    banana.lifetime = 200;
    FoodGroup.add(banana);
  }
}
function spawnObstacles(){
  if(frameCount%180==0){
    obstacle = createSprite(600,265,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    obstacle.depth = monkey.depth;
    obstacle.lifetime = 200;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
  score = 0;
  obstacleGroup.destroyEach();
  FoodGroup.destroyEach();
  gameState = PLAY;
  

}



