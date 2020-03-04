'use strict';

const pipeCountP = 30;
const pipePropCountP = 8;
const pipePropsLengthP = pipeCountP * pipePropCountP;
const turnCountP = 8;
const turnAmountP = (360 / turnCountP) * (3.1416 / 180);
const turnChanceRangeP = 58;
const baseSpeedP = 0.5;
const rangeSpeedP = 1;
const baseTTLP = 100;
const rangeTTLP = 300;
const baseWidthP = 2;
const rangeWidthP = 4;
const baseHueP = 220;
const rangeHueP = 100;
const backgroundColorP = 'hsla(150,80%,1%,1)';

let containerP;
let canvasP;
let ctxP;
let centerP;
let tickP;
let pipePropsP;

function setupP() {
	createCanvasP();
  resizeP();
  initPipesP();
	drawP();
}

function initPipesP() {
  pipePropsP = new Float32Array(pipePropsLengthP);

  let i;

  for (i = 0; i < pipePropsLengthP; i += pipePropCountP) {
    initPipeP(i);
  }
}

function initPipeP(i) {
  let x, y, direction, speed, life, ttl, width, hue;

  x = rand(canvasP.aP.width);
  y = centerP[1];
  direction = (round(rand(1)) ? HALF_PI : TAU - HALF_PI);
  speed = baseSpeedP + rand(rangeSpeedP);
  life = 0;
  ttl = baseTTLP + rand(rangeTTLP);
  width = baseWidthP + rand(rangeWidthP);
  hue = baseHueP + rand(rangeHueP);

  pipePropsP.set([x, y, direction, speed, life, ttl, width, hue], i);
}

function updatePipesP() {
  tickP++;

  let i;

  for (i = 0; i < pipePropsLengthP; i += pipePropCountP) {
    updatePipeP(i);
  }
}

function updatePipeP(i) {
  let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i;
  let x, y, direction, speed, life, ttl, width, hue, turnChance, turnBias;

  x = pipePropsP[i];
  y = pipePropsP[i2];
  direction = pipePropsP[i3];
  speed = pipePropsP[i4];
  life = pipePropsP[i5];
  ttl = pipePropsP[i6]
  width = pipePropsP[i7];
  hue = pipePropsP[i8];

  drawPipeP(x, y, life, ttl, width, hue);

  life++;
  x += cos(direction) * speed;
  y += sin(direction) * speed;
  turnChance = !(tickP % round(rand(turnChanceRangeP))) && (!(round(x) % 6) || !(round(y) % 6));
  turnBias = round(rand(1)) ? -1 : 1;
  direction += turnChance ? turnAmountP * turnBias : 0;

  pipePropsP[i] = x;
  pipePropsP[i2] = y;
  pipePropsP[i3] = direction;
  pipePropsP[i5] = life;

  checkBoundsP(x, y);
  life > ttl && initPipeP(i);
}

function drawPipeP(x, y, life, ttl, width, hue) {
  ctxP.aP.save();
  ctxP.aP.strokeStyle = `hsla(${hue},75%,50%,${fadeInOut(life, ttl) * 0.125})`;
  ctxP.aP.beginPath();
  ctxP.aP.arc(x, y, width, 0, TAU);
  ctxP.aP.stroke();
  ctxP.aP.closePath();
  ctxP.aP.restore();
}

function checkBoundsP(x, y) {
  if (x > canvasP.aP.width) x = 0;
  if (x < 0) x = canvasP.aP.width;
  if (y > canvasP.aP.height) y = 0;
  if (y < 0) y = canvasP.aP.height;
}

function createCanvasP() {
  containerP = document.querySelector('#friends');
	canvasP = {
		aP: document.createElement('canvas'),
		bP: document.createElement('canvas')
	};
	canvasP.bP.style = `
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
        z-index: -1;
	`;
	containerP.appendChild(canvasP.bP);
	ctxP = {
		aP: canvasP.aP.getContext('2d'),
		bP: canvasP.bP.getContext('2d')
  };
  centerP = [];
  tickP = 0;
}

function resizeP() {
	const { innerWidth, innerHeight } = window;
	
	canvasP.aP.width = innerWidth;
  canvasP.aP.height = innerHeight;

  ctxP.aP.drawImage(canvasP.bP, 0, 0);

	canvasP.bP.width = innerWidth;
  canvasP.bP.height = innerHeight;
  
  ctxP.bP.drawImage(canvasP.aP, 0, 0);

  centerP[0] = 0.5 * canvasP.aP.width;
  centerP[1] = 0.5 * canvasP.aP.height;
}

function renderP() {
  ctxP.bP.save();
  ctxP.bP.fillStyle = backgroundColorP;
  ctxP.bP.fillRect(0,0,canvasP.bP.width,canvasP.bP.height);
  ctxP.bP.restore();

  ctxP.bP.save();
  ctxP.bP.filter = 'blur(12px)'
  ctxP.bP.drawImage(canvasP.aP, 0, 0);
  ctxP.bP.restore();

  ctxP.bP.save();
  ctxP.bP.drawImage(canvasP.aP, 0, 0);
  ctxP.bP.restore();
}

function drawP() {
  updatePipesP();

  renderP();

	window.requestAnimationFrame(drawP);
}

window.addEventListener('load', setupP);
window.addEventListener('resize', resizeP);