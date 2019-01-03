var transportapi
var trainData
var img1
var pg
var stretch
var busespassed
var busespassed = 0
var previoustime
var trainspassed
var trainspassed = 0
var button
//var nowtime = hour() + ":" + minute()

function preload() {
  loadData();
  loadTrainData();
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
  localStorage.setItem('busespassed', busespassed);
  localStorage.setItem('trainspassed', trainspassed);

  getBusValue();
  getTrainValue();
}

function getBusValue() {
  console.log('getBusValue')
  busespassed = localStorage.getItem('busespassed');
  busespassed = float(busespassed);
}

function getTrainValue() {
  console.log('getTrainValue')
  trainspassed = localStorage.getItem('trainspassed');
  trainspassed = float(trainspassed);
}


function loadData(){
  console.log('loadData');
  var url = 'https://transportapi.com/v3/uk/bus/stop/490000073V///timetable.json?app_id=ca103b63&app_key=8bc99f71886bd7095a865df6dcb5c46a&group=route'
  //var url2 = 'https://transportapi.com/v3/uk/train/station/EPH/live.json?app_id=ca103b63&app_key=8bc99f71886bd7095a865df6dcb5c46a&darwin=false&operator=LT&train_status=passenger'
  loadJSON(url, gotData);
  //loadJSON(url2, gotTrainData);
}

function loadTrainData(){
  console.log('loadTrainData');
  var url2 = 'https://transportapi.com/v3/uk/train/station/EPH/live.json?app_id=ca103b63&app_key=8bc99f71886bd7095a865df6dcb5c46a&darwin=false&operator=LT&train_status=passenger'
  loadJSON(url2, gotTrainData);
}

function setup() {
  if(!localStorage.getItem('busespassed','trainspassed')) {
    populateStorage();
  } else {
    getBusValue();
    getTrainValue();
  }
  createCanvas(windowWidth, windowHeight);
  //var nowtime = hour() + ":" + minute()
  //var busespassed = 0

  console.log(busespassed);
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
  setInterval(loadTrainData, 60000)
  setInterval(populateStorage, 60000)
  //setInterval(gotTrainData, 30000)
  var colorset = '#FAB603'

  button = createButton('location 2');
  button.position(1200, 20);
  button.mousePressed(MoveToLOC);

}

function MoveToLOC(){
  window.open("http://0.0.0.0:8000/loc2.html");
}
function gotData(data) {
  //console.log(gotData);
  transportapi = data;
  var nowtime = hour() + ":" + nf(minute(),2,0);
  if (nowtime === transportapi.departures["12"][0].aimed_departure_time) {
    busespassed = busespassed + 1
  }
  if (nowtime === transportapi.departures["12"][1].aimed_departure_time) {
    busespassed = busespassed + 1
  }
  if (nowtime === transportapi.departures["12"][2].aimed_departure_time) {
    busespassed = busespassed + 1
  }
  console.log(nowtime);
}

function gotTrainData(data) {
  //console.log(gotTrainData);
  trainData = data
  var fasttime = hour() + ":" + nf(minute()+1,2,0);
  if (fasttime === trainData.departures["all"][0].aimed_departure_time) {
    trainspassed = trainspassed + 1
  }
  if (fasttime === trainData.departures["all"][1].aimed_departure_time) {
    trainspassed = trainspassed + 1
  }
  if (fasttime === trainData.departures["all"][2].aimed_departure_time) {
    trainspassed = trainspassed + 1
  }
  console.log(trainData.departures["all"][0].aimed_departure_time);
  console.log(trainspassed);
  console.log(fasttime);

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
  var bg = color('white');
  var bgNIGHT = color('black');
  var accent = color('#0CCE6B');
  var txt = color('black');
  var txtNIGHT = color('white');
  pg = createGraphics(width*2,450);
  //var nowtime = hour() + ":" + minute()

  background(bg);
  image(dotsDAY,0,0,windowWidth,windowHeight);
  angleMode(DEGREES);


  // this is how i am going to count the number of buses
  // busespassed is necessary
  //if (nowtime !== previoustime) {

  //if (nowtime === transportapi.departures["12"][0].aimed_departure_time) {
  //  busespassed = busespassed + 1
//  }
  //if (nowtime === transportapi.departures["12"][1].aimed_departure_time) {
  //  busespassed = busespassed + 1
  //}
  //if (nowtime === transportapi.departures["12"][2].aimed_departure_time) {
  //  busespassed = busespassed + 1
//  }
//}

  //rotate(50);
  //translate(200,-300)
  //scale(0.8);
  textFont('Exo2');
  //second
  push();
  fill(accent);
  noStroke();
  blendMode(MULTIPLY);
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
  pg.fill(accent);
  //pg.text(transportapi.departures["12"][0].line,0,0);
  pg.text(busespassed,10, 160, 50);
  //pg.text('BUS',0,-180);
  image(bus12,350,0,474/1.8,854/1.8);
  //filter(GRAY)
  //pg.rect(0,0,width,width);
  image(pg,0,0);
  //translate(570,20);
  //rotate(90);
  textSize(200);
  textStyle(BOLD);
  textFont('Exo2');
  fill(txt);
  //img1.mask(pg);
  //image(img1, 0, 0, width*2,400);
  translate(760,20);
  rotate(90);
  textStyle(NORMAL)
  //text('BUS',0,0);
  pop();



  push();
  textSize(50);
  textStyle(BOLD);
  translate(600,50);
  rotate(0);
  fill(txt)
  text(transportapi.stop_name,0,0,100);
  translate(0,0)
  translate(-450,300)
  rotate(90);
  text(trainData.station_name,0,0,0);
  rotate(-90);
  translate(50,150);
  textSize(200);
  fill(accent)
  text(trainspassed,0,0);
  //translate(0,200);
  fill(txt)
  text('trains passed',0,150);
  translate(400,-100)
  fill(txt)
  textStyle(NORMAL)
  text(trainData.station_code,0,0);
  translate(200,-200)
  text(traindata.location.coordinates[0],0,0)
  pop();

  //previoustime = nowtime
}
