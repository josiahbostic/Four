var counter = 0;
var counter2 = 0;
var fft;
var filter, filterFreq, filterWidth;

function preload() {
  soundFormats('mp3', 'ogg');
  mySound = loadSound('Michael_Jackson_Smooth_Criminal_Audio_HQ.mp3');
}

function setup() {
	mySound.setVolume(0.1);
  mySound.play();
	createCanvas(windowWidth, windowHeight);
	background(0);
	filter = new p5.BandPass();
	fft = new p5.FFT();

}

function draw() {
	counter = (counter + 10)%360;
	counter2 = (counter2 +11)%360;
	angleMode(DEGREES);
	var CentX = 600;
	var CentY = 250;
	var Diameter = 200;
	background(0)
	filterFreq = map (mouseX, 0, width, 10, 22050);
  filterWidth = map(mouseY, 0, height, 0, 90);
  filter.set(filterFreq, filterWidth);
	var spectrum = fft.analyze();
	
	noStroke();
	
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width/spectrum.length, h) ;
	}

	for (var Theta = 0; Theta <360; Theta = Theta +30){
		//rect(CentX+Diameter*cos(Theta), CentY+Diameter*sin(Theta), 20, 20);
		
	for (var Dscale = 1; Dscale < 10; Dscale = Dscale +0.5) {
		for (var Theta = 4; Theta <360; Theta = Theta +30){
			var Xp = CentX+Dscale*Diameter*cos(Theta+(counter)%360);
			var Yp = CentY+Dscale*Diameter*sin(Theta+(counter2)%360);
			fill(255,100*(Theta/windowHeight),25)
			rect(Xp,Yp , 20, 20);
		}
		
	}
	}	
}
