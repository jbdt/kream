'use strict';

const particleCount = 700;
const particlePropCount = 9;
const particlePropsLength = particleCount * particlePropCount;
const rangeY = 100;
const baseTTL = 50;
const rangeTTL = 150;
const baseSpeed = 0.1;
const rangeSpeed = 2;
const baseRadius = 1;
const rangeRadius = 4;
const baseHue = 220;
const rangeHue = 100;
const noiseSteps = 8;
const xOff = 0.00125;
const yOff = 0.00125;
const zOff = 0.0005;
const backgroundColor = 'hsla(260,40%,5%,1)';

let container;
let canvasS;
let ctx;
let center;
let gradient;
let tick;
let simplex;
let particleProps;
let positions;
let velocities;
let lifeSpans;
let speeds;
let sizes;
let hues;

function setup() {
	createCanvas();
  resize();
  initParticles();
	draw();
}

function initParticles() {
  tick = 0;
  simplex = new SimplexNoise();
  particleProps = new Float32Array(particlePropsLength);

  let i;

  for (i = 0; i < particlePropsLength; i += particlePropCount) {
    initParticle(i);
  }
}

function initParticle(i) {
  let x, y, vx, vy, life, ttl, speed, radius, hue;

  x = rand(canvasS.aS.width);
  y = center[1] + randRange(rangeY);
  vx = 0;
  vy = 0;
  life = 0;
  ttl = baseTTL + rand(rangeTTL);
  speed = baseSpeed + rand(rangeSpeed);
  radius = baseRadius + rand(rangeRadius);
  hue = baseHue + rand(rangeHue);

  particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
}

function drawParticles() {
  let i;

  for (i = 0; i < particlePropsLength; i += particlePropCount) {
    updateParticle(i);
  }
}

function updateParticle(i) {
  let i2=1+i, i3=2+i, i4=3+i, i5=4+i, i6=5+i, i7=6+i, i8=7+i, i9=8+i;
  let n, x, y, vx, vy, life, ttl, speed, x2, y2, radius, hue;

  x = particleProps[i];
  y = particleProps[i2];
  n = simplex.noise3D(x * xOff, y * yOff, tick * zOff) * noiseSteps * TAU;
  vx = lerp(particleProps[i3], cos(n), 0.5);
  vy = lerp(particleProps[i4], sin(n), 0.5);
  life = particleProps[i5];
  ttl = particleProps[i6];
  speed = particleProps[i7];
  x2 = x + vx * speed;
  y2 = y + vy * speed;
  radius = particleProps[i8];
  hue = particleProps[i9];

  drawParticle(x, y, x2, y2, life, ttl, radius, hue);

  life++;

  particleProps[i] = x2;
  particleProps[i2] = y2;
  particleProps[i3] = vx;
  particleProps[i4] = vy;
  particleProps[i5] = life;

  (checkBounds(x, y) || life > ttl) && initParticle(i);
}

function drawParticle(x, y, x2, y2, life, ttl, radius, hue) {
  ctx.aS.save();
  ctx.aS.lineCap = 'round';
  ctx.aS.lineWidth = radius;
  ctx.aS.strokeStyle = `hsla(${hue},100%,60%,${fadeInOut(life, ttl)})`;
  ctx.aS.beginPath();
  ctx.aS.moveTo(x, y);
  ctx.aS.lineTo(x2, y2);
  ctx.aS.stroke()
  ctx.aS.closePath();
  ctx.aS.restore();
}

function checkBounds(x, y) {
	return(
		x > canvasS.aS.width ||
		x < 0 ||
		y > canvasS.aS.height ||
		y < 0
	);
}

function createCanvas() {
  container = document.querySelector('#formlist');
	canvasS = {
		aS: document.createElement('canvas'),
		bS: document.createElement('canvas')
	};
	canvasS.bS.style = `
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
        z-index: -1;
	`;
	container.appendChild(canvasS.bS);
	ctx = {
		aS: canvasS.aS.getContext('2d'),
		bS: canvasS.bS.getContext('2d')
  };
  center = [];
}

function resize() {
	const { innerWidth, innerHeight } = window;

	canvasS.aS.width = innerWidth;
  canvasS.aS.height = innerHeight;

  ctx.aS.drawImage(canvasS.bS, 0, 0);

	canvasS.bS.width = innerWidth;
  canvasS.bS.height = innerHeight;

  ctx.bS.drawImage(canvasS.aS, 0, 0);

  center[0] = 0.5 * canvasS.aS.width;
  center[1] = 0.5 * canvasS.aS.height;
}

function renderGlow() {
  ctx.bS.save();
  ctx.bS.filter = 'blur(8px) brightness(200%)';
  ctx.bS.globalCompositeOperation = 'lighter';
  ctx.bS.drawImage(canvasS.aS, 0, 0);
  ctx.bS.restore();

  ctx.bS.save();
  ctx.bS.filter = 'blur(4px) brightness(200%)';
  ctx.bS.globalCompositeOperation = 'lighter';
  ctx.bS.drawImage(canvasS.aS, 0, 0);
  ctx.bS.restore();
}

function renderToScreen() {
  ctx.bS.save();
  ctx.bS.globalCompositeOperation = 'lighter';
  ctx.bS.drawImage(canvasS.aS, 0, 0);
  ctx.bS.restore();
}

function draw() {
  tick++;

  ctx.aS.clearRect(0, 0, canvasS.aS.width, canvasS.aS.height);

  // ctx.bS.fillStyle = backgroundColor;
  ctx.bS.fillRect(0, 0, canvasS.aS.width, canvasS.aS.height);

  drawParticles();
  renderGlow();
  renderToScreen();

	window.requestAnimationFrame(draw);
}

window.addEventListener('load', setup);
window.addEventListener('resize', resize);