const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body
const Constraint = Matter.Constraint;
var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var balls = [];
var Sunny

var boatAnimation =[];
var boatJSON,boatPNG

var brookAnimation = [];
var brookJSON,brookPNG


function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
  boatPNG  = loadImage("./assets/boat/boat.png");
  boatJSON =  loadJSON("./assets/boat/boat.json");
  brookPNG = loadImage("./assets/boat/broken_boat.png");
  brookJSON = loadJSON("./assets/boat/broken_boat.json");
}

function setup() {
  canvas = createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;
  angle = -PI / 4;
  ground = new Ground(0, height - 1, width * 2, 1);
  tower = new Tower(150, 350, 160, 310);
  cannon = new Cannon(180, 110, 100, 50, angle);
  Sunny = new Boat(width,height -100,250,250,0,boatAnimation);

  for(var i = 0; i < boatJSON.frames.length;i++){
    var pos = boatJSON.frames[i].position;
    var img = boatPNG.get(pos.x,pos.y,pos.w,pos.h);
    boatAnimation.push(img);
  }
  
for(var i = 0; i <brookJSON.frames.length;i++){
var pos = brookJSON.frames[i].position;
var img = brookPNG.get(pos.x,pos.y,pos.w,pos.h);
brookAnimation.push(img);
}
}
function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  ground.display();
  
  for (var i = 0; i < balls.length; i++) {
    showCannonBalls(balls[i], i);
  }

  cannon.display();
  tower.display();
  Sunny.display();
  Sunny.animate();

  Body.setVelocity(Sunny.body,{ x: -10, y: 0 })
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    var cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

//funcao para mostrar a bala
function showCannonBalls(ball, index) {
  ball.display();
  if (ball.body.position.x >= width || ball.body.position.y >= height - 50) {
    Matter.World.remove(world, ball.body);
    balls.splice(index, 1);
  }
}



function keyReleased() {
  if (keyCode === DOWN_ARROW) { 
    balls[balls.length - 1].shoot();
  }
}


