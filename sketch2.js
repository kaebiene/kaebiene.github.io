var transportapi
var trainData
var img1
var pg
var stretch
var busespassed2
var busespassed2 = 0
var previoustime
var trainspassed
var trainspassed = 0
var button
//var nowtime = hour() + ":" + minute()

function preload() {
  loadData();
  //loadJSON(url2, gotData2);
}

function noscroll() {
  window.scrollTo( 0, 0 );
}

// add listener to disable scroll
window.addEventListener('scroll', noscroll);

// Remove listener to disable scroll
window.removeEventListener('scroll', noscroll)

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function populateStorage() {
  console.log('populateStorage')
  localStorage.setItem('busespassed2', busespassed2);

  getBusValue();
}

function getBusValue() {
  console.log('getBusValue')
  busespassed = localStorage.getItem('busespassed2');
  busespassed = float(busespassed2);
}



function loadData(){
  console.log('loadData');
  var url = 'https://transportapi.com/v3/uk/bus/stop/490010482N///timetable.json?app_id=ca103b63&app_key=8bc99f71886bd7095a865df6dcb5c46a&group=route'
  //var url2 = 'https://transportapi.com/v3/uk/train/station/EPH/live.json?app_id=ca103b63&app_key=8bc99f71886bd7095a865df6dcb5c46a&darwin=false&operator=LT&train_status=passenger'
  loadJSON(url, gotData);
  //loadJSON(url2, gotTrainData);
}

function setup() {
  if(!localStorage.getItem('busespassed2')) {
    populateStorage();
  } else {
    getBusValue();
  }
  createCanvas(windowWidth, windowHeight);
  //var nowtime = hour() + ":" + minute()
  //var busespassed = 0

  console.log(busespassed2);
  //img1 = loadImage("assets/gradient1.png");
  bus12 = loadImage("assets/12BUSB.png");
  dots = loadImage("assets/worn-dots-DESK.png");
  dotsDAY = loadImage("assets/worn-dots-DESK-DAY.png");
  //var url = 'https://transportapi.com/v3/uk/bus/stop/490000073V///timetable.json?app_id=ca103b63&app_key=8bc99f71886bd7095a865df6dcb5c46a&group=route'
  //loadJSON(url,gotData);

  //console.log(transportapi.departures["12"][0].line);
  stretch = createGraphics(width,200);
  // this refreshes the data after a bit
  setInterval(loadData, 60000);
  setInterval(populateStorage, 60000)
  //setInterval(gotTrainData, 30000)
  var colorset = '#FAB603'


  button = createButton('location 1');
  button.position(1200, 20);
  button.mousePressed(MoveToLOC);


  //button = createButton('submit');
  //button.position(100, 100, 65);
  //button.mousePressed(greet);

}

function MoveToLOC(){
  window.open("http://kaebiene.github.io/index.html");
}


function gotData(data) {
  //console.log(gotData);
  transportapi = data;
  var nowtime = hour() + ":" + nf(minute(),2,0);
  if (nowtime === transportapi.departures["214"][0].aimed_departure_time) {
    busespassed2 = busespassed2 + 1
  }
  if (nowtime === transportapi.departures["214"][1].aimed_departure_time) {
    busespassed2 = busespassed2 + 1
  }
  if (nowtime === transportapi.departures["214"][2].aimed_departure_time) {
    busespassed2 = busespassed2 + 1
  }
  console.log(nowtime);
  var remain0 = transportapi.departures["214"][0].aimed_departure_time
  var remain = remain0 - nowtime
  float(remain);
  console.log(remain)
  console.log(remain0)

}


//function gotWeather(weather) {

// Get the temp
//var temp = Number(weather.current.temp_c);

//}

function draw() {
  var h = hour();
  var m = minute();
  var sec = second();
  var d = day();
  var bg = color(363537);
  var bgNIGHT = color('black');
  var accent = color('#ED7D3A');
  var txt = color('white');
  var txtNIGHT = color('white');
  var nowtime = hour() + ":" + nf(minute(),2,0);

  pg = createGraphics(width*2,450);
  //var nowtime = hour() + ":" + minute()

  background(bg);
  image(dots,0,0,windowWidth,windowHeight);
  angleMode(DEGREES);

  //rotate(50);
  //translate(200,-300)
  //scale(0.8);
  textFont('Exo_2');

  //second
  push();
  fill(accent);
  noStroke();
  blendMode(DIFFERENCE);
  ellipse(1200,0,1000);
  rect(50,200,500,100);
  rect(200,550,width,100);
  pop();

  push();
  //textFont('Exo 2');
  colorMode(HSL);
  //fill(100, 100, 100);
  textSize(100);
  textStyle(BOLD);
  translate(100, 300);
  rotate(45);
  //text( sec, 0, 0);
  pop();

  // minute
  // this creates a new drawing state
  push();
  // done in degrees
  translate(0, 280);
  rotate(90);
  textSize(150);
  // replace with font name
  textStyle(BOLD);
  fill('blue');
  //text(m, 0, 0);
  // this restores canvas to normal for another rotation
  pop();

  //hour
  push();
  textSize(400);
  textStyle(BOLD);
  fill(txt);
  //text( h, 6, 280 );
  //stroke('black');
  //strokeWeight(3);
  //fill(0, 0);
  //text( h, 0, 140 );


  pop();

  //push();
  //pop();
  push();
  // done in degrees
  translate(300, 200);
  rotate(0);
  textSize(150);
  // replace with font name
  textStyle(BOLD);
  //text('', 0, 0);
  //text(transportapi.departures["12"][0].aimed_departure_time, 10, 160);
  // this restores canvas to normal for another rotation
  pop();


  push();
  textSize(200);
  textStyle(BOLD);
  colorMode(HSL);
  fill(0, 0, 50);
  //text(transportapi.departures["12"][0].aimed_departure_time, 10, 160);
  fill(0, 0, 30);
  //text(transportapi.departures["12"][1].aimed_departure_time, 10, 340);
  fill(0, 0, 10);
  //text(transportapi.departures["12"][2].aimed_departure_time, 10, 540);
  //image(img1, 0, 400, width, 200);
  //text(busespassed,10, 160, 50);
  textSize(100)
  textLeading(80)
  //noFill();
  //fill('#3023AE')
  //strokeWeight(2);
  //stroke('black')
  fill(txt)
  text('buses passed',10,250, 50);
  pop();


  push();
  pg.clear();
  //pg.translate(600,20);
  //pg.angleMode(DEGREES)
  //pg.rotate(90);
  pg.smooth();
  pg.textSize(200);
  pg.textStyle(BOLD);
  pg.textFont('Exo2');
  pg.textStyle(NORMAL)
  pg.fill(accent);
  //pg.text(transportapi.departures["12"][0].line,0,0);
  pg.text(busespassed2,10, 160, 50);
  //pg.text('BUS',0,-180);
  //filter(GRAY)
  //pg.rect(0,0,width,width);
  image(pg,0,0);
  //translate(570,20);
  //rotate(90);
  textSize(200);
  textStyle(BOLD);
  textFont('Exo 2');
  fill(txt);
  translate(20,350);
  rotate(90);
  textStyle(NORMAL)
  text('BUS',0,0);
  rotate(-90)
  translate(350,-100);
  text(transportapi.location.coordinates[0],0,0);
  translate(0,-180)
  text(transportapi.stop_name,0,0);
  translate(0,200)
  rotate(90)
  text(transportapi.location.coordinates[1],0,0);
  rotate(-90)
  translate(200,200)
  textStyle(NORMAL)
  text(transportapi.indicator,0,0);
  translate(0,150)
  textSize(20);
  text(transportapi.locality,0,0);

  pop();

}
