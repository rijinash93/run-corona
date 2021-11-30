//creating variables
var PLAY = 1;
 var END = 0;
var gameState = PLAY;

var smith, smith_running , smith_collided;
var pathImg,path,invisiblePath ;


var obstaclesGroup,obstacle1,obstacle2;
var backgroundImg;
var score = 0;
var jumpSound,collidedSound;

var gameOver, gameOverImg ;
 var restartImg,restart;


function preload(){
backgroundImg = loadImage("background.png");

smith_running = loadImage ("Player.png");




obstacle1 = loadImage("Obstacle.png");
obstacle2 = loadImage("Obstacle2.png");


gameOverImg = loadImage ("gameOver.png");
restartImg = loadImage ("restart.png");

jumpSound = loadSound("jump.wav");
collidedSound = loadSound("collided.wav");

}

function setup() { 

    createCanvas(windowWidth,windowHeight);

  smith = createSprite(200,height-150,20,20);
  smith.addImage(smith_running);
  
  smith.scale = 0.5;

  
    

    gameOver = createSprite(width/2,height/2- 50);
    gameOver.addImage(gameOverImg);
    
    restart = createSprite(width/2,height/2);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.1;
  
    gameOver.visible = false;
    restart.visible = false;

    obstaclesGroup = new Group();
smith.setCollider("circle",0,0,300);
    smith.debug = false
    score = 0;
}
    function draw() {
    background(backgroundImg);
    textSize(20);
    text("Score: "+ score, 500,50);
    if(gameState === PLAY){

      gameOver.visible = false;
      restart.visible = false;
      
     
      //scoring
      score = score + Math.round(getFrameRate()/60);
      
     
     
    
      if (keyDown(DOWN_ARROW)) {
        smith.velocityY = +5
      }
  
      if (keyDown(UP_ARROW)) {
        smith.velocityY = -5
      }
      
    
    
      //spawn obstacles on the ground
      spawnObstacles();
      
      if(obstaclesGroup.isTouching(smith)){
         
         
          gameState = END;
        
        
      }
    }
     else if (gameState === END) {
        gameOver.visible = true;
        restart.visible = true;
       
       //change the trex animation
       
      
       
       
       
        smith.velocityY = 0
        
       
        //set lifetime of the game objects so that they are never destroyed
      obstaclesGroup.setLifetimeEach(-1);
      
       
       obstaclesGroup.setVelocityXEach(0);
        
     }
    
   
    //stop trex from falling down
   
    
    if(mousePressedOver(restart)) {
        reset();
      }
  
  
    drawSprites();
  }


  function spawnObstacles() {
    if(frameCount % 60 === 0) {
      var obstacle = createSprite(600,height-95,20,30);
      obstacle.setCollider('circle',0,0,45)
     
    
      obstacle.velocityX = -(6 + 3*score/100);
      
      //generate random obstacles
      var rand = Math.round(random(1,2));
      switch(rand) {
        case 1: obstacle.addImage(obstacle1);
                break;
        case 2: obstacle.addImage(obstacle2);
                break;
        default: break;
      }
      
      //assigning scale and lifetime to the obstacle           
      obstacle.scale = 0.3;
      obstacle.lifetime = 300;
      obstacle.depth =smith.depth;
      smith.depth +=1;
      //add each obstacle to the group
      obstaclesGroup.add(obstacle);
    }
  }
  
  function reset(){
    gameState = PLAY;
    gameOver.visible = false;
    restart.visible = false;
    
    obstaclesGroup.destroyEach();
    
    
    smith.changeAnimation("running",smith_running);
    
    score = 0;
    
  }

 
