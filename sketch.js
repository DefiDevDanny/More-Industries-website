let directions = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]];
let raster = [];

let minRandom = 5;
let maxRandom = 8;

let number = Math.floor(Math.random() * (maxRandom - minRandom + 1)) + minRandom;
let number_two = Math.floor(Math.random() * (maxRandom - minRandom + 1)) + minRandom;

let rows = number;
let cols = number;

let radius = 2;
let margin = 1;

function fxrand() {
  return Math.random();
} // fx hash future proofing

function setup() {
    randomSeed(int(fxrand() * 989954321)); // fx hash future proofing
    let w = min(600, 600);
    createCanvas(w, w).parent('sketch-container'); // Attach canvas to 'sketch-container'
    margin = 0.1 * width;
    radius = (width - 2 * margin) / cols / 2;

    colorMode(RGB);
    background(255, 255, 255);
    noStroke();
    fill(269, 61, 18, 0.1);

    noLoop();

    rectMode(RADIUS);
    angleMode(DEGREES);

	// Select the button and attach the click event listener
    let generateButton = select('#generateButton');
    generateButton.mousePressed(generateImage);

    // Create the slider and attach it to the 'sketch-container'
    //rowsSlider = createSlider(2, 7, rows); // Min, max, and initial value
    //rowsSlider.parent('sketch-container');

    // Create the button and attach it to the 'sketch-container'
    //let generateButton = createButton('Generate Image');
    //generateButton.parent('sketch-container');
    //generateButton.mousePressed(generateImage); // Attach a click event listener

    // Add an input event listener to the slider to update 'rows' when the slider changes
    //rowsSlider.input(updateRows);
}



function generateImage() {
    // Clear the canvas
    background(255, 255, 255);

    // This function generates the image based on the current slider value
    redraw(); // Redraw the canvas with the new number of rows
}


function updateRows() {
    // Update the 'rows' variable with the slider's current value
    rows = rowsSlider.value();
}




function draw_raster(raster) {
	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			let x = margin + radius + col * 2 * radius;
			let y = margin + radius + row * 2 * radius;
			
			if (raster[row][col] == 1) {
				circle(x, y, 2 * radius);

				if (col + 1 < cols) {
					if (raster[row][col + 1] == 1) {
						rect(x + radius, y, radius);
					}
				}

				if (row + 1 < rows) {
					if (raster[row + 1][col] == 1) {
						rect(x, y + radius, radius);
					}
				}
				
				if ((row + 1 < rows) && (col + 1 < cols) && true) {
					if (raster[row + 1][col + 1] == 1) {
						push();
						translate(x, y);
						beginShape();
						vertex(0, radius);
						for (let angle = -90; angle <= 0; angle += 1) {
							vertex(radius * cos(angle), radius * (2 + sin(angle)));
						}
						vertex(radius, 2 * radius);
						vertex(2 * radius, radius);
						for (let angle = 90; angle <= 180; angle += 1) {
							vertex(radius * (2 + cos(angle)), radius * (0 + sin(angle)));
						}
						vertex(radius, 0);
						endShape();
						pop();
					}
				}
				if ((row + 1 < rows) && (col - 1 >= 0)) {
					if (raster[row + 1][col - 1] == 1) {
						push();
						translate(x, y);
						beginShape();
						vertex(-radius, 0);
						for (let angle = 0; angle <= 90; angle += 1) {
							vertex(radius * (-2 + cos(angle)), radius * (0 + sin(angle)));
						}
						vertex(-2 * radius, radius);
						vertex(-radius, 2 * radius);
						for (let angle = 180; angle <= 270; angle += 1) {
							vertex(radius * (0 + cos(angle)), radius * (2 + sin(angle)));
						}
						vertex(0, radius);
						endShape();
						pop();
					}
				}
			}
		}
	}
}

function create_raster() {
	// create empty raster
	var raster = new Array(rows);
	for (var i = 0; i < raster.length; i++) {
		raster[i] = new Array(cols);
	}
	
	for (let row = 0; row < raster.length; row++) {
		for (let col = 0; col < raster[row].length; col++) {
		raster[row][col] = 0;
		}
	}
	
	// fill the raster
	let row = Math.floor(fxrand() * rows);
	let col = Math.floor(fxrand() * cols);
	
	for (let i = 0; i < rows * cols / 4; i++) {
		let row = Math.floor(fxrand() * rows);
		let col = Math.floor(fxrand() * cols);
		raster[row][col] = 1;
		//let neighborhood = Array();
		//for (let dir of directions) {
			//console.log(dir);
		//} 
	}
	
	return raster;
}


function draw() {
	let colors = [color('#F1E9DA'), color('#2E294E'), color('#340953')]
	
	for (let c of colors) {
		fill(c);
		stroke(c);
		raster = create_raster();
		draw_raster(raster);
	}
} 