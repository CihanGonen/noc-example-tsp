// Daniel Shiffman
// The Coding Train
// Traveling Salesperson with Genetic Algorithm

const cities = [];
const totalCities = 10;

const popSize = 300;
const fitness = [];

let generation = 0;
let bestFoundGeneration;
let endAfterNoBest = 1000;
let finished=false;
let population = [];
let recordDistance = Infinity;
let bestEver;
let currentBest;

let statusP;

function setup() {
  createCanvas(600, 600);
  const order = [];
  for (let i = 0; i < totalCities; i++) {
    const v = createVector(random(width), random(height / 2));
    cities[i] = v;
    order[i] = i;
  }

  for (let i = 0; i < popSize; i++) {
    population[i] =  shuffle(order);
  }
  

  statusP = createP('').style('font-size', '32pt');
}

function draw() {
  background(0);

  // GA
  calculateFitness();
  normalizeFitness();
  nextGeneration();
  evaluate();
  
  if (finished) {
    //println(millis()/1000.0);
    noLoop();
  }

  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    const n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();

  translate(0, height / 2);
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < currentBest.length; i++) {
    const n = currentBest[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();
}

function swap(a, i, j) {
  const temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}


function calcDistance(points, order) {
  let sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    const cityAIndex = order[i];
    const cityA = points[cityAIndex];
    const cityBIndex = order[i + 1];
    const cityB = points[cityBIndex];
    const d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
} 

// INSTEAD OF DIST FUNCTION YOU MIGHT USE PRECALCULATED DISTANCE ARRAY SINCE CITIES ARE SAME