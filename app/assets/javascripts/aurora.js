'use strict';

const rayCount = 500;
const rayPropCount = 8;
const rayPropsLength = rayCount * rayPropCount;
const baseLength = 200;
const rangeLength = 200;
const baseSpeedA = 0.05;
const rangeSpeedA = 0.1;
const baseWidth = 10;
const rangeWidth = 20;
const baseHueA = 120;
const rangeHueA = 60;
const baseTTLA = 50;
const rangeTTLA = 100;
const noiseStrength = 100;
const xOffA = 0.0015;
const yOffA = 0.0015;
const zOffA = 0.0015;
const backgroundColorA = 'hsla(220,60%,3%,1)';

let containerA;
let canvasA;
let ctxA;
let centerA;
let tickA;
let simplexA;
let rayProps;

function setup() {
	createCanvasA();
  resizeA();
  initRays();
	drawA();
}

function initRays() {
  tickA = 0;
  simplexA = new SimplexNoise();
  rayProps = new Float32Array(rayPropsLength);

  let i;

  for (i = 0; i < rayPropsLength; i += rayPropCount) {
    initRay(i);
  }
}

function initRay(i) {
  let length, x, y1, y2, n, life, ttl, width, speed, hue;

  length = baseLength + rand(rangeLength);
  x = rand(canvasA.aA.width);
  y1 = centerA[1] + noiseStrength;
  y2 = centerA[1] + noiseStrength - length;
  n = simplexA.noise3D(x * xOffA, y1 * yOffA, tickA * zOffA) * noiseStrength;
  y1 += n;
  y2 += n;
  life = 0;
  ttl = baseTTLA + rand(rangeTTLA);
  width = baseWidth + rand(rangeWidth);
  speed = baseSpeedA + rand(rangeSpeedA) * (round(rand(1)) ? 1 : -1);
  hue = baseHueA + rand(rangeHueA);

  rayProps.set([x, y1, y2, life, ttl, width, speed, hue], i);
}

function drawRays() {
  let i;

  for (i = 0; i < rayPropsLength; i += rayPropCount) {
    updateRay(i);
  }
}

function updateRay(i) {
  let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i;
  let x, y1, y2, life, ttl, width, speed, hue;

  x = rayProps[i];
  y1 = rayProps[i2];
  y2 = rayProps[i3];
  life = rayProps[i4];
  ttl = rayProps[i5];
  width = rayProps[i6];
  speed = rayProps[i7];
  hue = rayProps[i8];

  drawRay(x, y1, y2, life, ttl, width, hue);

  x += speed;
  life++;

  rayProps[i] = x;
  rayProps[i4] = life;

  (checkBoundsA(x) || life > ttl) && initRay(i);
}

function drawRay(x, y1, y2, life, ttl, width, hue) {
  let gradient;

  gradient = ctxA.aA.createLinearGradient(x, y1, x, y2);
  gradient.addColorStop(0, `hsla(${hue},100%,65%,0)`);
  gradient.addColorStop(0.5, `hsla(${hue},100%,65%,${fadeInOut(life, ttl)})`);
  gradient.addColorStop(1, `hsla(${hue},100%,65%,0)`);

  ctxA.aA.save();
  ctxA.aA.beginPath();
  ctxA.aA.strokeStyle = gradient;
  ctxA.aA.lineWidth = width;
  ctxA.aA.moveTo(x, y1);
  ctxA.aA.lineTo(x, y2);
  ctxA.aA.stroke();
  ctxA.aA.closePath();
  ctxA.aA.restore();
}

function checkBoundsA(x) {
  return x < 0 || x > canvasA.aA.width;
}

function createCanvasA() {
  containerA = document.querySelector('#tribe');
	canvasA = {
		aA: document.createElement('canvas'),
		bA: document.createElement('canvas')
	};
	canvasA.bA.style = `
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
        z-index: 0;
	`;
	containerA.appendChild(canvasA.bA);
	ctxA = {
		aA: canvasA.aA.getContext('2d'),
		bA: canvasA.bA.getContext('2d')
  };
  centerA = [];
}

function resizeA() {
	const { innerWidth, innerHeight } = window;

	canvasA.aA.width = innerWidth;
  canvasA.aA.height = innerHeight;

  ctxA.aA.drawImage(canvasA.bA, 0, 0);

	canvasA.bA.width = innerWidth;
  canvasA.bA.height = innerHeight;

  ctxA.bA.drawImage(canvasA.aA, 0, 0);

  centerA[0] = 0.5 * canvasA.aA.width;
  centerA[1] = 0.5 * canvasA.aA.height;
}

function render() {
  ctxA.bA.save();
  ctxA.bA.filter = 'blur(12px)';
  ctxA.aA.globalCompositeOperation = 'lighter';
  ctxA.bA.drawImage(canvasA.aA, 0, 0);
  ctxA.bA.restore();
}

function drawA() {
  tickA++;
  ctxA.aA.clearRect(0, 0, canvasA.aA.width, canvasA.aA.height);
  ctxA.bA.fillStyle = backgroundColorA;
  ctxA.bA.fillRect(0, 0, canvasA.bA.width, canvasA.aA.height);
  drawRays();
  render();

	window.requestAnimationFrame(drawA);
}

window.addEventListener('load', setup);
window.addEventListener('resize', resizeA);