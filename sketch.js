let moveup = false
let movedown = false
let moveleft = false
let moveright = false
let x=200
let y=225
let r=25
let errorcount=0
let gridx;
let gridy;
let circles = []
let increment=5
let skyHeight;
let squareSize = 10;
let clouds = [];
let skyGraphics;
let a = 100
let increment2=5
let flag=false

//--------------------------------------------------------------------------

function setup() {
  createCanvas(windowWidth, windowHeight*2.4);
  gridGraphics1 = createGraphics(width, windowHeight*2);

  // Draw the grid onto the offscreen buffer
  let gridSize1 = 10; 
  for (let x = 0; x < width; x += gridSize1) {
    for (let y = 0; y < height; y += gridSize1) {
      let blueShade = random(200 - y/15, 255 - y/7); 
      gridGraphics1.fill(0, 0, blueShade);
      gridGraphics1.noStroke();
      gridGraphics1.rect(x, y, gridSize1, gridSize1);
    }
  }
  skyHeight = windowHeight / 4; 

  // Create a buffer for the sky background
  skyGraphics = createGraphics(width, skyHeight);
  skyGraphics.noStroke();

  // Draw sky once in buffer
  for (let y = 0; y < skyHeight; y += squareSize) {
    for (let x = 0; x < width; x += squareSize) {
      let blueShade = random(220, 240);
      skyGraphics.fill(blueShade, blueShade + random(10, 30), 255);
      skyGraphics.rect(x, y, squareSize, squareSize);
    }

    window.addEventListener("keydown", preventScroll);

    frameRate(30)
}}
//--------------------------------------------------------------------------

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}
//--------------------------------------------------------------------------

function preload(){
  shark =loadImage("shark-removebg-preview.png")
  boxjellyfish = loadImage('boxjellyfish.png')
  whale= loadImage('whale-removebg-preview.png')
  anglerfish = loadImage('anglerfish.png')
  sixgillshark = loadImage('sixgillsharks.png')
  goblinshark = loadImage('goblinshark.png')
  underwater = loadSound('underwater-ambiencewav-14428.mp3')
}
//--------------------------------------------------------------------------

function draw() {
  //background(0,0,175);
  //noStroke()
  //fill(232,253,250)
  //rect(0,0,width,windowHeight*0.5)

  image(skyGraphics, 0, 0);

  fill(0,0,30)
  rect(0,windowHeight*2,width,windowHeight*0.75)
  
  image(gridGraphics1, 0, windowHeight*0.25);

  image(shark,1300,130+windowHeight*0.25,200,200);

  image(boxjellyfish, 600,50+windowHeight*0.25,80,80)
  image(boxjellyfish, 550,50+windowHeight*0.25,80,80)
  image(boxjellyfish, 500,50+windowHeight*0.25,80,80)
  image(boxjellyfish, 525,100+windowHeight*0.25,80,80)
  image(boxjellyfish, 575,100+windowHeight*0.25,80,80)

  image(whale, 100,300+windowHeight*0.25,1200,700)

  image(anglerfish, 300, 1000+windowHeight*0.25, 80,80)
  push();
  translate(width,0)
  scale(-1,1)
  image(anglerfish, 650, 1050+windowHeight*0.25, 80,80)
  pop();
  push();
  translate(width,0)
  scale(-1,1)
  image(anglerfish, 250, 950+windowHeight*0.25, 80,80)
  pop();
  image(anglerfish, 1100, 1200+windowHeight*0.25, 80,80)

  image(sixgillshark, 1100, 1450+windowHeight*0.25, 400, 200)
  
  push();
  translate(width,0)
  scale(-1,1)
  image(goblinshark, 1100, 1350+windowHeight*0.25, 400,100)
  pop();

  //fill(255)
  //ellipse(800,200,50)
  
  a+=increment2
  if(a===200){
    increment2=-5
  } else if(a===50){
    increment2=5
  }
  fill(255,0,0,a)
  ellipse(x,y,10)

  
  for(i=0;i<=width;i+=squareSize){
    for(j=0;j<height;j+=squareSize){
      if(Math.abs(y-windowHeight*0.25)<=5){
        underwater.setVolume(0)
        let d = 150;
        if (((x-i)**2+(y-j)**2)**0.5>d && j>=y){
         fill(0)
         rect(i,j,squareSize,squareSize)
      }} else {
        underwater.setVolume(0.5)
        if(y<300+windowHeight*0.25){
          let d = 150;
          if (((x-i)**2+(y-j)**2)**0.5>d){
            fill(0)
            rect(i,j,squareSize,squareSize)
      }} else if (y>=300+windowHeight*0.25 && y<=windowHeight*0.25+900){
          let d = 100;
          if (((x-i)**2+(y-j)**2)**0.5>d){
            fill(0)
            rect(i,j,squareSize,squareSize)
      }} else if(y>=windowHeight*0.25+900 && y<=1200+windowHeight*0.25){
          let d = 75;
          if (((x-i)**2+(y-j)**2)**0.5>d){
            fill(0)
            rect(i,j,squareSize,squareSize)
      }} else if(y>=1200+windowHeight*0.25){
          let d = 50;
          if (((x-i)**2+(y-j)**2)**0.5>d){
            fill(0)
            rect(i,j,squareSize,squareSize)
    }
  }}}}

  if (circles.length === 0) {
    circles.push({ x: x, y: y, radius: 10 });
  }
  for(let i=circles.length-1;i>=0;i--){
    let circle=circles[i]
    circle.radius+=0.5
    noFill()
    stroke(255)
    strokeWeight(5)
    ellipse(x,y,circle.radius*2)
    if (circle.radius === 20) {
      circles.push({ x: x, y: y, radius: 7 });
    }

    if (circle.radius >= 40) {
      circles.splice(i, 1);
    } 
  }
  if(flag===false){
    textSize(14)
    textAlign(CENTER)
    fill(255)
    text("Click on the screen, and use\narrow keys to move around!", x,y)}
  
  noStroke()
  //fill(255)
  //rect(1320,180+windowHeight*0.25,40,40)
  if(x>=1320 && x<=1360 && y>=180+windowHeight*0.25 && y<=220+windowHeight*0.25){
    window.location.href = "shark.html";
  }

  if(x>=500 && x<=680 && y>=50+windowHeight*0.25 && y<=130+windowHeight*0.25){
    window.location.href = "jellyfish.html";
  } else if (x>=525 && x<=655 && y>=100+windowHeight*0.25 && y<=180+windowHeight*0.25){
    window.location.href = "jellyfish.html"
  }

  //fill(255)
  //rect(250,575,350,150)

  if (x>=250 && x<=600 && y>=575+windowHeight*0.25 && y<=725+windowHeight*0.25){
    window.location.href = 'spermwhale.html';
  }
  
  //fill(255,0,0,100)
  //rect(1205,1155,70,70)

  if (x>=300 && x<=380 && y>=1000+windowHeight*0.25 && y<=1080+windowHeight*0.25){
    window.location.href = 'anglerfish.html';
  } else if (x>=810 && x<=880 && y>=1055+windowHeight*0.25 && y<=1125+windowHeight*0.25){
    window.location.href = 'anglerfish.html';
  } else if (x>=1100 && x<=1180 && y>=1200+windowHeight*0.25 && y<=1280+windowHeight*0.25){
    window.location.href = 'anglerfish.html';
  } else if (x>=1205 && x<=1275 && y>=1155 && y<=1225){
    window.location.href = 'anglerfish.html'
  }

  //fill(255,0,0,100)
  //rect(1125,1500,90,60)

  if(x>=1125 && x<=1215 && y>=1500+windowHeight*0.25 && y<=1560+windowHeight*0.25){
    window.location.href = 'sixgillshark.html';
  }

  //fill(255,0,0,100)
  //rect(350,1360,90,60)

  if(x>=350 && x<=440 && y>=1360+windowHeight*0.25 && y<=1420+windowHeight*0.25){
    window.location.href = 'goblinshark.html';
  }
  
  if(y<=windowHeight*0.25){
    fill(255,0,0)
    textAlign(CENTER)
    text("Cannot move further up!", width/2, 24)
    fill(255)
  }  
   else{
     if(keyIsDown(UP_ARROW)){
      y-= increment
      moveup=false
   }}

  if(y>=(windowHeight*2-2*r+windowHeight*0.25)){
    fill(255,0,0)
    textAlign(CENTER)
    text("Cannot move further down!", width/2, (height-24))
    fill(255)
    }
  else{
    if(keyIsDown(DOWN_ARROW)){
      y+=increment
  }}
  
  if(x<=(2*r)){
    fill(255,0,0)
    push()
    translate(24,height/2)
    rotate(3*PI/2)
    textAlign(CENTER,CENTER)
    text("Cannot move further left!", 0,0)
    pop()
    fill(255)
  }
    else{
      if(keyIsDown(LEFT_ARROW)){
        x-=increment
  }}
  
  if(x>=(windowWidth-(2*r))){
    fill(255,0,0)
    push()
    translate(width-24,height/2)
    rotate(PI/2)
    textAlign(CENTER,CENTER)
    text("Cannot move further right!", 0,0)
    pop()
    fill(255)
  }
    else{
      if(keyIsDown(RIGHT_ARROW)){
        x+=increment    
  }}
  
//--------------------------------------------------------------------------
  
}

function keyIsPressed(){

  if(keyIsDown(UP_ARROW)){
    moveup = true
  }
  if(keyIsDown(DOWN_ARROW)){
    movedown = true
  }
  if(keyIsDown(LEFT_ARROW)){
    moveleft = true
  }
  if(keyIsDown(RIGHT_ARROW)){
    moveright = true
  }
  
}

function mousePressed(){
  underwater.play()
  if(flag===false){
    flag=true}
}

function preventScroll(event) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
  }
}
