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
var startTime
var button
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
//var nowtime = hour() + ":" + minute()

function preload() {
  loadData();
  loadTrainData();
}

function noscroll() {
  window.scrollTo(0, 0);
}

// add listener to disable scroll
window.addEventListener('scroll', noscroll);

// Remove listener to disable scroll
window.removeEventListener('scroll', noscroll)

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

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
  localStorage.setItem('busespassed', busespassed);
  localStorage.setItem('trainspassed', trainspassed);
	localStorage.setItem('startTime', startTime)

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


function loadData() {
  console.log('loadData');
  var url = 'https://transportapi.com/v3/uk/bus/stop/490000073V///timetable.json?app_id=ca103b63&app_key=8bc99f71886bd7095a865df6dcb5c46a&group=route'
  //var url2 = 'https://transportapi.com/v3/uk/train/station/EPH/live.json?app_id=ca103b63&app_key=8bc99f71886bd7095a865df6dcb5c46a&darwin=false&operator=LT&train_status=passenger'
  loadJSON(url, gotData);
  //loadJSON(url2, gotTrainData);
}

function loadTrainData() {
  console.log('loadTrainData');
  var url2 = 'https://transportapi.com/v3/uk/train/station/EPH/live.json?app_id=ca103b63&app_key=8bc99f71886bd7095a865df6dcb5c46a&darwin=false&operator=LT&train_status=passenger'
  loadJSON(url2, gotTrainData);
}

function setup() {
  if (!localStorage.getItem('busespassed', 'trainspassed')) {
    populateStorage();
  } else {
    getBusValue();
    getTrainValue();
  }

	if (!localStorage.getItem('startTime')) {
		executeTime()
	} else {
		executeTimeout()
	}

  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(width * 2, 450);
  //var nowtime = hour() + ":" + minute()
  //var busespassed = 0

  console.log(busespassed);
  //img1 = loadImage("assets/gradient1.png");
  bus12 = loadImage("assets/12BUSB.png");
  dots = loadImage("assets/worn-dots-DESK.png");
  dotsDAY = loadImage("assets/worn-dots-DESK-DAY.png");
  MAPEC = loadImage("assets/MAP-EC.png");
  // this refreshes the data after a bit
  setInterval(loadData, 60000);
  setInterval(loadTrainData, 60000)
  setInterval(populateStorage, 60000)
  //setInterval(fadeOut, 10000);
  var colorset = '#FAB603'

  button = createButton('location 2');
  button.position(1200, 20);
  button.mousePressed(MoveToLOC);

	shapeMovement()
	console.log(startTime)
	console.log(day())
	equalsMaybe()


}

function MoveToLOC() {
  window.open("http://kaebiene.github.io/loc2.html");
}

function gotData(data) {
  //console.log(gotData);
  transportapi = data;
  var nowtime = hour() + ":" + nf(minute(), 2, 0);
  if (nowtime === transportapi.departures["12"][0].aimed_departure_time) {
    busespassed = busespassed + 1
		pulseBUS()

  }
  if (nowtime === transportapi.departures["12"][1].aimed_departure_time) {
    busespassed = busespassed + 1
		pulseBUS()
  }
  if (nowtime === transportapi.departures["12"][2].aimed_departure_time) {
    busespassed = busespassed + 1
		pulseBUS()
  }
  console.log(nowtime);
}

function gotTrainData(data) {
  //console.log(gotTrainData);
  trainData = data
  var fasttime = hour() + ":" + nf(minute() + 1, 2, 0);
  if (fasttime === trainData.departures["all"][0].aimed_departure_time) {
    trainspassed = trainspassed + 1
		pulseTRAIN()
  }
  if (fasttime === trainData.departures["all"][1].aimed_departure_time) {
    trainspassed = trainspassed + 1
		pulseTRAIN()
  }
  if (fasttime === trainData.departures["all"][2].aimed_departure_time) {
    trainspassed = trainspassed + 1
		pulseTRAIN()
  }
  console.log(trainData.departures["all"][0].aimed_departure_time);
  console.log(trainspassed);
  console.log(fasttime);

}


function draw() {
  var h = hour();
  var m = minute();
  var sec = second();
  var d = day();
  var bg = color('white');
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



  background(bg);
//	image(dotsDAY, 0, 0, windowWidth, windowHeight);

// adaptive color code
// background
if (7 < h && h < 20) {
		image(dotsDAY, 0, 0, windowWidth, windowHeight);
		var accent = color(13, 145, 216, shapeInfo.opacity);
		var txt = color(255,255,255,textInfo.opacity)
		var pulsebg = color(13, 145, 216,pulseInfo.opacity);
		var TRAIN = color(255,255,255,textInfo.opacity)
		var BUS = color(255,255,255,textInfo.opacity)
		var textFadeDAY = color(0, 0, 0, shapeInfo.opacity)

}
else {
		image(dots, 0, 0, windowWidth, windowHeight);
		var accent = color(250,182,3, shapeInfo.opacity);
		var txt = color(255,255,255,textInfo.opacity)
		var pulsebg = color(250,182,3,pulseInfo.opacity);
		var TRAIN = color(255,255,255,textInfo.opacity)
		var BUS = color(255,255,255,textInfo.opacity)
		var textFadeDAY = color(255, 255, 255, shapeInfo.opacity)
}

  angleMode(DEGREES);
// setup for pulse
  textFont('Exo');
	fill(pulsebg);
	rect(0,0,windowWidth,windowHeight);

// moving shapes
  push();
  fill(accent);
  noStroke();
	if (7 < h && h < 20) {
  blendMode(MULTIPLY);
} else {
	blendMode(SCREEN)
}
  ellipse(circleMove.x, circleMoveY.y, 500);
  rect(rectMove.x, 200, 500, 100);
	rect(rectMove.x, 500, 200, 20);
	rect(rectMove.x + 400, 150, 200, 20);
	rect(rectMove.x + 600, 450, 200, 20);
  rect(rectMove.x + 50, 550, width, 100);
	angleMode(DEGREES)
	rotate(rectRotation)
	rect(-50,-50,500,100);
	rotate(0)
  pop();


  push();
  noStroke();
//  textSize(200);
  textStyle(BOLD);
//  colorMode(HSL);
//  fill(0, 0, 50);
//  fill(0, 0, 30);
//  fill(0, 0, 10);
  textSize(100)
  textLeading(80)
  fill(txt)
  text('buses passed', 250, 200, 50);
	fill(BUS)
	text('buses passed', 250, 200, 50);
  pop();

// BUS value
  push();
  pg.noStroke();
  pg.clear();
  pg.smooth();
  pg.textSize(200);
  pg.textStyle(BOLD);
  pg.textFont('Exo');
  pg.fill(textFadeDAY);
  pg.text(busespassed, windowWidth / 2, windowHeight / 2.2, 0);
	pg.fill(BUS)
	pg.text(busespassed, windowWidth / 2, windowHeight / 2.2, 0);
  //image(bus12, 350, 0, 474 / 1.8, 854 / 1.8);
  image(pg, 0, 0);
  textSize(200);
  textStyle(BOLD);
  textFont('Exo');
  fill(txt);
  translate(760, 20);
  rotate(90);
  textStyle(NORMAL)
  pop();


// TRAIN value
  push();
  noStroke();
  //textSize(50);
  textStyle(BOLD);
  //translate(600, 50);
  rotate(0);
  //fill(txt)
  //text(transportapi.stop_name, 0, 0, 100);
  //translate(0, 0)
  //translate(-450, 300)
  //rotate(90);
  //text(trainData.station_name, 0, 0, 0);
  //rotate(-90);
  //translate(200, 100);
  textSize(200);
  fill(textFadeDAY)
  text(trainspassed, windowWidth / 2 - 250, windowHeight/1.5 + 50, 0);
	fill(TRAIN)
  text(trainspassed, windowWidth / 2 - 250, windowHeight/1.5 + 50, 0);
	textSize(100)
  fill(txt)
  text('trains passed', windowWidth / 2 + 60, windowHeight/1.5 - 50, 0);
	fill(TRAIN)
	text('trains passed', windowWidth / 2 + 60, windowHeight/1.5 - 50, 0);
  //translate(700, 0)
  //fill(txt)
  //textStyle(NORMAL)
	fill(txt)
  text(trainData.station_code, windowWidth - 200, windowHeight - 10);
	text(trainData.station_name, 10, windowHeight - 10);

  pop();

  //previoustime = nowtime
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

function pulseTRAIN(){
console.log('tween...');
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
		.delay( 1000 )
		.yoyo( true )
		.onStart(function(){
			new TWEEN.Tween( circleMoveY)
			.to({ y: 200}, 60000)
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
