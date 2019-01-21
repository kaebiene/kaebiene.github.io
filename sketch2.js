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
var startTime
//var nowtime = hour() + ":" + minute()
var textInfo = {
	opacity: 0
};
var textInfoBus = {
	opacity: 0
};
var textInfoTrain = {
	opacity: 0
};
var pulseInfo = {
	opacity: 0
};
var shapeInfo = {
	opacity: 255
};
var textValueBus = {
	opacity: 255
};
var textValueTrain = {
	opacity: 255
}
var rectMove = {
	x: 0
};

var rectMove2 = {
	x: 50
};

var circleMove = {
	x: 1200
};

var circleMoveY = {
	y: 0
};

var rectRotate = {
	rotation: 0
}

var textTween

var rectRotation = 360

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


function executeTime(){
	startTime = day()
	trainspassed = 0
	busespassed = 0

	console.log('executeTime')
}

function executeTimeout(){
	if (startTime = day()) {
		console.log('Still valid!')
	} else {
		executeTime()
		console.log('Time expired & renewed')
	}
}

function equalsMaybe(){
	if (startTime = day()){
		console.log('this is one equals')
	} if (startTime == day()) {
		console.log('this is two equals')
	} else if (startTime === day()){
		console.log('this is three equals')
	}
	}

function populateStorage() {
  console.log('populateStorage')
  localStorage.setItem('busespassed2', busespassed2);
  localStorage.setItem('startTime', startTime)


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

  //if (!localStorage.getItem('startTime')) {
  //  executeTime()
  //} else {
  //  executeTimeout()
  //}

  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(displayWidth, displayHeight);
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
  //stretch = createGraphics(width,200);
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

  shapeMovement();
	console.log(startTime)
	console.log(day())
	equalsMaybe()

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
    pulseBUS()
  }
  if (nowtime === transportapi.departures["214"][1].aimed_departure_time) {
    busespassed2 = busespassed2 + 1
    pulseBUS()
  }
  if (nowtime === transportapi.departures["214"][2].aimed_departure_time) {
    busespassed2 = busespassed2 + 1
    pulseBUS()
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
  var accent = color(13, 145, 216, shapeInfo.opacity);
  var textFadeDAY = color(0, 0, 0, shapeInfo.opacity)
  var textFadeNIGHT
  var txtOLD = color('black');
  var txt = color(255,255,255,textInfo.opacity)
  var pulsebg = color(13, 145, 216,pulseInfo.opacity);
  var txtNIGHT = color('white');
  var move = second() * 2
  var TRAIN = color(255,255,255,textInfo.opacity)
  var BUS = color(255,255,255,textInfo.opacity)
  var textValueBus = color(0,0,0)
  var textValueTrain
  rectRotation = rectRotation - 1
  if (rectRotation < 0) {
    y = 360;
  }
  TWEEN.update(millis());
  //var nowtime = hour() + ":" + minute()

  background(bg);
  //image(dots,0,0,windowWidth,windowHeight);
  angleMode(DEGREES);

  if (7 > h && h < 20) {
  		image(dotsDAY, 0, 0, windowWidth, windowHeight);
  		var accent = color(22, 219, 101, shapeInfo.opacity);
  		var txt = color(255,255,255,textInfo.opacity)
  		var pulsebg = color(22, 219, 101,pulseInfo.opacity);
  		var TRAIN = color(255,255,255,textInfo.opacity)
  		var BUS = color(255,255,255,textInfo.opacity)
  		var textFadeDAY = color(0, 0, 0, shapeInfo.opacity)

  }
  else {
  		image(dots, 0, 0, windowWidth, windowHeight);
  		var accent = color(248,51,60, shapeInfo.opacity);
  		var txt = color(255,255,255,textInfo.opacity)
  		var pulsebg = color(248,51,60,pulseInfo.opacity);
  		var TRAIN = color(255,255,255,textInfo.opacity)
  		var BUS = color(255,255,255,textInfo.opacity)
  		var textFadeDAY = color(255, 255, 255, shapeInfo.opacity)
  }
  //rotate(50);
  //translate(200,-300)
  //scale(0.8);
  textFont('Exo');
  fill(pulsebg);
	rect(0,0,windowWidth,windowHeight);

  //second
  push();
  fill(accent);
  noStroke();
  if (7 > h && h < 20) {
  blendMode(MULTIPLY);
} else {
  blendMode(SCREEN)
}
angleMode(DEGREES)
//translate(windowWidth,0)
//rotate(90)
  //ellipse(circleMove.x, circleMoveY.y, 500);
  rect(rectMove.x, 200, 500, 100);
  rect(rectMove.x, 500, 200, 20);
  rect(rectMove.x + 400, 150, 200, 20);
  rect(rectMove.x + 600, 450, 200, 20);
  rect(rectMove.x + 200, 900, 200, 20);
  rect(rectMove.x + 100, 350, 200, 20);
  rect(rectMove.x + 500, 700, 200, 20);
  rect(rectMove.x + 50, 400, 200, 20);
  rect(rectMove.x + 50, 550, width, 100);
  rect(circleMove.x - 100, 50, width, 100);
  rect(circleMove.x - 200, 650, 200, 20);
  rect(circleMove.x + 700, 250, 200, 20);
  rect(circleMove.x + 400, 300, 200, 20);
  rect(circleMove.x + 600, 700, 200, 20);


  rotate(rectRotation)
  rect(-50,-50,500,100);
  rotate(0)
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
  text('buses passed',windowWidth / 2,windowHeight / 2 + 100, 50);
  fill(BUS)
  text('buses passed',windowWidth / 2,windowHeight / 2 + 100, 50);
  pop();


  push();
  pg.clear();
  //pg.translate(600,20);
  //pg.angleMode(DEGREES)
  //pg.rotate(90);
  pg.smooth();
  pg.textSize(200);
  pg.textStyle(BOLD);
  pg.textFont('Exo');
  pg.textStyle(NORMAL)
  pg.fill(textFadeDAY);
  //pg.text(transportapi.departures["12"][0].line,0,0);
  pg.text(busespassed2, windowWidth / 2, windowHeight / 2, 0);
  pg.fill(BUS);
  pg.text(busespassed2, windowWidth / 2, windowHeight / 2, 0);
  //pg.text('BUS',0,-180);
  //filter(GRAY)
  //pg.rect(0,0,width,width);
  image(pg,0,0);
  //translate(570,20);
  //rotate(90);
  textSize(200);
  textStyle(BOLD);
  textFont('Exo');
  fill(txt);
  //translate(0,-20);
  rotate(90);
  textStyle(NORMAL)
  text('BUS',0,-20);
  rotate(-90)
  //translate(350,-100);
  textFont('Exo');
  textSize(100);
  text(transportapi.location.coordinates[0],windowWidth - 500,100);
  //translate(0,-180)
  //text(transportapi.stop_name,0,0);
  //translate(0,200)
  translate(windowWidth - 100, 100)
  rotate(90)
  text(transportapi.location.coordinates[1],0,0);
  //rotate(-90)
  //translate(200,200)
  textStyle(NORMAL)
  //translate(windowWidth - 500,100)
  rotate(-90)
  text(transportapi.indicator,-windowWidth + 100,windowHeight - 100);
  //translate(0,150)
  //textSize(200);
  //text(transportapi.locality,windowWidth - 500,500);

  pop();
//tweening functions
}

function mousePressed(){
	console.log('tween...');
	var t = new TWEEN.Tween( textInfo )
				.to({ opacity: 255 }, 2000)
   .easing(TWEEN.Easing.Quadratic.Out)
	 .onStart(function(){
		 new TWEEN.Tween( pulseInfo )
		 .to({ opacity: 255 }, 2000)
	  	 .easing(TWEEN.Easing.Quadratic.Out)
			 .onStart(function(){
				 new TWEEN.Tween( shapeInfo )
				 .to({	opacity:0 }, 2000)
				 .easing(TWEEN.Easing.Quadratic.Out)
				 .onStart(function(){
					 new TWEEN.Tween(	textInfoBus)
					 .to({ opacity: 255 }, 2000)
		  	 .easing(TWEEN.Easing.Quadratic.Out)
			 }).start()
			 }).start();
	 })
	 .delay(2000)
	 .onComplete (fadeOut)
	 .start();

}

function pulseBUS(){
	console.log('tween...');
//	var t = new TWEEN.Tween( textInfoBus )
//				.to({ opacity: 255 }, 500)
//	 .easing(TWEEN.Easing.Quadratic.Out)
//	var t = new TWEEN.Tween( pulseInfo )
//				.to({ opacity: 255 }, 500)
// 	 .easing(TWEEN.Easing.Quadratic.Out)
//	.onComplete (fadeOut)
//			.start();

var t = new TWEEN.Tween( textInfo )
			.to({ opacity: 255 }, 500)
 .easing(TWEEN.Easing.Quadratic.Out)
 .onStart(function(){
	 new TWEEN.Tween( pulseInfo )
	 .to({ opacity: 255 }, 500)
		 .easing(TWEEN.Easing.Quadratic.Out)
		 .onStart(function(){
			 new TWEEN.Tween( shapeInfo )
			 .to({	opacity:0 }, 500)
			 .start();
		 }).start();
 }).onComplete (fadeOut)
 .start();
}

function fadeOut(){
      var t = new TWEEN.Tween( textInfo )
        				.to({ opacity: 0 }, 500)
           .easing(TWEEN.Easing.Quadratic.Out)
           .delay(1000)
  				 .onStart(function(){
  					 new TWEEN.Tween( pulseInfo )
  					 .to({ opacity: 0 }, 500)
  						 .easing(TWEEN.Easing.Quadratic.Out)
  						 .delay(800)
  						 .onStart(function(){
  							 new TWEEN.Tween( shapeInfo )
  							 .to({	opacity:255 }, 500)
  							 .start();
  						 }).start();
  				 })
        	.start();

  	var p = new TWEEN.Tween( textInfoBus)
  	.to({ opacity: 0 }, 500)
  	.easing(TWEEN.Easing.Quadratic.Out)
  	.delay(1000)
  	.chain(t)
  	.start();


  }

function shapeMovement(){
  	var t = new TWEEN.Tween( rectMove )
  	.to({ x: 500}, 60000)
  	.easing(TWEEN.Easing.Quadratic.Out)
  	.repeat(Infinity)
  	.delay( 1000 )
  	.yoyo( true )
  	.onStart(function(){
  		new TWEEN.Tween( circleMove)
  		.to({	x: 0}, 60000)
  		.easing(TWEEN.Easing.Quadratic.Out)
  		.repeat(Infinity)
  		//.delay( 1000 )
  		.yoyo( true )
  		.onStart(function(){
  			new TWEEN.Tween( circleMoveY)
  			.to({ y: windowHeight}, 60000)
  			.easing(TWEEN.Easing.Quadratic.Out)
  			.repeat(Infinity)
  			.delay( 1000 )
  			.yoyo( true )
  			.onStart(function(){
  				new TWEEN.Tween( rectRotate)
  				.to({ rotation: 100}, 60000)
  				.easing(TWEEN.Easing.Quadratic.Out)
  				.repeat(Infinity)
  				.delay( 1000 )
  				.yoyo( true )
  			}).start()
  			.start()
  		}).start();
  	})
  	.start();

  }
