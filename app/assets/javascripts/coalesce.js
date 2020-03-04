'use strict';

const particleCountC = 700;
const particlePropCountC = 9;
const particlePropsLengthC = particleCountC * particlePropCountC;
const baseTTLC = 100;
const rangeTTLC = 500;
const baseSpeedC = 0.1;
const rangeSpeedC = 1;
const baseSizeC = 2;
const rangeSizeC = 10;
const baseHueC = 220;
const rangeHueC = 100;
const noiseStepsC = 2;
const xOffC = 0.0025;
const yOffC = 0.005;
const zOffC = 0.0005;
const backgroundColorC = 'hsla(60,50%,3%,1)';

let containerC;
let canvasC;
let ctxC;
let centerC;
let gradientC;
let tickC;
let particlePropsC;
let positionsC;
let velocitiesC;
let lifeSpansC;
let speedsC;
let sizesC;
let huesC;

function setupC() {
	createCanvasC();
  resizeC();
  initParticlesC();
	drawC();
}

function initParticlesC() {
  tickC = 0;
  particlePropsC = new Float32Array(particlePropsLengthC);

  let i;
  
  for (i = 0; i < particlePropsLengthC; i += particlePropCountC) {
    initParticleC(i);
  }
}

function initParticleC(i) {
  let theta, x, y, vx, vy, life, ttl, speed, size, hue;

  x = rand(canvasC.aC.width);
  y = rand(canvasC.aC.height);
  theta = angle(x, y, centerC[0], centerC[1]);
  vx = cos(theta) * 6;
  vy = sin(theta) * 6;
  life = 0;
  ttl = baseTTLC + rand(rangeTTLC);
  speed = baseSpeedC + rand(rangeSpeedC);
  size = baseSizeC + rand(rangeSizeC);
  hue = baseHueC + rand(rangeHueC);

  particlePropsC.set([x, y, vx, vy, life, ttl, speed, size, hue], i);
}

function drawParticlesC() {
  let i;

  for (i = 0; i < particlePropsLengthC; i += particlePropCountC) {
    updateParticleC(i);
  }
}

function updateParticleC(i) {
  let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i, i9=8+i;
  let x, y, theta, vx, vy, life, ttl, speed, x2, y2, size, hue;

  x = particlePropsC[i];
  y = particlePropsC[i2];
  theta = angle(x, y, centerC[0], centerC[1]) + 0.75 * HALF_PI;
  vx = lerp(particlePropsC[i3], 2 * cos(theta), 0.05);
  vy = lerp(particlePropsC[i4], 2 * sin(theta), 0.05);
  life = particlePropsC[i5];
  ttl = particlePropsC[i6];
  speed = particlePropsC[i7];
  x2 = x + vx * speed;
  y2 = y + vy * speed;
  size = particlePropsC[i8];
  hue = particlePropsC[i9];

  drawParticleC(x, y, theta, life, ttl, size, hue);

  life++;

  particlePropsC[i] = x2;
  particlePropsC[i2] = y2;
  particlePropsC[i3] = vx;
  particlePropsC[i4] = vy;
  particlePropsC[i5] = life;

  life > ttl && initParticleC(i);
}

function drawParticleC(x, y, theta, life, ttl, size, hue) {
  let xRel = x - (0.5 * size), yRel = y - (0.5 * size);
  
  ctxC.aC.save();
  ctxC.aC.lineCap = 'round';
  ctxC.aC.lineWidth = 1;
  ctxC.aC.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
  ctxC.aC.beginPath();
  ctxC.aC.translate(xRel, yRel);
  ctxC.aC.rotate(theta);
  ctxC.aC.translate(-xRel, -yRel);
  ctxC.aC.strokeRect(xRel, yRel, size, size);
  ctxC.aC.closePath();
  ctxC.aC.restore();
}

function createCanvasC() {
  containerC = document.querySelector('#past_sessions');
	canvasC = {
		aC: document.createElement('canvas'),
		bC: document.createElement('canvas')
	};
	canvasC.bC.style = `
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
        z-index: -1;
	`;
	containerC.appendChild(canvasC.bC);
	ctxC = {
		aC: canvasC.aC.getContext('2d'),
		bC: canvasC.bC.getContext('2d')
  };
  centerC = [];
}

function resizeC() {
	const { innerWidth, innerHeight } = window;
	
	canvasC.aC.width = innerWidth;
  canvasC.aC.height = innerHeight;

  ctxC.aC.drawImage(canvasC.bC, 0, 0);

	canvasC.bC.width = innerWidth;
  canvasC.bC.height = innerHeight;
  
  ctxC.bC.drawImage(canvasC.aC, 0, 0);

  centerC[0] = 0.5 * canvasC.aC.width;
  centerC[1] = 0.5 * canvasC.aC.height;
}

function renderGlowC() {
  ctxC.bC.save();
  ctxC.bC.filter = 'blur(8px) brightness(200%)';
  ctxC.bC.globalCompositeOperation = 'lighter';
  ctxC.bC.drawImage(canvasC.aC, 0, 0);
  ctxC.bC.restore();

  ctxC.bC.save();
  ctxC.bC.filter = 'blur(4px) brightness(200%)';
  ctxC.bC.globalCompositeOperation = 'lighter';
  ctxC.bC.drawImage(canvasC.aC, 0, 0);
  ctxC.bC.restore();
}

function renderC() {
  ctxC.bC.save();
  ctxC.bC.globalCompositeOperation = 'lighter';
  ctxC.bC.drawImage(canvasC.aC, 0, 0);
  ctxC.bC.restore();
}

function drawC() {
  tickC++;

  ctxC.aC.clearRect(0, 0, canvasC.aC.width, canvasC.aC.height);

  // ctx.b.fillStyle = backgroundColorC;
  ctxC.bC.fillRect(0, 0, canvasC.aC.width, canvasC.aC.height);

  drawParticlesC();
  renderGlowC();
  renderC();

	window.requestAnimationFrame(drawC);
}

window.addEventListener('load', setupC);
window.addEventListener('resize', resizeC);