let directions = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
  [1, 1],
  [-1, 1],
  [1, -1],
  [-1, -1],
];
let raster = [];

// Change the raster and make the colors less opaque
let minRandom = 3;
let maxRandom = 6;
let number = Math.floor(Math.random() * (maxRandom - minRandom + 1)) + minRandom;

let rows = number;
let cols = number;

let radius = 5;
let margin = 5;

let flowField = []; // Flow field containing vectors
const flowScale = 0.1; // Scale factor for the flow vectors

function fxrand() {
  return Math.random();
}

function setup() {
  randomSeed(int(fxrand() * 987654321));
  w = min(600, 600);

  createCanvas(w, w).parent('sketch-container'); // Attach canvas to 'sketch-container'
  margin = 0.1 * width;
  radius = (width - 2 * margin) / cols / 2;

  colorMode(HSL);
  background(39, 7, 90);
  //clear();
  noStroke();
  fill(269, 61, 18, 0.1);

  noLoop();

  rectMode(RADIUS);
  angleMode(DEGREES);

  // Select the button and attach the click event listener
  let generateButton = select('#generateButton');
  generateButton.mousePressed(generateImage);

  // Select the "Download Image" button and attach a click event listener
  let downloadButton = select('#downloadButton');
  downloadButton.mousePressed(downloadImage);


 

  // Initialize the flow field with random vectors
  for (let row = 0; row < rows; row++) {
    flowField[row] = [];
    for (let col = 0; col < cols; col++) {
      flowField[row][col] = p5.Vector.random2D();
    }
  }
}

function generateImage() {
  // Clear the canvas
  

  // Resize the canvas to 600x600 pixels
  resizeCanvas(w, w);

  // This function generates the image based on the current slider value
  redraw(); // Redraw the canvas with the new number of rows
}

function downloadImage() {
  // Use the saveCanvas function to save the canvas as an image
  saveCanvas('your_art_image', 'jpg'); // Change the file name and format as needed
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

        if (row + 1 < rows && col + 1 < cols && true) {
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
        if (row + 1 < rows && col - 1 >= 0) {
          if (raster[row + 1][col - 1] == 1) {
            push();
            translate(x, y);
            beginShape();
            vertex(-radius, 0);
            for (let angle = 0; angle <= 90; angle += 1) {
              vertex(
                radius * (-2 + cos(angle)),
                radius * (0 + sin(angle))
              );
            }
            vertex(-2 * radius, radius);
            vertex(-radius, 2 * radius);
            for (let angle = 180; angle <= 270; angle += 1) {
              vertex(
                radius * (0 + cos(angle)),
                radius * (2 + sin(angle))
              );
            }
            vertex(0, radius);
            endShape();
            pop();
          }
        }
      } else {
        // Draw black dot in the center of the cell
        
        fill(0);
        let randomone = random(0, 255);
        let randomtwo = random(0, 255);
        let randomthree = random(0, 255);
        let randomfour = random(2,4);
        strokeWeight(randomfour);
        stroke(randomone, randomtwo, randomthree);
        ellipse(x, y, 10, 10);
        
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

  // Calculate a random starting position around the center
  let centerRow = Math.floor(rows / 2);
  let centerCol = Math.floor(cols / 2);

  let maxDistanceFromCenter = Math.min(rows, cols) / 4; // Adjust this value for desired distance

  let angle = random(TWO_PI); // Random angle in radians
  let distance = random(maxDistanceFromCenter);

  let row = centerRow + Math.floor(distance * cos(angle));
  let col = centerCol + Math.floor(distance * sin(angle));

  // Mark the starting position as 1
  raster[row][col] = 1;

  // Perform Brownian motion to fill cells with 1s
  for (let steps = 0; steps < rows * cols / 4; steps++) {
    let direction = Math.floor(random(4)); // 0: up, 1: down, 2: left, 3: right

    // Update position based on the chosen direction
    if (direction === 0 && row > 0) row--;
    else if (direction === 1 && row < rows - 1) row++;
    else if (direction === 2 && col > 0) col--;
    else if (direction === 3 && col < cols - 1) col++;

    // Apply Brownian motion by randomly adjusting the position
    row += Math.floor(random(-1, 2));
    col += Math.floor(random(-1, 2));

    // Ensure the position stays within bounds
    row = constrain(row, 0, rows - 1);
    col = constrain(col, 0, cols - 1);

    // Mark the current position as 1
    raster[row][col] = 1;
  }

  return raster;
}

function draw() {
  // background(39, 45, 90); // Clear the background on each frame
  background(255);

  let colors = [
    color('#F1E9DA'),
    color('#2E294E'),
    color('#541388'),
    color('#FFD400'),
    color('#D90368'),
  ];

  for (let c of colors) {
    
    fill(c);
    stroke(c);
    raster = create_raster();
    draw_raster(raster);
  }

  // Draw the mirrored version of the raster
  let mirroredRaster = mirror_raster(raster);
  draw_raster(mirroredRaster, 0, height); // Adjust the position of the mirrored raster
}



