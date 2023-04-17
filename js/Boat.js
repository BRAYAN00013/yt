class Boat {
  constructor(x, y, width, height,boatpos,boatAnimation) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
    };

    this.image = loadImage("./assets/boat.png");
    this.width = width;
    this.height = height;
    this.body = Bodies.rectangle(x, y, width, height, options);
    this.boatpos = boatpos;    

    World.add(world, this.body);

    this.animation = boatAnimation;
    this.speed = 0.05;
  }

  animate() {
    this.speed += 0.05 % 1.1;

  }                   
  display() {
    var index = floor(this.speed % this.animation.length);
    var pos = this.body.position;
  
    push(); 
    imageMode(CENTER);
    image(this.animation[index], pos.x, pos.y, this.width, this.height);
    pop(); 
    
  }
}
