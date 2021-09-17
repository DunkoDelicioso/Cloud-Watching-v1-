

// TO DO:
// Figure out how to get the text generative element

// Preferably, try and find a way to get YOLO to classify each image as it is
// pushed to the body, and the have the definition for that word be oushed into the scroller as it does

//for the text-scroller on the side use a css animation that slowly reaches the bottom, 
// maintaining a solid pace

//Find a way to allow the entire dataset to be downloaded into a zip file so that people can play with it

//The empty array for the Data Url Images to be pushed to
let images = [];

// The offset for the X axis Noise
let xoff = 0;

// The offset for the Y axis Noise
let yoff = 0;

// The incriment in whicch the pixel array repeats the pattern of perlin noise
let inc = 0.4

// variable that controls the oscillation of the noiseDetail dropoff
let sud = 0.53

// variable that controls the oscillation of the noiseDetail detail
let det = 7

//incrament of change per frame of noise dropoff
let sudinc = + 0.01

//incrament of change for noise detail
let detinc = + 0.1

// variable to hold gaphic layer for "worms"
let pg

// X starting location for Worm
let xmov = 100;

//Y starting location for Worm
let ymov = 100;

// Size of squares
let size = 15;

// Interval squares move per frame
let leap = 12;




function setup() {
  canvas = createCanvas(200, 200);
  canvas.parent("canvas");
  pixelDensity(1);
  wave = new p5.Oscillator
  wave.setType('sine');
  wave.amp(0.3)
  wave.start();
  delay = new p5.Delay();
  delay.process(wave, 0.3, .6, 3000);
  delay.setType('pingPong')

  pg = createGraphics(200, 200);
  wave1 = new p5.Oscillator

}

function draw() {

  // document.getElementById('sound').innerHTML = xoff;
  
  
// Setting parameters for the noise oscillations
  sud = sud + sudinc
  det = det + detinc

    if (det > 25){
      detinc = detinc * -1
    }

    if (det < .5){
      detinc = detinc * -1
    }

    if (sud > 0.8){
      sudinc = sudinc * -1
    }
    if (sud < 0.1){
      sudinc = sudinc * -1
    }
    noiseDetail(det, sud);
    frameRate(24);

    let s = second();
    let m = minute();
    let h = hour();

    document.getElementById("sec").innerHTML = s 
    document.getElementById("min").innerHTML = m 
    document.getElementById("hor").innerHTML = h
  


    let horCol = map(h, 0, 24, 0, 255)
    let minCol = map(m, 0, 60, 0, 255)
    let secCol = map(s, 0, 60, 0, 255)

  
// 3D perlin Noise BACKGROUND
  loadPixels();
  for (var x = 0; x < width; x ++){
    let yoff = 0;
    for (var y = 0; y < height; y ++) {
      var index = (x + y * width) * 4;
      let nos = noise(xoff, yoff) * 255
      pixels[index] =  secCol 
      pixels[index+1] = minCol 
      pixels[index+2] = horCol 
      pixels[index+3] = nos 
      
      yoff += inc
  }
  xoff += inc
}
updatePixels();
  

//Getting the green levels from upper top pixel and using this to dictate the frequency.
  let square = get(0,0);
  let sound = map(square[3], 0, 255, 0, 400);
  wave.amp(0.4)
  wave.freq(sound);
  
  
//Code for the random Walker
        choice = floor(random(4));
        let leap = 10;
        if (choice == 0){
            xmov = xmov + leap ;
            
        }
        else if (choice == 1){
            xmov = xmov - leap ;
            
        }
        else if (choice == 2){
            ymov = ymov  + leap ;
            
        }
        else if (choice == 3){
            ymov = ymov - leap ;
            
        }


      
          
  
// I want the shape never to bleed off the sides
  
        if (ymov > height - 40 || ymov < 40){
            ymov = height / 2
        }
        if (xmov > width - 40 || xmov < 40){
            xmov =  width / 2
        }
  
  
// Fill parameters for the squares based on the frequency of noise
  
        if (sound > 250){
          pg.fill(random(150, 255), 0, 0)
        }
    
        if (sound > 200 && sound < 250){
          pg.fill(random(0, 255))
        }
        
        if (sound < 200){
          pg.fill(250);
        }    
        if (sound < 100){
          pg.fill(random(0, 255),random(0, 255), random(0, 255) );
        }    
  
        pg.stroke(0);
        pg.strokeWeight(0)
        pg.rect(xmov, ymov, size, size);
        image(pg, 0, 0);
  

  // Reset the Graphic layer and start the walker back at the middle once the frequency is over 299 (upper limit of the oscillation) I eventually want to figure out how to add a jpeg of the last iteration of the shape to the URL every time this limit is reached, so the eventually the screen is populated by these random "molecule" shapes. I've tried using canvas.toDataURL, but can't fugure out exactly how to do it.
  
        if (sound > 299 && sound < 305){
          pg.fill(0);
          xmov = 100
          ymov = 100
          wave.freq(1000 + random(0, 200))
          
          
          //This pushes the current image on the canvas to the DOM
          const snapshot = createImg(canvas.elt.toDataURL());
          
          snapshot.size(200, 200);
          images.push(canvas.elt.toDataURL())
          console.log(images)
          window.scrollTo(0,document.body.scrollHeight);
          
        
          pg.clear()  
          // Push a new value to an array which is creating something larger based on all of the information
          // How to use an outside API
          // Graphic Elements over the page? 
          // What are the levels of interaction that I want from this, or is this simply a micro representation of something else?

}
}